import { useEffect, useState } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';
import ListItem from '../components/ListItem';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { useThemeColor } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Input from '../components/Input';
import { useUser } from '../contexts/UserContext';
import useApi, { ApiResponse } from '../hooks/useApi';
import Animated, { FadeIn, Layout, SlideInLeft } from 'react-native-reanimated';
import useDebounce from '../hooks/useDebounce';
import Colors from '../constants/Colors';

export interface Contact {
  id: number,
  name: string,
  lastName: string,
  phone: string,
  contacted: string,
}

export default function ContactsScreen({ navigation }: RootTabScreenProps<'Contacts'>) {
  const textColor = useThemeColor({ name: 'baseText' });
  const dividerColor = useThemeColor({ name: 'divider' });

  const contacts = useUser(state => state.contacts);
  const setContacts = useUser(state => state.setContacts);

  const filteredContacts = useUser(state => state.filteredContacts);
  const setContactsFilter = useUser(state => state.setContactsFilter);

  const [search, setSearch] = useState('');

  const [errorMessage, setError] = useState('');
  const { get, loading, error } = useApi();

  useEffect(() => {
    if (contacts)
      return;

    const fetchContacts = async () => {
      const contacts: ApiResponse<Contact[]> = await get('/contacts')

      if (contacts.success) {
        setContacts(contacts.data);
      } else if (contacts.error) {
        setError(contacts.error);
      }
    };

    fetchContacts();
  }, [contacts]);

  useDebounce(() => {
    setContactsFilter(search);
  }, search, 200);

  let text = '';

  if (loading)
    text = 'Cargando últimas transacciones...';
  else if (errorMessage)
    text = errorMessage;
  else if (error)
    text = error.message;

  return (
    <>
      <Animated.View
        style={{
          padding: 24,
          paddingBottom: 0,
        }}
        entering={FadeIn.duration(300)}
      >
        <Input
          placeholder='Ingresa un nombre o un número'
          left={<Feather name="search" size={24} color={textColor} />}
          onChangeText={(text) => {
            setSearch(text);
          }}
          value={search}
        />
      </Animated.View>

      <SectionList
        sections={filteredContacts || contacts || []}
        ItemSeparatorComponent={() => (
          <View style={{
            height: 16,
            backgroundColor: 'transparent'
          }}/>
        )}
        renderItem={({ item: { name, lastName, phone }, index }) => (
          <Animated.View
            entering={SlideInLeft.delay(80 + index * 25).duration(300)}
            exiting={SlideInLeft.duration(300)}
            layout={Layout.springify()}
          >
            <ListItem
              title={`${name} ${lastName}`}
              description={phone}
              hue={197}
              icon={(size, color) => (<Ionicons name="person" size={size} color={color} />)}
            />
          </Animated.View>
        )}
        renderSectionHeader={({ section }) => (
          <Animated.Text
            entering={SlideInLeft.delay(50).duration(300)}
            style={[styles.sectionTitle, {
              color: textColor,
              borderBottomColor: dividerColor,
            }]}
          >
            {section.title}
          </Animated.Text>
        )}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 24,
        }}
        keyExtractor={({ id, name, lastName }) => `${id}-${name}-${lastName}`}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.light.baseText,
    marginHorizontal: -24,
    marginTop: 30,
    marginBottom: 32,
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomColor: Colors.light.divider,
    borderBottomWidth: 1,
  },
});

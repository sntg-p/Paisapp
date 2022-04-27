import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, SectionList, SectionListData, SectionListRenderItemInfo } from 'react-native';
import ListItem from '../components/ListItem';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MotiText, MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

import { useThemeColor } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Input from '../components/Input';
import { useUser } from '../contexts/UserContext';
import useApi, { ApiResponse } from '../hooks/useApi';
import { FadeIn } from 'react-native-reanimated';
import useDebounce from '../hooks/useDebounce';
import Colors from '../constants/Colors';

export interface Contact {
  id: number,
  name: string,
  lastName: string,
  phone: string,
  contacted: string,
}

const renderItem = ({ item: { name, lastName, phone }, index }: SectionListRenderItemInfo<Contact>) => (
  <MotiView
    from={{
      opacity: 0,
      transform: [{ translateX: -50 }],
    }}
    animate={{
      opacity: 1,
      transform: [{ translateX: 0 }],
    }}
    transition={{
      type: 'timing',
      duration: 300,
      delay: 100 + index * 50,
      easing: Easing.out(Easing.ease)
    }}
  >
    <ListItem
      title={`${name} ${lastName}`}
      description={phone}
      hue={197}
      icon={(size, color) => (<Ionicons name="person" size={size} color={color} />)} />
  </MotiView>
);

const ItemSeparatorComponent = (
  <View style={{
    height: 16,
    backgroundColor: 'transparent'
  }}/>
);

const keyExtractor = ({ id, name, lastName }: Contact) => `${id}-${name}-${lastName}`;

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

  const renderSectionHeader = ({ section }: { section: SectionListData<Contact>}) => (
    <MotiText
      style={[styles.sectionTitle, {
        color: textColor,
        borderBottomColor: dividerColor,
      }]}
      from={{
        opacity: 0,
        transform: [{ translateX: -50 }],
      }}
      animate={{
        opacity: 1,
        transform: [{ translateX: 0 }],
      }}
      transition={{
        type: 'timing',
        duration: 300,
        delay: 50,
        easing: Easing.out(Easing.ease)
      }}
    >
      {section.title}
    </MotiText>
  );

  return (
    <>
      <MotiView
        style={{
          padding: 24,
          paddingBottom: 0,
        }}
        entering={FadeIn.duration(300)}
        from={{
          opacity: 0,
          transform: [{ translateX: -50 }],
        }}
        animate={{
          opacity: 1,
          transform: [{ translateX: 0 }],
        }}
        transition={{
          type: 'timing',
          duration: 300,
          easing: Easing.out(Easing.ease)
        }}
      >
        <Input
          placeholder='Ingresa un nombre o un número'
          left={<Feather name="search" size={24} color={textColor} />}
          onChangeText={(text) => {
            setSearch(text);
          }}
          value={search}
        />
      </MotiView>

      <SectionList
        sections={filteredContacts || contacts || []}
        ItemSeparatorComponent={() => ItemSeparatorComponent}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={keyExtractor}
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
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});

import { StyleSheet, View, SectionList, SectionListData } from 'react-native';
import ListItem from '../components/ListItem';
import LastTransactionList from '../components/LastTransactionList';
import { Text, useThemeColor } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Input from '../components/Input';

interface Contact {
  id: number,
  name: string,
  lastName: string,
  phone: string,
  contacted: string,
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "Belen",
    lastName: "Salvador",
    phone: "+541155634422",
    contacted: "2022-04-22T17:14:44.586Z"
  },
  {
    id: 1,
    name: "Jorge",
    lastName: "Cruz",
    phone: "+541122334521",
    contacted: "2022-04-21T17:14:44.586Z"
  },
  {
    id: 1,
    name: "Ronaldo",
    lastName: "Martins",
    phone: "+541122334212",
    contacted: "2022-04-14T17:14:44.586Z"
  },
  {
    id: 1,
    name: "Lidia",
    lastName: "Roldan",
    phone: "+541129994212",
    contacted: "2022-04-14T17:14:44.586Z"
  },
  {
    id: 1,
    name: "Monica",
    lastName: "Lopez",
    phone: "+541145024212",
    contacted: "2022-04-09T17:14:44.586Z"
  },
  {
    id: 1,
    name: "Carlos",
    lastName: "Martins",
    phone: "+541112344212",
    contacted: "2022-04-08T17:14:44.586Z"
  }
];

const asd: SectionListData<Contact>[] = [
  {
    data: contacts.slice(0, 2),
    title: 'Recientes'
  },
  {
    data: contacts,
    title: 'Todos'
  },
];

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const textColor = useThemeColor({ name: 'baseText' });

  return (
    <View>
      <SectionList
        sections={asd}
        ListHeaderComponent={() => (
          <View>
            <Input placeholder='Ingresa un nombre o un número'/>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{
            height: 16,
            backgroundColor: 'transparent'
          }}/>
        )}
        renderItem={({ item: { name, lastName, phone, id } }) => (
          <ListItem
            title={`${name} ${lastName}`}
            description={phone}
            hue={197}
            icon={'contact'}
          />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={{
            fontSize: 16,
            lineHeight: 22,
            color: textColor,
            marginVertical: 16,
          }}>
            {section.title}
          </Text>
        )}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 24,
        }}
        keyExtractor={({ id, name, lastName }) => `${id}-${name}-${lastName}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
});

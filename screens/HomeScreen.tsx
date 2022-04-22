import { StyleSheet, ScrollView, View } from 'react-native';

import { RootTabScreenProps, User } from '../types';
import { Text } from '../components/Themed';
import CardCarousel from '../components/CardCarousel';
import ServicesSection from '../components/ServicesSection';
import LastTransactionsSection from '../components/LastTransactionsSection';
import { useColorScheme } from 'react-native';

const user: User = {
  name: 'Soy Paisanx',
  cards: [
    {
      id: 1,
      number: "1234 2345 2345 1234",
      balance: 978.85,
      symbol: "USD",
      expDate: "02/30"
    },
    {
      id: 2,
      number: "1234 2345 2345 1235",
      balance: 100,
      symbol: "USD",
      expDate: "02/24"
    },
    {
      id: 3,
      number: "1234 2345 2345 3322",
      balance: 50,
      symbol: "USD",
      expDate: "02/24"
    }
  ],
}

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={styles.container}>
      <CardCarousel user={user}/>

      <View style={{
        backgroundColor: 'transparent'
      }}>
        <ServicesSection/>
        <LastTransactionsSection/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    marginTop: -96,
    paddingTop: 108
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    lineHeight: 26,
    marginTop: 32,
    marginBottom: 24,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

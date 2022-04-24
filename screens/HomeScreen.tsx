import { StyleSheet, ScrollView, View } from 'react-native';

import { RootTabScreenProps, User } from '../types';
import CardCarousel from '../components/CardCarousel';
import ServiceList from '../components/ServiceList';
import LastTransactionList from '../components/LastTransactionList';
import { useUser } from '../contexts/UserContext';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const user = useUser(state => state.user!)

  return (
    <LastTransactionList>
      <CardCarousel user={user}/>
      <ServiceList/>
    </LastTransactionList>
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

import { RootTabScreenProps, User } from '../types';
import CardCarousel from '../components/CardCarousel';
import ServiceList from '../components/ServiceList';
import LastTransactionList from '../components/LastTransactionList';
import { useUser } from '../contexts/UserContext';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const user = useUser(state => state.user)

  return (
    <LastTransactionList>
      {user && <CardCarousel user={user}/>}
      <ServiceList/>
    </LastTransactionList>
  );
}

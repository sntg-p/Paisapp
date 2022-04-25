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

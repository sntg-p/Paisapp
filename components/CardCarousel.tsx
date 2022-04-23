import { StyleSheet, View } from 'react-native';
import { User } from '../types';
import CardItem from './CardItem';

export default function CardCarousel(props: { user: User }) {
  const { user } = props;

  return (
    <View style={styles.carousel}>
      {user.cards.map(card => (
        <CardItem
          key={card.id}
          name={user.name}
          card={card}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingLeft: 24,
    paddingRight: 32,
    flexDirection: 'row',
  },
});

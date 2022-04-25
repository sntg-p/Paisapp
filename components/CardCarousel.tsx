import { StyleSheet, View, FlatList } from 'react-native';
import { User } from '../types';
import CardItem from './CardItem';

export default function CardCarousel(props: { user: User }) {
  const { user: { name, cards } } = props;

  return (
    <FlatList
      data={cards}
      ListHeaderComponent={() => (
        <View style={{ width: 24 }}/>
      )}
      ListFooterComponent={() => (
        <View style={{ width: 24 }}/>
      )}
      ItemSeparatorComponent={() => (
        <View style={{ width: 12 }}/>
      )}
      renderItem={({ item }) => (
        <CardItem
          key={item.id}
          name={name}
          card={item}
        />
      )}
      snapToInterval={344}
      decelerationRate="fast"
      horizontal={true}
      keyExtractor={(item) => String(item.id)}
      style={styles.carousel}
    />
  );
}

const styles = StyleSheet.create({
  carousel: {
    marginHorizontal: -24,
  },
});

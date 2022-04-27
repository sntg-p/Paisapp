import { StyleSheet, View, FlatList, ListRenderItemInfo } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

import { Card, User } from '../types';
import CardItem from './CardItem';

const ItemSeparatorComponent = <View style={{ width: 12 }}/>;

const ItemHeaderComponent = <View style={{ width: 24 }}/>;

const renderItem = ({ item, index }: ListRenderItemInfo<Card>, name: string) => {
  return (
    <MotiView
      from={{
        opacity: 0,
        transform: [{ translateY: 50 }],
      }}
      animate={{
        opacity: 1,
        transform: [{ translateY: 0 }],
      }}
      transition={{
        type: 'timing',
        duration: 500,
        delay: index * 100,
        easing: Easing.out(Easing.ease)
      }}
    >
      <CardItem
        key={item.id}
        name={name}
        card={item}
      />
    </MotiView>
  );
}

const keyExtractor = (item: Card) => String(item.id);

export default function CardCarousel(props: { user: User }) {
  const { user: { name, cards } } = props;

  return (
    <FlatList
      data={cards}
      ListHeaderComponent={ItemHeaderComponent}
      ListFooterComponent={ItemHeaderComponent}
      ItemSeparatorComponent={() => ItemSeparatorComponent}
      renderItem={(info) => renderItem(info, name)}
      snapToInterval={344}
      decelerationRate="fast"
      horizontal={true}
      keyExtractor={keyExtractor}
      style={styles.carousel}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  carousel: {
    marginHorizontal: -24,
  },
  contentContainer: {
    marginTop: 16,
    marginBottom: 24,
  }
});

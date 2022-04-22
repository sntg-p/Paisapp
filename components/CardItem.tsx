import { StyleSheet, useColorScheme, View } from 'react-native';
import Colors from '../constants/Colors';
import { Card, User } from '../types';

import { Text } from './Themed';

export default function CardItem(props: { name: string, card: Card }) {
  const {
    name,
    card: {
      number,
      balance,
      symbol,
      expDate,
    }
  } = props;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Balance
      </Text>

      {/* TODO: Linear gradient */}
      <View style={styles.balanceContainer}>
        <View style={styles.symbolContainer}>
          <Text style={styles.symbol}>
            {symbol}
          </Text>
        </View>

        <Text style={styles.balance}>
          {balance}
        </Text>
      </View>

      <Text style={styles.number}>
        **** **** **** {number.slice(14)}
      </Text>

      <View style={styles.bottomContainer}>
        <Text style={styles.name}>
          {name}
        </Text>

        <View style={styles.expDateContainer}>
          <Text style={styles.expDateTitle}>
            Exp. Date
          </Text>

          <Text style={styles.expDate}>
            {expDate}
          </Text>
        </View>
      </View>
    </View>
  );
}

export function CardCarousel(props: { user: User }) {
  const { user } = props;

  return (
    <View style={{
      width: '100%',
      padding: 24,
    }}>
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
  card: {
    backgroundColor: 'hsla(217, 100%, 47%, 1)',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    width: '100%',
  },
  title: {
    color: 'white',
    lineHeight: 22,
  },
  symbol: {
    color: 'white',
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 22,
  },
  symbolContainer: {
    backgroundColor: 'hsla(225, 91%, 70%, 1)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  balanceContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  balance: {
    color: 'white',
    fontFamily: "Poppins_500Medium",
    fontSize: 22,
    lineHeight: 28,
  },
  number: {
    color: 'white',
    fontFamily: "Poppins_400Regular",
    fontSize: 22,
    lineHeight: 28,
  },
  bottomContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  name: {
    color: 'white',
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 22,
  },
  expDateContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'center',
  },
  expDateTitle: {
    color: 'white',
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
    lineHeight: 15,
  },
  expDate: {
    color: 'white',
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    lineHeight: 19.5,
  },
});

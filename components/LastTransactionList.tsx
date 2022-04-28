import {
  StyleSheet,
  Pressable,
  FlatList,
  ListRenderItemInfo,
  View,
} from "react-native";
import { Easing } from 'react-native-reanimated';
import { MotiView } from "moti";

import { Text, useThemeColor } from "./Themed";
import { Transaction, TransactionType } from "../types";
import { useUser } from "../contexts/UserContext";
import useApi, { ApiResponse } from "../hooks/useApi";
import { ReactNode, useEffect, useState } from "react";
import ListItem from "./ListItem";
import DebitIcon from "../icons/DebitIcon";
import PaymentIcon from "../icons/PaymentIcon";

const icons: {
  [key in TransactionType]: {
    hue: number,
    icon: (size: number, color: string) => React.ReactNode
  }
} = {
  PAYMENT: {
    hue: 264,
    icon: (_, color) => (<PaymentIcon color={color} />),
  },

  DEBIT: {
    hue: 147,
    icon: (_, color) => (<DebitIcon color={color} />),
  },
}

const ItemSeparatorComponent = (
  <View style={{
    height: 16,
    backgroundColor: "transparent",
  }}/>
);

interface LastTransactionListProps {
  children?: ReactNode;
}

function Footer() {
  const textColor = useThemeColor({ name: "accent" });

  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        marginVertical: 16,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <Text style={{ color: textColor }}>
        Ver todas las transacciones
      </Text>
    </Pressable>
  );
}

function renderItem({ item, index }: ListRenderItemInfo<Transaction>) {
  const { hue, icon } = icons[item.type];

  return (
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
        delay: index * 100,
        easing: Easing.out(Easing.ease)
      }}
    >
      <ListItem
        {...item}
        hue={hue}
        icon={icon}
        right={`$${item.total}`}
      />
    </MotiView>
  );
}

const keyExtractor = (item: Transaction): string => item.title + item.description;

export default function LastTransactionList({ children }: LastTransactionListProps) {
  const loggedIn = useUser(state => state.loggedIn);
  const transactions = useUser(state => state.transactions);
  const setTransactions = useUser(state => state.setTransactions);
  const [errorMessage, setError] = useState('');
  const { get, loading, error } = useApi();

  useEffect(() => {
    if (!loggedIn || transactions)
      return;

    const fetchTransactions = async () => {
      const transactions: ApiResponse<Transaction[]> = await get('/transactions')

      if (transactions.success) {
        setTransactions(transactions.data);
      } else if (transactions.error) {
        setError(transactions.error);
      }
    };

    fetchTransactions();
  }, [transactions]);

  useEffect(() => {
    if (error) setError(error.message);
  }, [error]);

  const subtitleColor = useThemeColor({ name: "secondaryText" });

  return (
    <FlatList
      ListHeaderComponent={
        <>
          {children}
          <Text style={styles.title}>Últimas transacciones</Text>
          {loading || errorMessage ? (
            <Text style={[styles.title, { color: subtitleColor }]}>
              {loading ? 'Cargando...' : errorMessage}
            </Text>
          ): null}
        </>
      }
      data={transactions}
      ItemSeparatorComponent={() => ItemSeparatorComponent}
      ListFooterComponent={Footer}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={keyExtractor}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    lineHeight: 26,
    paddingBottom: 24,
  },
  contentContainer: {
    paddingTop: 96,
    paddingHorizontal: 24,
  },
});

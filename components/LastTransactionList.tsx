import {
  StyleSheet,
  Pressable,
  FlatList,
  ListRenderItemInfo,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Easing } from 'react-native-reanimated';
import { MotiView } from "moti";

import { Text } from "./Themed";
import { Transaction, TransactionType } from "../types";
import { useUser } from "../contexts/UserContext";
import useApi, { ApiResponse } from "../hooks/useApi";
import { ReactNode, useEffect, useState } from "react";
import ListItem from "./ListItem";

const icons: {
  [key in TransactionType]: {
    hue: number,
    icon: (size: number, color: string) => React.ReactNode
  }
} = {
  PAYMENT: {
    hue: 264,
    icon: (size, color) => (
      <FontAwesome5 name="wallet" size={size} style={{ color }}/>
    )
  },

  DEBIT: {
    hue: 147,
    icon: (size, color) => (
      <Entypo name="arrow-down" size={size} color={color} />
    )
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
  const theme = useTheme();

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
      <Text style={{ color: theme.colors.primary }}>
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
  const transactions = useUser(state => state.transactions);
  const setTransactions = useUser(state => state.setTransactions);
  const [errorMessage, setError] = useState('');
  const { get, loading, error } = useApi();

  useEffect(() => {
    if (transactions)
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

  return (
    <FlatList
      ListHeaderComponent={
        <>
          {children}
          <Text style={styles.title}>Últimas transacciones</Text>
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
    paddingTop: 80,
    paddingHorizontal: 24,
  },
});

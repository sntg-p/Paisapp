import {
  StyleSheet,
  Pressable,
  useColorScheme,
  FlatList,
  ListRenderItemInfo,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { useThemeColor } from "./Themed";
import { Text } from "./Themed";
import { useTheme } from "@react-navigation/native";
import Shadow from "./Shadow";
import { Transaction, TransactionType } from "../types";
import { useUser } from "../contexts/UserContext";
import useApi, { ApiResponse } from "../hooks/useApi";
import { ReactNode, useEffect, useState } from "react";

const icons: { [key in TransactionType]: { hue: number, icon: (size: number, color: string) => React.ReactNode } } = {
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

interface LastTransactionListProps {
  children?: ReactNode;
}

export default function LastTransactionList({ children }: LastTransactionListProps) {
  const transactions = useUser(state => state.transactions);
  const setTransactions = useUser(state => state.setTransactions);
  const [errorMessage, setError] = useState('');
  const { get, post, loading, error } = useApi();

  useEffect(() => {
    if (!transactions) {
      const fetchTransactions = async () => {
        const transactions: ApiResponse<Transaction[]> = await get('/transactions')

        if (transactions.success) {
          setTransactions(transactions.data);
        } else if (transactions.error) {
          setError(transactions.error);
        }
      };

      fetchTransactions();
    }
  }, [transactions]);

  if (transactions)
    return (
      <FlatList
        ListHeaderComponent={
          <>
            {children}
            <Text style={styles.title}>Últimas transacciones</Text>
          </>
        }
        data={transactions}
        ItemSeparatorComponent={() => (
          <View style={{
            height: 16,
            backgroundColor: "transparent",
          }}/>
        )}
        ListFooterComponent={Footer}
        renderItem={renderTransactionItem}
        contentContainerStyle={{
          paddingTop: 102,
          paddingHorizontal: 24,
        }}
        keyExtractor={(item) => item.title + item.description}
      />
    );

  let text = 'Cargando últimas transacciones...';

  if (errorMessage)
    text = 'Error al cargar últimas transacciones, reintentar';

  if (error)
    text = error.message;

  if (loading)
    text = 'Cargando últimas transacciones...';

  return (
    <View style={{
      paddingTop: 36,
      paddingHorizontal: 24,
    }}>
      <Text style={styles.title}>Últimas transacciones</Text>
      <Text>{text}</Text>
    </View>
  );
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

function renderItem({ item }: ListRenderItemInfo<ListItemProps>) {
  return <ListItem key={item.title} {...item} />;
}

function renderTransactionItem({ item }: ListRenderItemInfo<Transaction>) {
  const { hue, icon } = icons[item.type];

  return (
    <ListItem
      key={item.title}
      {...item}
      hue={hue}
      icon={icon}
      right={`$${item.total}`}
    />
  );
}

interface ListItemProps {
  icon: string | ((size: number, color: string) => React.ReactNode);
  title: string;
  description: string;
  right?: string;
  hue: number;
}

function ListItem(props: ListItemProps) {
  const { icon, title, description: subtitle, right, hue } = props;

  const colorScheme = useColorScheme();

  const iconColor =
    colorScheme === "dark"
      ? `hsla(${hue}, 36%, 48%, 1)`
      : `hsla(${hue}, 64%, 64%, 1)`;

  const iconBackgroundColor =
    colorScheme === "dark"
      ? `hsla(${hue}, 24%, 12%, 1)`
      : `hsla(${hue}, 100%, 95%, 1)`;

  const textColor = useThemeColor({ name: "secondaryText" });
  const subColor = useThemeColor({ name: "baseText" });
  const { colors } = useTheme();

  const backgroundColor = colors.card;

  return (
    <Shadow>
      <Pressable
        style={({ pressed }) => ({
          flexDirection: "row",
          backgroundColor: colors.card,
          alignItems: "center",
          width: "100%",
          paddingVertical: 24,
          paddingHorizontal: 16,
          borderRadius: 16,
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <View
          style={{
            backgroundColor: iconBackgroundColor,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
            marginRight: 16,
            height: 44,
            width: 44,
          }}
        >
          {typeof icon === "string" ? (
            <FontAwesome5
              name="wallet"
              size={18}
              style={{ color: iconColor }}
            />
          ) : (
            icon(18, iconColor)
          )}
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                color: textColor,
              },
            ]}
          >
            {title}
          </Text>

          {subtitle ? (
            <Text
              style={[
                styles.cardSubtitle,
                {
                  color: subColor,
                },
              ]}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        {subtitle ? (
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 14,
              lineHeight: 18,
              color: iconColor,
            }}
          >
            {right}
          </Text>
        ) : null}
      </Pressable>
    </Shadow>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    lineHeight: 26,
    paddingBottom: 24,
  },
  cardTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 22,
  },
  cardSubtitle: {
    fontSize: 12,
    lineHeight: 18,
  },
});

import { StyleSheet, Pressable, useColorScheme } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { useThemeColor, View } from './Themed';
import { Text } from './Themed';
import { useTheme } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';

const services: ListItemProps[] = [
  {
    title: 'Adobe',
    subtitle: 'Pago de suscripcion',
    right: '$125',
    icon: 'wallet',
    hue: 264
  },
  {
    title: 'Juan David',
    subtitle: 'Pago recibido',
    right: '$95',
    icon: (size, color) => <Entypo name="arrow-down" size={size} color={color} />,
    hue: 147
  },
  {
    title: 'John Doe',
    subtitle: 'Pago recibido',
    right: '$30',
    icon: (size, color) => <Entypo name="arrow-down" size={size} color={color} />,
    hue: 147
  },
]

export default function LastTransactionsSection() {
  return (
    <>
      <Text style={styles.title}>
        Últimas transacciones
      </Text>

      <View style={styles.container}>
        {services.map(service => (
          <ListItem key={service.title} {...service}/>
        ))}
      </View>
    </>
  );
}

interface ListItemProps {
  icon: string | ((size: number, color: string) => React.ReactNode);
  title: string;
  subtitle: string;
  right?: string;
  hue: number;
}

function ListItem(props: ListItemProps) {
  const { icon, title, subtitle, right, hue } = props;

  const colorScheme = useColorScheme();

  const iconColor = colorScheme === 'dark' ?
    `hsla(${hue}, 36%, 48%, 1)` :
    `hsla(${hue}, 64%, 64%, 1)`;

  const iconBackgroundColor = colorScheme === 'dark' ?
    `hsla(${hue}, 24%, 12%, 1)` :
    `hsla(${hue}, 100%, 95%, 1)`;

  const textColor = useThemeColor({}, 'secondaryText');
  const subColor = useThemeColor({}, 'baseText');
  const { colors } = useTheme();

  const backgroundColor = colors.card

  return (
    <Shadow
      viewStyle={{ alignSelf: 'stretch' }}
      radius={16}
      startColor="hsla(0, 0%, 0%, 0.06)"
      offset={[0, 8]}
      distance={30}
    >
      <Pressable
        style={({ pressed }) => ({
          flexDirection: 'row',
          backgroundColor: colors.card,
          alignItems: 'center',
          width: '100%',
          paddingVertical: 24,
          paddingHorizontal: 16,
          borderRadius: 16,
          gap: 16,
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <View style={{
          backgroundColor: iconBackgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
          height: 44,
          width: 44,
        }}>
          {typeof icon === 'string' ? (
            <FontAwesome5
              name="wallet"
              size={18}
              style={{ color: iconColor }}
            />
          ) : icon(18, iconColor)}
        </View>

        <View style={{
          flex: 1,
          backgroundColor,
          justifyContent: 'space-between',
        }}>
          <Text style={[styles.cardTitle, {
            color: textColor
          }]}>
            {title}
          </Text>

          {subtitle ? (
            <Text style={[styles.cardSubtitle, {
              color: subColor
            }]}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {subtitle ? (
          <Text style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 14,
            lineHeight: 18,
            color: iconColor
          }}>
            {right}
          </Text>
        ) : null}
      </Pressable>
    </Shadow>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    gap: 16,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    lineHeight: 26,
    marginTop: 32,
    marginBottom: 24,
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

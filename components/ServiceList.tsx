import { StyleSheet, Pressable, useColorScheme, View } from 'react-native';
import { Easing } from 'react-native-reanimated';

import { useThemeColor } from './Themed';
import { Text } from './Themed';
import { MotiView } from 'moti';
import { shadow } from './Shadow';
import WalletIcon from '../icons/WalletIcon';
import TransferIcon from '../icons/TransferIcon';
import PayIcon from '../icons/PayIcon';
import TopupIcon from '../icons/TopupIcon';

const services: ServiceProps[] = [
  {
    title: 'Billetera',
    icon: (_, color) => (<WalletIcon color={color} />),
    hue: 147
  },
  {
    title: 'Transferir',
    icon: (_, color) => (<TransferIcon color={color} />),
    hue: 28
  },
  {
    title: 'Pagar',
    icon: (_, color) => (<PayIcon color={color} />),
    hue: 277
  },
  {
    title: 'Recargar',
    icon: (_, color) => (<TopupIcon color={color} />),
    hue: 195
  },
]

export default function ServiceList() {
  return (
    <MotiView
      style={styles.container}
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
        delay: 150,
        duration: 300,
        easing: Easing.out(Easing.ease)
      }}
    >
      <Text style={styles.title}>
        Servicios
      </Text>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
      }}>
        {services.map(service => (
          <ServiceButton key={service.title} {...service}/>
        ))}
      </View>
    </MotiView>
  );
}

interface ServiceProps {
  icon?: ((size: number, color: string) => React.ReactNode);
  title: string;
  hue: number;
}

function ServiceButton(props: ServiceProps) {
  const { icon, title, hue } = props;

  const colorScheme = useColorScheme();

  const iconColor = colorScheme === 'dark' ?
    `hsl(${hue}, 36%, 48%)` :
    `hsl(${hue}, 64%, 64%)`;

  const backgroundColor = colorScheme === 'dark' ?
    `hsl(${hue}, 24%, 12%)` :
    `hsl(${hue}, 100%, 95%)`;

  const textColor = useThemeColor({ name: 'secondaryText' });

  return (
    <Pressable
      style={({ pressed }) => ({
        alignItems: 'center',
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <View style={{
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        height: 64,
        width: 64,
        ...(shadow(30)),
      }}>
        {icon ? (
          icon(24, iconColor)
        ) : null}
      </View>

      <Text style={[styles.name, {
        color: textColor
      }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingBottom: 32,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    lineHeight: 26,
    marginTop: 8,
    marginBottom: 24,
  },
  name: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 16,
  },
});

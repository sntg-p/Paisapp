import { StyleSheet, Pressable, useColorScheme, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Shadow } from 'react-native-shadow-2';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { useThemeColor } from './Themed';
import { Text } from './Themed';

const services: ServiceProps[] = [
  {
    title: 'Billetera',
    icon: 'wallet',
    hue: 147
  },
  {
    title: 'Transferir',
    icon: (size, color) => <MaterialIcons name="swap-vert" size={size} color={color}/>,
    hue: 28
  },
  {
    title: 'Pagar',
    icon: (size, color) => <FontAwesome name="file-text" size={size} color={color}/>,
    hue: 277
  },
  {
    title: 'Recargar',
    icon: (size, color) => <Feather name="smartphone" size={size} color={color}/>,
    hue: 195
  },
]

export default function ServiceList() {
  return (
    <Animated.View
      style={styles.container}
      entering={FadeInUp.delay(150).duration(300)}
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
    </Animated.View>
  );
}

interface ServiceProps {
  icon: string | ((size: number, color: string) => React.ReactNode);
  title: string;
  hue: number;
}

function ServiceButton(props: ServiceProps) {
  const { icon, title, hue } = props;

  const colorScheme = useColorScheme();

  const iconColor = colorScheme === 'dark' ?
    `hsla(${hue}, 36%, 48%, 1)` :
    `hsla(${hue}, 64%, 64%, 1)`;

  const backgroundColor = colorScheme === 'dark' ?
    `hsla(${hue}, 24%, 12%, 1)` :
    `hsla(${hue}, 100%, 95%, 1)`;

  const textColor = useThemeColor({ name: 'secondaryText' });

  return (
    <Pressable
      style={({ pressed }) => ({
        alignItems: 'center',
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Shadow
        viewStyle={{
          alignSelf: 'stretch',
        }}
        radius={16}
        startColor="hsla(0, 0%, 0%, 0.06)"
        offset={[0, 8]}
        distance={30}
      >
        <View style={{
          backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 16,
          height: 64,
          width: 64,
        }}>
          {typeof icon === 'string' ? (
            <FontAwesome5
              name="wallet"
              size={24}
              style={{ color: iconColor }}
            />
          ) : icon(24, iconColor)}
        </View>
      </Shadow>

      <Text style={[styles.asd, {
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
    marginTop: 32,
    marginBottom: 24,
  },
  asd: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 16,
  },
});

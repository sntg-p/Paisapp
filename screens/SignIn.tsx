import { StyleSheet, View, Pressable } from 'react-native';

import { Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useTheme } from '@react-navigation/native';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';

export default function SignInScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={styles.iconBackground}/>
        <Text style={styles.title}>Paisapp</Text>
        <Text style={styles.subtitle}>Comienza a manejar tu vida financiera</Text>
      </View>

      <View style={{
        width: '100%',
        paddingHorizontal: 24,
      }}>
        <Input label='Email' placeholder='Ingresa tu email'/>
        <View style={{ height: 24 }}/>
        <Input label='Contraseña' placeholder='Ingresa tu contraseña'/>
        <View style={{ height: 16 }}/>
        <Checkbox text="Recordarme"/>
      </View>

      <View style={{ flex: 1 }}/>

      <View style={{
        paddingHorizontal: 24,
        paddingBottom: 36,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Pressable
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            width: '100%',
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <Text style={{
            fontSize: 18,
            fontFamily: 'Poppins_500Medium',
            lineHeight: 24,
          }}>
            No tienes cuenta? <Text style={{ color: theme.colors.primary }}>Regístrate</Text>
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            width: '100%',
            borderRadius: 16,
            marginTop: 24,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'hsla(217, 100%, 47%, 1)',
          })}
        >
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontFamily: 'Poppins_600SemiBold',
            lineHeight: 22,
          }}>
            Ingresar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 128,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 40,
    lineHeight: 60,
    letterSpacing: -1.56,
    color: 'hsla(217, 100%, 47%, 1)',
    marginVertical: 12,
  },
  subtitle: {
    color: 'hsla(218, 14%, 51%, 1)',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
  },
  iconBackground: {
    backgroundColor: 'hsla(217, 100%, 47%, 1)',
    borderRadius: 12,
    width: 48,
    height: 48,
  },
});

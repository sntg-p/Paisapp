import { StyleSheet, View, Pressable } from 'react-native';

import { Text } from '../components/Themed';
import { RootTabScreenProps, Transaction, User } from '../types';
import { useTheme } from '@react-navigation/native';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import useApi, { ApiResponse } from '../hooks/useApi';
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';

export default function LogInScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const theme = useTheme();
  const setUser = useUser(state => state.setUser);
  const { get, post, loading } = useApi();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const handleLogIn = () => {
    setError(undefined);

    (async () => {
      const login: ApiResponse = await post('/login', { email, password });

      if (login.success) {
        console.log('login success');

        const fetchUser = async () => {
          const user: ApiResponse<User> = await get('/user')

          if (user.success) {
            setUser(user.data);
          } else if (user.error) {
            setError(user.error);
          }
        };

        fetchUser();
      } else if (login.error) {
        setError(login.error);
        console.log(login.error);
      }
    })();
  };

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
        <Input
          label='Email'
          placeholder='Ingresa tu email'
          onChangeText={(text) => setEmail(text)}
        />

        <View style={{ height: 24 }}/>

        <Input
          label='Contraseña'
          placeholder='Ingresa tu contraseña'
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

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
        {error ? (
          <Text style={{
            fontSize: 18,
            fontFamily: 'Poppins_500Medium',
            lineHeight: 24,
            color: 'red',
            marginBottom: 16,
          }}>
            {error}
          </Text>
        ) : null}

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
            backgroundColor: !loading ? 'hsla(217, 100%, 47%, 1)' : theme.colors.primary,
          })}
          onPress={handleLogIn}
          disabled={loading}
        >
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontFamily: 'Poppins_600SemiBold',
            lineHeight: 22,
          }}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
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

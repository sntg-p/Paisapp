import { StyleSheet, View, Pressable, TextInput } from 'react-native';

import { useRef, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Easing } from 'react-native-reanimated';

import { Text } from '../components/Themed';
import { RootStackScreenProps, User } from '../types';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import useApi, { ApiResponse } from '../hooks/useApi';
import { useUser } from '../contexts/UserContext';
import { shadow } from '../components/Shadow';

export default function LogInScreen({ navigation }: RootStackScreenProps<'LogIn'>) {
  const theme = useTheme();
  const setUser = useUser(state => state.setUser);
  const { get, post, loading } = useApi();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const passwordRef = useRef<TextInput>(null);

  const handleLogIn = () => {
    setError(undefined);

    const login = async () => {
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
    };

    login();
  };

  return (
    <View style={styles.container}>
      <MotiView
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
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
          easing: Easing.out(Easing.ease)
        }}
      >
        <View style={styles.iconBackground}/>
        <Text style={styles.title}>Paisapp</Text>
        <Text style={styles.subtitle}>Comienza a manejar tu vida financiera</Text>
      </MotiView>

      <MotiView
        style={{
          width: '100%',
          paddingHorizontal: 24,
        }}
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
          delay: 100,
          duration: 500,
          easing: Easing.out(Easing.ease)
        }}
      >
        <Input
          label='Email'
          placeholder='Ingresa tu email'
          onChangeText={(text) => setEmail(text.trim())}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        <View style={{ height: 24 }}/>

        <Input
          ref={passwordRef}
          label='Contraseña'
          placeholder='Ingresa tu contraseña'
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={handleLogIn}
        />

        <View style={{ height: 16 }}/>
        <Checkbox text="Recordarme"/>
      </MotiView>

      <View style={{ flex: 1 }}/>

      <MotiView
        style={{
          paddingHorizontal: 24,
          paddingBottom: 36,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        from={{
          opacity: 0,
          transform: [{ translateY: 50 }],
        }}
        animate={{
          opacity: 1,
          transform: [{ translateY: 0 }],
        }}
        exit={{
          opacity: 0,
          transform: [{ translateY: 50 }],
        }}
        transition={{
          type: 'timing',
          delay: 200,
          duration: 500,
          easing: Easing.out(Easing.ease)
        }}
      >
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

        <MotiPressable
          animate={({ pressed }) => {
            'worklet';

            return {
              opacity: pressed || loading ? 0.5 : 1,
            }
          }}
          containerStyle={styles.loginButtonContainer}
          style={styles.loginButton}
          onPress={handleLogIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Text>
        </MotiPressable>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 128,
    overflow: 'hidden',
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 22,
  },
  loginButton: {
    width: '100%',
    backgroundColor: 'hsla(217, 100%, 47%, 1)',
    borderRadius: 16,
    height: 60,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonContainer: {
    width: '100%',
    borderRadius: 16,
    marginTop: 24,
    // ...shadow(30, { color: 'hsl(217, 100%, 47%)', opacity: 0.5 }),
    ...shadow(30),
  },
});

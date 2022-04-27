import { StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '../components/Themed';
import { useUser } from '../contexts/UserContext';
import { MotiPressable } from 'moti/interactions';
import { shadow } from '../components/Shadow';

export default function TabTwoScreen() {
  const user = useUser(state => state.user);
  const clearUser = useUser(state => state.clearUser);
  const backgroundColor = useThemeColor({ name: 'background' });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estás seguro de que quieres salir?</Text>
      
      <MotiPressable
          animate={({ pressed }) => {
            'worklet';

            return {
              opacity: pressed ? 0.5 : 1,
            }
          }}
          containerStyle={{
            width: '100%',
            borderRadius: 16,
            marginTop: 24,
            backgroundColor,
            ...shadow(30),
          }}
          style={styles.logoutButton}
          onPress={clearUser}
        >
          <Text style={styles.buttonText}>
            Cerrar sesión
          </Text>
        </MotiPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'hsla(15, 100%, 47%, 1)',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 22,
  },
  logoutButton: {
    width: '100%',
    borderColor: 'hsla(15, 100%, 47%, 1)',
    borderWidth: 2,
    borderRadius: 16,
    height: 60,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

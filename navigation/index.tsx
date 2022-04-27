/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme as DefaultDarkTheme,
  Theme,
} from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName, Pressable, View } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ContactsScreen from '../screens/ContactsScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { Text, useThemeColor } from '../components/Themed';
import { StyleSheet } from 'react-native';
import LogInScreen from '../screens/LogInScreen';
import { useUser } from '../contexts/UserContext';

import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';

enableScreens(true);

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.background,
    card: Colors.light.foreground,
    primary: 'hsla(225, 91%, 70%, 1)',
    text: 'hsla(215, 24%, 26%, 1)',
  },
};

const DarkTheme: Theme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    background: Colors.dark.background,
    card: Colors.dark.foreground,
    primary: 'hsla(225, 91%, 70%, 1)',
  },
};

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const backgroundColor = useThemeColor({ name: 'background' });
  const loggedIn = useUser(state => state.loggedIn);

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor },
      }}
    >
      {loggedIn ? (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
          />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{
              title: 'Inicia sesión - Paisapp',
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const backgroundColor = useThemeColor({ name: 'background' });
  const headerColor = useThemeColor({ name: 'headerBackground' });
  const tintColor = useThemeColor({ name: 'tint' });
  const textColor = useThemeColor({ name: 'text' });

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        title: 'Home',
        tabBarActiveTintColor: tintColor,
      }}
      sceneContainerStyle={{ backgroundColor }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          headerTransparent: true,
          headerBackground: () => (
            <View style={{
              backgroundColor: headerColor,
              height: 80,
            }}/>
          ),
          headerStyle: {
            borderBottomColor: 'transparent',
            height: 80,
          },
          headerTitle: () => (
            <>
              <Text style={styles.title}>
                Hola
              </Text>

              <Text style={styles.subtitle}>
                Soy Paisanx
              </Text>
            </>
          ),
          headerTitleContainerStyle: styles.headerTitleContainerStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <View style={styles.headerRight}>
              <Pressable
                onPress={() => navigation.navigate("Modal")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                  margin: 12,
                })}
              >
                <FontAwesome
                  name="search"
                  size={25}
                  color={textColor}
                />
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate("Modal")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                  margin: 12,
                })}
              >
                <FontAwesome
                  name="bell-o"
                  size={25}
                  color={textColor}
                />
              </Pressable>
            </View>
          ),
        })}
      />
      <BottomTab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={({ navigation }: RootTabScreenProps<"Contacts">) => ({
          title: "Contactos",
          animation: 'fade',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={textColor}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginRight: 24,
  },
  headerStyle: {
    backgroundColor: 'hsla(0, 0%, 100%, 0.84)',
    borderBottomColor: 'transparent',
    height: 96,
  },
  headerTitleContainerStyle: {
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: 'transparent',
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 30,
  },
  subtitle:{
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    lineHeight: 30,
  },
});

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

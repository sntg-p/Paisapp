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
import { shadow } from '../components/Shadow';
import HomeIcon from '../icons/HomeIcon';
import DocumentIcon from '../icons/DocumentIcon';
import LogoutIcon from '../icons/LogoutIcon';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import NotificationIcon from '../icons/NotificationIcon';
import SearchIcon from '../icons/SearchIcon';

enableScreens(true);

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.background,
    card: Colors.light.foreground,
    primary: Colors.light.accent,
    text: Colors.light.text,
  },
};

const DarkTheme: Theme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    background: Colors.dark.background,
    card: Colors.dark.foreground,
    primary: Colors.dark.accent,
    text: Colors.dark.text,
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

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const backgroundColor = useThemeColor({ name: 'background' });
  const foregroundColor = useThemeColor({ name: 'foreground' });
  const headerColor = useThemeColor({ name: 'headerBackground' });
  const accentColor = useThemeColor({ name: 'accent' });
  const textColor = useThemeColor({ name: 'text' });

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        title: 'Home',
        tabBarActiveTintColor: accentColor,
        tabBarShowLabel: false,
        tabBarStyle: [styles.tabBar, {
          backgroundColor: foregroundColor
        }],
        headerBackground: () => (
          <View style={{
            height: 80,
          }}/>
        ),
        headerStyle: styles.headerStyle,
        headerTitle: ({ children }) => (
          <Text style={styles.title}>
            {children}
          </Text>
        )
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
              height: 96,
            }}/>
          ),
          headerStyle: styles.homeHeaderStyle,
          headerTitle: () => (
            <>
              <Text style={styles.homeTitle} allowFontScaling={false}>
                Hola
              </Text>

              <Text style={styles.homeSubtitle} allowFontScaling={false}>
                Soy Paisanx
              </Text>
            </>
          ),
          headerTitleContainerStyle: styles.headerTitleContainerStyle,
          tabBarIcon: ({ color }) => <HomeIcon color={color}/>,
          headerRight: () => (
            <View style={styles.headerRight}>
              <Pressable
                onPress={() => navigation.navigate("Modal")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                  margin: 12,
                })}
              >
                <SearchIcon color={textColor}/>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate("Modal")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                  padding: 12,
                })}
              >
                <NotificationIcon color={textColor}/>
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
          tabBarIcon: ({ color }) => <DocumentIcon color={color}/>,
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginLeft: 24,
              })}
            >
              <ChevronLeftIcon color={textColor}/>
            </Pressable>
          ),
          headerTitleContainerStyle: {
            marginLeft: 24,
          }
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Cerrar sesión",
          tabBarIcon: ({ color }) => <LogoutIcon color={color}/>,
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginRight: 24,
  },
  headerStyle: {
    borderBottomColor: 'transparent',
    height: 80,
  },
  homeHeaderStyle: {
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
    fontSize: 22,
    lineHeight: 28,
  },
  homeTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 30,
  },
  homeSubtitle:{
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    lineHeight: 30,
  },
  tabBar: {
    height: 86,
    backgroundColor: Colors.light.foreground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopColor: 'transparent',
    ...shadow(30, { opacity: .1 }),
  }
});

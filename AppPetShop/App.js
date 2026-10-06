import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import * as Notifications from "expo-notifications";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./config/firebase";

import Login from "./screens/Login";
import Cadastro from "./screens/Cadastro";
import Home from "./screens/Home";
import Notificacoes from "./screens/Notificacoes";
import Perfil from "./screens/Perfil";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MenuPrincipal() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#7657C8",
        tabBarInactiveTintColor: "#A9A0C5",

        tabBarStyle: {
          height: 68,
          paddingBottom: 8,
          paddingTop: 6,
          borderTopWidth: 0,
          backgroundColor: "#FFFFFF",
          elevation: 10,
          shadowColor: "#6C63A8",
          shadowOpacity: 0.12,
          shadowRadius: 10,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "home"
              : "home-outline";
          } else if (
            route.name === "Notificações"
          ) {
            iconName = focused
              ? "notifications"
              : "notifications-outline";
          } else {
            iconName = focused
              ? "person"
              : "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
      />

      <Tab.Screen
        name="Notificações"
        component={Notificacoes}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(auth, (user) => {
        setUsuario(user);
        setCarregando(false);
      });

    return unsubscribe;
  }, []);

  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F4F0FF",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#7657C8"
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        {!usuario ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
            />

            <Stack.Screen
              name="Cadastro"
              component={Cadastro}
            />
          </>
        ) : (
          <Stack.Screen
            name="MenuPrincipal"
            component={MenuPrincipal}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
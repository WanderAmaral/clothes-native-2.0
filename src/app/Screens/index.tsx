import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyTheme } from "../components/theme-types";
import { Ionicons, Feather } from "@expo/vector-icons";

import Cart from "./Cart";
import Menu from "./Menu";
import User from "./User";
import DetailsPageScreens from "./DetailsPage";

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 70,
            alignItems: "center",
          },
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={DetailsPageScreens}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={30}
                color={focused ? "#E12727" : "#c0c0c0"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Menu"
          component={Menu}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "menu" : "menu-outline"}
                size={30}
                color={focused ? "#E12727" : "#c0c0c0"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="cart"
                size={30}
                color={focused ? "#E12727" : "#c0c0c0"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="user"
                size={size}
                color={focused ? "#E12727" : "#c0c0c0"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

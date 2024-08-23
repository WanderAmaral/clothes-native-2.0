import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useCartStore } from "@/store/cart";

import Cart from "./Cart";
import User from "./User";
import DetailsPageScreens from "./DetailsPage";
import { MyTheme } from "../components/theme-types";
import { useAuth, useOAuth } from "@clerk/clerk-expo";

const Tab = createBottomTabNavigator();

export function MyTabs() {
  const { products } = useCartStore();
  const cartQuantity = products.reduce(
    (total, product) => total + (product.quantity || 1),
    0
  );
  const { isSignedIn } = useAuth();

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

        {isSignedIn === true && (
          <>
            <Tab.Screen
              name="Cart"
              component={Cart}
              options={{
                tabBarLabel: "",
                tabBarIcon: ({ focused }) => (
                  <View>
                    <Ionicons
                      name="cart"
                      size={30}
                      color={focused ? "#E12727" : "#c0c0c0"}
                    />
                    {cartQuantity > 0 && (
                      <View
                        style={{
                          position: "absolute",
                          right: -6,
                          top: -3,
                          backgroundColor: "red",
                          borderRadius: 10,
                          width: 20,
                          height: 20,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          {cartQuantity}
                        </Text>
                      </View>
                    )}
                  </View>
                ),
              }}
            />
          </>
        )}

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

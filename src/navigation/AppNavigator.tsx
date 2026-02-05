import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Create a stack for Home tab
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: "slide_from_right",
    }}
  >
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
  </Stack.Navigator>
);

// Create a stack for Cart tab
const CartStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: "slide_from_right",
    }}
  >
    <Stack.Screen name="CartMain" component={CartScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
  </Stack.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let icon = "home";
            if (route.name === "Cart") icon = "cart";
            return <Icon name={icon} size={22} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Cart" component={CartStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

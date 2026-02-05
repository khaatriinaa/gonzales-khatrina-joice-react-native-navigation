import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import { useCart } from "../contexts/CartContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Keep your tabs exactly like before
const Tabs = () => {
  const { count } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let icon = "home";
          if (route.name === "Cart") icon = "cart";
          return <Icon name={icon} size={22} />;
        },
        tabBarBadge: route.name === "Cart" && count > 0 ? count : undefined,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // Slide effect applies only when navigating to Checkout
          animation: "slide_from_right",
        }}
      >
        {/* IMPORTANT: Tabs is top-level screen */}
        <Stack.Screen name="Tabs" component={Tabs} />

        {/* Checkout screen slides */}
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

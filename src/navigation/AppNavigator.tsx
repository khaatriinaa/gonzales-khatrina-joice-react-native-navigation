import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import { enableScreens } from "react-native-screens";

import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";

enableScreens(true);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  const { dark } = useTheme();
  const { cart } = useCart();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: dark ? "#fff" : "#1E90FF",
        tabBarInactiveTintColor: dark ? "#aaa" : "#555",
        tabBarStyle: {
          backgroundColor: dark ? "#121212" : "#fff",
          borderTopColor: dark ? "#222" : "#ccc",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cart" size={size} color={color} />
          ),
          tabBarBadge: cart.length > 0 ? cart.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#FF3B30",
            color: "#fff",
          },
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tabs layout for bottom navigation
const Tabs = () => {
  return (
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

// Main stack
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right", // slide effect for all stack navigations
        }}
      >
        {/* Tabs for bottom navigation */}
        <Stack.Screen name="Tabs" component={Tabs} />

        {/* Treat Checkout and Cart as stack screens to slide */}
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="CartStack" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

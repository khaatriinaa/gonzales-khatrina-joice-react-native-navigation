import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/contexts/CartContext";
import { ThemeProvider } from "./src/contexts/ThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}

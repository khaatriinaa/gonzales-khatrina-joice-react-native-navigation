import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/contexts/CartContext";
import { ThemeProvider } from "./src/contexts/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

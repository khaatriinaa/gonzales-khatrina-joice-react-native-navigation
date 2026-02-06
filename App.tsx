import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/contexts/CartContext";
import { ThemeProvider } from "./src/contexts/ThemeContext";
import { ProductsProvider } from './src/contexts/ProductsContext';
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
  <NavigationContainer>
      <ThemeProvider>
        <ProductsProvider>
          <CartProvider>
            <AppNavigator />
          </CartProvider>
        </ProductsProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}

import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Switch,
  Alert,
} from "react-native";

import { ScreenProps } from "../navigation/Props";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { styles } from "../styles/globalStyles";

/** Dummy products (SHEIN-style) */
const PRODUCTS = [
  { id: 1, name: "Brooklyn Graphic Tee", price: 499 },
  { id: 2, name: "Winner Oversized Shirt", price: 729 },
  { id: 3, name: "Minimal Cotton Top", price: 599 },
];

const HomeScreen: React.FC<ScreenProps<"Home">> = ({ navigation }) => {
  const { addToCart } = useCart();
  const { dark, toggleTheme } = useTheme();

  /** Add to cart with feedback */
  const handleAddToCart = (item: any) => {
    addToCart(item);
    Alert.alert(
      "Added to Cart 🛒",
      `${item.name} has been added to your cart.`
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: dark ? "#000" : "#fff" },
      ]}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text
          style={[
            styles.title,
            { color: dark ? "#fff" : "#000" },
          ]}
        >
          HOME
        </Text>

        {/* THEME TOGGLE (UPPER RIGHT ONLY) */}
        <Switch
          value={dark}
          onValueChange={toggleTheme}
        />
      </View>

      {/* PRODUCT LIST */}
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.name}
            </Text>

            <Text style={{ marginVertical: 6 }}>
              ₱{item.price}
            </Text>

            <Pressable
              style={styles.button}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.buttonText}>
                Add to Cart
              </Text>
            </Pressable>
          </View>
        )}
      />

      {/* OPTIONAL: QUICK ACCESS TO CART */}
      <Pressable
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={styles.buttonText}>
          Go to Cart
        </Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

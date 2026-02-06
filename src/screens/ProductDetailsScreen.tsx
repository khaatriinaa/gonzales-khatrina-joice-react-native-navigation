import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenProps } from "../navigation/Props";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { styles } from "../styles/globalStyles";

const ProductDetailsScreen: React.FC<
  ScreenProps<"ProductDetails"> & { route: any }
> = ({ route, navigation }) => {
  const { product } = route.params;
  const { cart, addToCart } = useCart();
  const { dark, toggleTheme } = useTheme();

const cartItem = cart.find(c => c.id === product.id);
const cartQty = cartItem?.quantity ?? 0;
const isOutOfStock = product.stock === 0 || cartQty >= product.stock;

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert("Added to Cart 🛒", product.name);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark ? "#000" : "#fff" }}>
      <View style={{ flex: 1 }}>

        {/* HEADER */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingTop: 10,
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 18, color: dark ? "#fff" : "#000" }}>
              ← Back
            </Text>
          </Pressable>

          <Switch value={dark} onValueChange={toggleTheme} />
        </View>

        {/* SCROLLABLE CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        >
          <Image
            source={{ uri: product.image }}
            style={{
              width: "100%",
              height: 300,
              borderRadius: 12,
              marginVertical: 20,
            }}
          />

          <View
            style={[
              styles.card,
              { backgroundColor: dark ? "#1a1a1a" : "#f2f2f2" },
            ]}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: dark ? "#fff" : "#000",
              }}
            >
              {product.name}
            </Text>

            <Text
              style={{
                fontSize: 18,
                marginVertical: 10,
                color: dark ? "#fff" : "#000",
              }}
            >
              ₱{product.price}
            </Text>

            <Text style={{ color: dark ? "#ccc" : "#555" }}>
              {product.description}
            </Text>
          </View>
        </ScrollView>

        {/* FIXED ADD TO CART BUTTON */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 16,
            backgroundColor: dark ? "#000" : "#fff",
            borderTopWidth: 1,
            borderTopColor: dark ? "#333" : "#ddd",
          }}
        >
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor:
                  product.stock === 0
                    ? "#999"
                    : dark
                    ? "#444"
                    : "#000",
              },
            ]}
            onPress={handleAddToCart}
            disabled={product.stock === 0 || (cart.find(c => c.id === product.id)?.quantity ?? 0) >= product.stock}
          >
            <Text style={styles.buttonText}>
              {product.stock === 0
                ? "Out of Stock"
                : cart.find((c) => c.id === product.id)
                ? `Add to Cart (${cart.find((c) => c.id === product.id)?.quantity})`
                : "Add to Cart"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

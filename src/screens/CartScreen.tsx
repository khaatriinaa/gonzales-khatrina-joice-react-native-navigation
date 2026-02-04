// src/screens/CartScreen.tsx
import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { styles } from "../styles/globalStyles";
import { ScreenProps } from "../navigation/Props";

const CartScreen: React.FC<ScreenProps<"Cart">> = ({ navigation }) => {
  const { cart, increase, decrease, total } = useCart();
  const { dark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: dark ? "#000" : "#fff" }]}>
      <Text style={[styles.title, { color: dark ? "#fff" : "#000" }]}>
        SHOPPING BAG
      </Text>

      {cart.length === 0 ? (
        <Text style={{ color: dark ? "#fff" : "#000" }}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                <Text>₱{item.price * item.quantity}</Text>

                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Pressable onPress={() => decrease(item.id)}>
                    <Text style={{ fontSize: 18 }}>➖</Text>
                  </Pressable>

                  <Text style={{ marginHorizontal: 15 }}>{item.quantity}</Text>

                  <Pressable onPress={() => increase(item.id)}>
                    <Text style={{ fontSize: 18 }}>➕</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />

          <Text style={{ fontWeight: "bold", marginTop: 10 }}>Total: ₱{total}</Text>

          {/* CHECKOUT BUTTON */}
          <Pressable
            style={[styles.button, { marginTop: 10 }]}
            onPress={() => navigation.navigate("Checkout")}
          >
            <Text style={styles.buttonText}>Checkout</Text>
          </Pressable>
        </>
      )}

      <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 10 }}>
        <Text style={{ color: dark ? "#fff" : "#000" }}>Go Back</Text>
      </Pressable>
    </View>
  );
};

export default CartScreen;

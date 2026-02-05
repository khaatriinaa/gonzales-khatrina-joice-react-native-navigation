import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { styles } from "../styles/globalStyles";
import { ScreenProps } from "../navigation/Props";

const CartScreen: React.FC<ScreenProps<"Cart">> = ({ navigation }) => {
  const { cart, increase, decrease, total } = useCart();
  const { dark } = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: dark ? "#000" : "#fff" }}
    >
      <View style={styles.container}>

        <Text style={[styles.title, { color: dark ? "#fff" : "#000" }]}>
          SHOPPING BAG
        </Text>

        {cart.length === 0 ? (
          <Text style={{ color: dark ? "#fff" : "#000" }}>
            Your cart is empty.
          </Text>
        ) : (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={{ fontWeight: "bold", color: dark ? "#fff" : "#000" }}>
                    {item.name}
                  </Text>

                  <Text style={{ color: dark ? "#fff" : "#000" }}>
                    ₱{item.price * item.quantity}
                  </Text>

                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Pressable onPress={() => decrease(item.id)}>
                      <Text style={{ fontSize: 18 }}>➖</Text>
                    </Pressable>

                    <Text style={{ marginHorizontal: 15, color: dark ? "#fff" : "#000" }}>
                      {item.quantity}
                    </Text>

                    <Pressable onPress={() => increase(item.id)}>
                      <Text style={{ fontSize: 18 }}>➕</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            />

            <Text style={{ fontWeight: "bold", marginTop: 10, color: dark ? "#fff" : "#000" }}>
              Total: ₱{total}
            </Text>

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
    </SafeAreaView>
  );
};

export default CartScreen;

import React, { useState } from "react";
import { View, Text, Pressable, Switch, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { styles } from "../styles/globalStyles";
import { ScreenProps } from "../navigation/Props";

const CheckoutScreen: React.FC<ScreenProps<"Checkout">> = ({ navigation }) => {
  const { cart, total, clearCart } = useCart();
  const { dark, toggleTheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const placeOrder = () => {
    if (cart.length === 0) return;
    setModalVisible(true);
  };

  const handleGoHome = () => {
    setModalVisible(false);
    clearCart();
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: dark ? "#000" : "#fff" }}
    >
      <View style={styles.container}>

        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{ color: dark ? "#fff" : "#000", fontSize: 16 }}>
            ← Back
          </Text>
        </Pressable>

        <View style={{ alignItems: "flex-end", marginVertical: 10 }}>
          <Switch value={dark} onValueChange={toggleTheme} />
        </View>

        <Text style={[styles.title, { color: dark ? "#fff" : "#000" }]}>
          CHECKOUT
        </Text>

        {cart.map(item => (
          <View key={item.id} style={styles.card}>
            <Text style={{ color: dark ? "#fff" : "#000" }}>{item.name}</Text>
            <Text style={{ color: dark ? "#fff" : "#000" }}>
              ₱{item.price * item.quantity}
            </Text>
          </View>
        ))}

        <Text style={{ fontWeight: "bold", marginTop: 10, color: dark ? "#fff" : "#000" }}>
          Total: ₱{total}
        </Text>

        <Pressable style={[styles.button, { marginTop: 10 }]} onPress={placeOrder}>
          <Text style={styles.buttonText}>Place Order</Text>
        </Pressable>

        <Modal transparent visible={modalVisible} animationType="fade">
          <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)"
          }}>
            <View style={{
              width: "80%",
              padding: 20,
              borderRadius: 10,
              backgroundColor: dark ? "#222" : "#fff",
              alignItems: "center"
            }}>
              <Text style={{ fontSize: 18, marginBottom: 15, color: dark ? "#fff" : "#000" }}>
                Order Placed!
              </Text>
              <Pressable style={styles.button} onPress={handleGoHome}>
                <Text style={styles.buttonText}>Go Back to Home</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

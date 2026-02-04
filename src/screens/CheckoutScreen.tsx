import React, { useState } from "react";
import { View, Text, Pressable, Switch, Modal } from "react-native";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { styles } from "../styles/globalStyles";
import { ScreenProps } from "../navigation/Props";

const CheckoutScreen: React.FC<ScreenProps<"Checkout">> = ({ navigation }) => {
  const { cart, total, clearCart } = useCart();
  const { dark, toggleTheme } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  /** PLACE ORDER HANDLER */
  const placeOrder = () => {
    if (cart.length === 0) return;
    setModalVisible(true); // show the pop-up modal
  };

  /** HANDLE MODAL CONFIRMATION */
  const handleGoHome = () => {
    setModalVisible(false);
    clearCart();
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: dark ? "#000" : "#fff" }]}>

      {/* BACK BUTTON */}
      <Pressable style={{ marginBottom: 10 }} onPress={() => navigation.goBack()}>
        <Text style={{ color: dark ? "#fff" : "#000", fontSize: 16 }}>← Back</Text>
      </Pressable>

      {/* DARK MODE TOGGLE */}
      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 10 }}>
        <Switch value={dark} onValueChange={toggleTheme} />
      </View>

      <Text style={[styles.title, { color: dark ? "#fff" : "#000" }]}>CHECKOUT</Text>

      {cart.length === 0 ? (
        <Text style={{ color: dark ? "#fff" : "#000", marginTop: 20 }}>Your cart is empty.</Text>
      ) : (
        <>
          {cart.map(item => (
            <View key={item.id} style={styles.card}>
              <Text style={{ color: dark ? "#fff" : "#000" }}>{item.name}</Text>
              <Text style={{ color: dark ? "#fff" : "#000" }}>₱{item.price * item.quantity}</Text>
            </View>
          ))}

          <Text style={{ fontWeight: "bold", marginTop: 10, color: dark ? "#fff" : "#000" }}>
            Total: ₱{total}
          </Text>

          {/* PLACE ORDER BUTTON */}
          <Pressable style={[styles.button, { marginTop: 10 }]} onPress={placeOrder}>
            <Text style={styles.buttonText}>Place Order</Text>
          </Pressable>
        </>
      )}

      {/* MODAL POP-UP */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}>
          <View style={{
            width: "80%",
            backgroundColor: dark ? "#222" : "#fff",
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
          }}>
            <Text style={{ fontSize: 18, marginBottom: 15, color: dark ? "#fff" : "#000" }}>
              Order Placed!
            </Text>
            <Text style={{ marginBottom: 20, color: dark ? "#fff" : "#000" }}>
              You have successfully ordered.
            </Text>
            <Pressable
              style={[styles.button, { width: "100%" }]}
              onPress={handleGoHome}
            >
              <Text style={styles.buttonText}>Go Back to Home</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default CheckoutScreen;

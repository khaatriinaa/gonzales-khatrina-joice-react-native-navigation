import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Switch,
  Modal,
  Image,
} from "react-native";
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
    <SafeAreaView style={{ flex: 1, backgroundColor: dark ? "#000" : "#fff" }}>
      <View style={styles.container}>

        {/* BACK */}
        <Pressable onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 18, color: dark ? "#fff" : "#000" }}>
            ← Back
          </Text>
        </Pressable>

        {/* HEADER */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={[styles.title, { color: dark ? "#fff" : "#000" }]}>
            CHECKOUT
          </Text>
          <Switch value={dark} onValueChange={toggleTheme} />
        </View>

        {/* ITEMS */}
        {cart.length === 0 ? (
          <Text style={{ color: dark ? "#fff" : "#000" }}>
            Your cart is empty.
          </Text>
        ) : (
          <>
            {cart.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.card,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                  },
                ]}
              >
                {/* IMAGE */}
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 8,
                    marginRight: 12,
                  }}
                  resizeMode="cover"
                />

                {/* DETAILS */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: dark ? "#fff" : "#000",
                    }}
                  >
                    {item.name}
                  </Text>

                  <Text style={{ color: dark ? "#fff" : "#000" }}>
                    ₱{item.price} × {item.quantity}
                  </Text>

                  <Text style={{ color: dark ? "#fff" : "#000" }}>
                    Subtotal: ₱{item.price * item.quantity}
                  </Text>
                </View>
              </View>
            ))}

            {/* TOTAL */}
            <Text
              style={{
                fontWeight: "bold",
                marginTop: 10,
                color: dark ? "#fff" : "#000",
              }}
            >
              Total: ₱{total}
            </Text>

            {/* PLACE ORDER */}
            <Pressable
              style={[styles.button, { marginTop: 10 }]}
              onPress={placeOrder}
            >
              <Text style={styles.buttonText}>Place Order</Text>
            </Pressable>
          </>
        )}

        {/* SUCCESS MODAL */}
        <Modal transparent visible={modalVisible} animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                width: "80%",
                padding: 20,
                borderRadius: 10,
                backgroundColor: dark ? "#222" : "#fff",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 15,
                  color: dark ? "#fff" : "#000",
                }}
              >
                Order Placed!
              </Text>

              <Text
                style={{
                  marginBottom: 20,
                  color: dark ? "#fff" : "#000",
                }}
              >
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
    </SafeAreaView>
  );
};

export default CheckoutScreen;

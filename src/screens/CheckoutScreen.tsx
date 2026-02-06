import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Switch,
  Modal,
  Image,
  ScrollView,
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
      routes: [
        {
          name: "MainTabs",
          state: {
            index: 0,
            routes: [{ name: "Home" }],
          },
        },
      ],
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark ? "#000" : "#fff" }}>
      <View style={{ flex: 1 }}>
        {/* FIXED HEADER */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            padding: 16,
            borderBottomWidth: 1,
            borderColor: dark ? "#333" : "#ddd",
            backgroundColor: dark ? "#000" : "#fff",
          }}
        >
          {/* Back Button */}
          <Pressable onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 18, color: dark ? "#fff" : "#000" }}>
              ← Back
            </Text>
          </Pressable>

          {/* Header Row: Title + Toggle */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  color: dark ? "#fff" : "#000",
                  lineHeight: 44, // center text vertically
                },
              ]}
            >
              CHECKOUT
            </Text>
            <Switch
              value={dark}
              onValueChange={toggleTheme}
              trackColor={{ false: "#ccc", true: "#555" }}
              thumbColor={dark ? "#fff" : "#000"}
            />
          </View>
        </View>

        {/* SCROLLABLE CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 16,
            paddingTop: 140,   // space for fixed header
            paddingBottom: 140 // space for fixed footer
          }}
        >
          {cart.length === 0 ? (
            <Text style={{ color: dark ? "#fff" : "#000" }}>
              Your cart is empty.
            </Text>
          ) : (
            cart.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.card,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: dark ? "#1a1a1a" : "#f2f2f2",
                    marginBottom: 10,
                  },
                ]}
              >
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
            ))
          )}
        </ScrollView>

        {/* FIXED FOOTER */}
        {cart.length > 0 && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 16,
              borderTopWidth: 1,
              borderColor: dark ? "#333" : "#ddd",
              backgroundColor: dark ? "#000" : "#fff",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 10,
                color: dark ? "#fff" : "#000",
              }}
            >
              Total: ₱{total}
            </Text>

            <Pressable
              style={[
                styles.button,
                { backgroundColor: dark ? "#444" : "#000" },
              ]}
              onPress={placeOrder}
            >
              <Text style={styles.buttonText}>Place Order</Text>
            </Pressable>
          </View>
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
                style={[
                  styles.button,
                  { width: "100%", backgroundColor: dark ? "#444" : "#000" },
                ]}
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

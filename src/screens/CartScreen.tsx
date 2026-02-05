import React from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  Switch,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { styles } from "../styles/globalStyles";
import { ScreenProps } from "../navigation/Props";

const CartScreen: React.FC<ScreenProps<"Cart">> = ({ navigation }) => {
  const { cart, increase, decrease, total } = useCart();
  const { dark, toggleTheme } = useTheme();

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
            SHOPPING BAG
          </Text>
          <Switch value={dark} onValueChange={toggleTheme} />
        </View>

        {/* CONTENT */}
        {cart.length === 0 ? (
          <Text style={{ color: dark ? "#fff" : "#000" }}>
            Your cart is empty.
          </Text>
        ) : (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View
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
                      width: 80,
                      height: 80,
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
                      ₱{item.price * item.quantity}
                    </Text>

                    {/* QUANTITY */}
                    <View style={{ flexDirection: "row", marginTop: 8 }}>
                      <Pressable onPress={() => decrease(item.id)}>
                        <Text style={{ fontSize: 18 }}>➖</Text>
                      </Pressable>

                      <Text
                        style={{
                          marginHorizontal: 15,
                          color: dark ? "#fff" : "#000",
                        }}
                      >
                        {item.quantity}
                      </Text>

                      <Pressable onPress={() => increase(item.id)}>
                        <Text style={{ fontSize: 18 }}>➕</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              )}
            />

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

            {/* CHECKOUT */}
            <Pressable
              style={[styles.button, { marginTop: 10 }]}
              onPress={() => navigation.navigate("Checkout")}
            >
              <Text style={styles.buttonText}>Checkout</Text>
            </Pressable>
          </>
        )}

      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

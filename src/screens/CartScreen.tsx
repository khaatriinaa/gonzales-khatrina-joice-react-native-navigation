import React, { useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  Switch,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { styles } from "../styles/globalStyles";
import { ScreenProps } from "../navigation/Props";

// Memoized Cart Item
const CartItem = React.memo(({ item, increase, decrease, dark }: any) => {
  const handleDecrease = () => {
    if (item.quantity === 1) {
      Alert.alert(
        "Remove Item",
        `Are you sure you want to remove "${item.name}" from your cart?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => decrease(item.id),
          },
        ],
        { cancelable: true }
      );
    } else {
      decrease(item.id);
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: dark ? "#1a1a1a" : "#f2f2f2",
        },
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 80, height: 80, borderRadius: 8, marginRight: 12 }}
        resizeMode="cover"
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", color: dark ? "#fff" : "#000" }}>
          {item.name}
        </Text>
        <Text style={{ color: dark ? "#fff" : "#000" }}>
          ₱{item.price * item.quantity}
        </Text>

        <View style={{ flexDirection: "row", marginTop: 8 }}>
          <Pressable onPress={handleDecrease}>
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
    </View>
  );
});

const CartScreen: React.FC<ScreenProps<"Cart">> = ({ navigation }) => {
  const { cart, increase, decrease, total } = useCart();
  const { dark, toggleTheme } = useTheme();

  // Memoize total calculation to prevent re-render
  const totalAmount = useMemo(() => total, [total]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark ? "#000" : "#fff" }}>
      <View style={styles.container}>

        {/* BACK BUTTON */}
        <Pressable onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 18, color: dark ? "#fff" : "#000" }}>← Back</Text>
        </Pressable>

        {/* HEADER */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <Text style={[styles.title, { color: dark ? "#fff" : "#000" }]}>
            SHOPPING BAG
          </Text>
          <Switch
            value={dark}
            onValueChange={toggleTheme}
            trackColor={{ false: "#ccc", true: "#555" }}
            thumbColor={dark ? "#fff" : "#000"}
          />
        </View>

        {cart.length === 0 ? (
          <Text style={{ color: dark ? "#fff" : "#000" }}>Your cart is empty.</Text>
        ) : (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CartItem item={item} increase={increase} decrease={decrease} dark={dark} />
              )}
            />

            <Text style={{ fontWeight: "bold", marginTop: 10, color: dark ? "#fff" : "#000" }}>
              Total: ₱{totalAmount}
            </Text>

            <Pressable
              style={[styles.button, { marginTop: 10, backgroundColor: dark ? "#444" : "#000" }]}
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
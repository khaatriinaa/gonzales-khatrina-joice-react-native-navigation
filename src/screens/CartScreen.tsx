import React, { useMemo } from "react";
import { View, Text, FlatList, Pressable, Image, Alert, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { styles } from "../styles/globalStyles";
import { ScreenProps } from "../navigation/Props";
import Icon from "react-native-vector-icons/Ionicons";

const CartScreen: React.FC<ScreenProps<"Cart">> = ({ navigation }) => {
  const { cart, increase, decrease, total } = useCart();
  const { dark, toggleTheme } = useTheme();
  const totalAmount = useMemo(() => total, [total]);

  const handleDecrease = (item: any) => {
    if (item.quantity === 1) {
      Alert.alert(
        "Remove Item",
        `Remove "${item.name}" from cart?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Remove", style: "destructive", onPress: () => decrease(item.id) },
        ]
      );
    } else {
      decrease(item.id);
    }
  };

  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.card,
        { flexDirection: "row", alignItems: "center", backgroundColor: dark ? "#1a1a1a" : "#f2f2f2", marginBottom: 10 },
      ]}
    >
      <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 8, marginRight: 12 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", color: dark ? "#fff" : "#000" }}>{item.name}</Text>
        <Text style={{ color: dark ? "#fff" : "#000" }}>₱{item.price * item.quantity}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
          <Pressable onPress={() => handleDecrease(item)}>
            <Icon name="remove-circle-outline" size={24} color={dark ? "#aaa" : "#666"} />
          </Pressable>
          <Text style={{ width: 40, textAlign: "center", fontSize: 16, color: dark ? "#fff" : "#000", marginHorizontal: 3 }}>
            {item.quantity}
          </Text>
          <Pressable onPress={() => increase(item.id)}>
            <Icon name="add-circle-outline" size={24} color={dark ? "#aaa" : "#666"} />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark ? "#000" : "#fff" }}>
      {/* TOP SPACE WITH BACK, TITLE, TOGGLE */}
      <View
  style={{
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: dark ? "#333" : "#ddd",
  }}
>
  {/* Back Button on the left */}
  <Pressable onPress={() => navigation.goBack()} style={{ zIndex: 1 }}>
    <Icon name="chevron-back-outline" size={28} color={dark ? "#fff" : "#000"} />
  </Pressable>

  {/* Title centered */}
  <Text
    style={{
      flex: 1,
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      color: dark ? "#fff" : "#000",
    }}
  >
    SHOPPING BAG {/* Or CHECKOUT */}
  </Text>

  {/* Toggle Switch on the right */}
  <Switch
    value={dark}
    onValueChange={toggleTheme}
    trackColor={{ false: "#ccc", true: "#555" }}
    thumbColor={dark ? "#fff" : "#000"}
  />
</View>


      {/* CONTENT */}
      {cart.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 18, color: dark ? "#aaa" : "#666", marginBottom: 10 }}>Your cart is empty.</Text>
          <Pressable onPress={() => navigation.navigate("Home")} style={{ padding: 12, backgroundColor: dark ? "#444" : "#000", borderRadius: 8 }}>
            <Text style={{ color: "#fff", textAlign: "center" }}>Browse Items</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

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
          <Text style={{ fontWeight: "bold", marginBottom: 10, color: dark ? "#fff" : "#000" }}>Total: ₱{totalAmount}</Text>
          <Pressable onPress={() => navigation.navigate("Checkout")} style={{ padding: 12, backgroundColor: dark ? "#444" : "#000", borderRadius: 8 }}>
            <Text style={{ color: "#fff", textAlign: "center" }}>Checkout</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

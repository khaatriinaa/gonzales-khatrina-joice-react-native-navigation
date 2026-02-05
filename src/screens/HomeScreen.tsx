import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenProps } from "../navigation/Props";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { styles } from "../styles/globalStyles";

const PRODUCTS = [
  { id: 1, name: "Brooklyn Graphic Tee", price: 499 },
  { id: 2, name: "Winner Oversized Shirt", price: 729 },
  { id: 3, name: "Minimal Cotton Top", price: 599 },
];

const HomeScreen: React.FC<ScreenProps<"Home">> = ({ navigation }) => {
  const { addToCart } = useCart();
  const { dark, toggleTheme } = useTheme();

  const handleAddToCart = (item: any) => {
    addToCart(item);
    Alert.alert("Added to Cart 🛒", `${item.name} has been added to your cart.`);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: dark ? "#000" : "#fff" }}
    >
      <View style={styles.container}>

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
            HOME
          </Text>
          <Switch value={dark} onValueChange={toggleTheme} />
        </View>

        {/* PRODUCT LIST */}
        <FlatList
          data={PRODUCTS}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {item.name}
              </Text>
              <Text style={{ marginVertical: 6 }}>
                ₱{item.price}
              </Text>
              <Pressable
                style={styles.button}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </Pressable>
            </View>
          )}
        />

        <Pressable
          style={[styles.button, { marginTop: 10 }]}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.buttonText}>Go to Cart</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

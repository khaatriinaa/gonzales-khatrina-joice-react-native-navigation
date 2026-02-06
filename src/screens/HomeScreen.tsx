import React, { useState } from "react";
import { View, Text, FlatList, Pressable, Switch, Alert, Image, TextInput, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenProps } from "../navigation/Props";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { styles } from "../styles/globalStyles";
import { PRODUCTS } from "../data/products"; 

const HomeScreen: React.FC<ScreenProps<"Home">> = ({ navigation }) => {
  const { cart, addToCart } = useCart();
  const { dark, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");

  const filteredProducts = PRODUCTS.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (item: any) => {
    const cartItem = cart.find(c => c.id === item.id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    if (quantityInCart >= item.stock) {
      Alert.alert("Out of Stock", "No more items available.");
      return;
    }

    addToCart(item);
    Alert.alert("Added to Cart 🛒", item.name);
  };

  const goToDetails = (item: any) => {
    navigation.navigate("ProductDetails", { product: item });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark ? "#000" : "#fff" }}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
          <Text style={[styles.title, { color: dark ? "#fff" : "#000" }]}>
            HOME
          </Text>
          <Switch
            value={dark}
            onValueChange={toggleTheme}
            trackColor={{ false: "#ccc", true: "#555" }}
            thumbColor={dark ? "#fff" : "#000"}
          />
        </View>

        {/* SEARCH BAR */}
        <TextInput
          placeholder="Search items..."
          placeholderTextColor={dark ? "#aaa" : "#666"}
          value={search}
          onChangeText={setSearch}
          style={{
            borderWidth: 1,
            borderColor: dark ? "#555" : "#ccc",
            borderRadius: 8,
            padding: 10,
            marginBottom: 15,
            color: dark ? "#fff" : "#000",
            backgroundColor: dark ? "#222" : "#fff",
          }}
        />

        {/* PRODUCTS GRID */}
        <FlatList
          data={filteredProducts}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const cartItem = cart.find(c => c.id === item.id);
            const quantityInCart = cartItem ? cartItem.quantity : 0;
            const remainingStock = item.stock - quantityInCart;

            return (
              <View
                style={[
                  styles.card,
                  { width: "48%", backgroundColor: dark ? "#1a1a1a" : "#f2f2f2" },
                ]}
              >
                <Pressable onPress={() => goToDetails(item)}>
                  <Image source={{ uri: item.image }} style={{ width: "100%", height: 120, borderRadius: 8 }} />
                </Pressable>

                <Text style={{ fontWeight: "bold", marginTop: 8, color: dark ? "#fff" : "#000" }}>
                  {item.name}
                </Text>

                <Text style={{ color: dark ? "#fff" : "#000" }}>
                  ₱{item.price}
                </Text>

                <Pressable
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        remainingStock === 0 ? "#999" : dark ? "#444" : "#000",
                    },
                  ]}
                  onPress={() => handleAddToCart(item)}
                  disabled={remainingStock === 0}
                >
                  <Text style={styles.buttonText}>
                    {remainingStock === 0
                      ? "Out of Stock"
                      : quantityInCart > 0
                      ? `Add to Cart (${quantityInCart})`
                      : "Add to Cart"}
                  </Text>
                </Pressable>
              </View>
            );
          }}
        />

        {/* CART BUTTON */}
        <Pressable
          style={[
            styles.button,
            { marginTop: 10, backgroundColor: dark ? "#444" : "#000" },
          ]}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.buttonText}>Go to Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

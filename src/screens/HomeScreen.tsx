import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Switch,
  Alert,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenProps } from "../navigation/Props";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { styles } from "../styles/globalStyles";

const PRODUCTS = [
  { id: 1, name: "Brooklyn Graphic Tee", price: 499, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT1UgCXuX_dA-PqgUdl0k6bf_bz0kVAplEsmlTIGEUb_JggyHdT3uifz_46fxkVN3REuQGaxyFDca7Z-B_w5jSWxmWPVE93Wg" },
  { id: 2, name: "Winner Oversized Shirt", price: 729, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT71a2O9-zd8bNUnuAv8-KAal-Ul7La8B9AGuulvJVJgcNhoUaXBDh0P9XpgQZirHe8pThCoUnBr77b6ssPt49VUVrh6eoTrTAA_OvYB98maEvV8jsdA-aWXg" },
  { id: 3, name: "Minimal Cotton Top", price: 599, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSRmwSOhMQ1sfjsEFIvJ9_bnvpnvMDPTD6pCRJiiP3tNXvXfY03-DO1R_AJrUygNO5E_10fmgtts1pS5jOnaKsUWzVV9LoA9qSXsY2E7VXOZMSn_0Kndf9Y" },
];

const HomeScreen: React.FC<ScreenProps<"Home">> = ({ navigation }) => {
  const { addToCart } = useCart();
  const { dark, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");

  const filteredProducts = PRODUCTS.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (item: any) => {
    addToCart(item);
    Alert.alert("Added to Cart 🛒", item.name);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark ? "#000" : "#fff" }}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
          <Text style={[styles.title, { color: dark ? "#fff" : "#000" }]}>HOME</Text>
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
          ListEmptyComponent={<Text style={{ color: dark ? "#fff" : "#000" }}>No items found.</Text>}
          renderItem={({ item }) => (
            <View style={[styles.card, { width: "48%", backgroundColor: dark ? "#1a1a1a" : "#f2f2f2" }]}>
              <Image source={{ uri: item.image }} style={{ width: "100%", height: 120, borderRadius: 8 }} />
              <Text style={{ fontWeight: "bold", marginTop: 8, color: dark ? "#fff" : "#000" }}>{item.name}</Text>
              <Text style={{ color: dark ? "#fff" : "#000" }}>₱{item.price}</Text>
              <Pressable
                style={[styles.button, { backgroundColor: dark ? "#444" : "#000" }]}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </Pressable>
            </View>
          )}
        />

        {/* CART BUTTON */}
        <Pressable
          style={[styles.button, { marginTop: 10, backgroundColor: dark ? "#444" : "#000" }]}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.buttonText}>Go to Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

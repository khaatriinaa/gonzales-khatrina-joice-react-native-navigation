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
  {
    id: 1,
    name: "Brooklyn Graphic Tee",
    price: 499,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT1UgCXuX_dA-PqgUdl0k6bf_bz0kVAplEsmlTIGEUb_JggyHdT3uifz_46fxkVN3REuQGaxyFDca7Z-B_w5jSWxmWPVE93Wg",
  },
  {
    id: 2,
    name: "Winner Oversized Shirt",
    price: 729,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT71a2O9-zd8bNUnuAv8-KAal-Ul7La8B9AGuulvJVJgcNhoUaXBDh0P9XpgQZirHe8pThCoUnBr77b6ssPt49VUVrh6eoTrTAA_OvYB98maEvV8jsdA-aWXg",
  },
  {
    id: 3,
    name: "Minimal Cotton Top",
    price: 599,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSRmwSOhMQ1sfjsEFIvJ9_bnvpnvMDPTD6pCRJiiP3tNXvXfY03-DO1R_AJrUygNO5E_10fmgtts1pS5jOnaKsUWzVV9LoA9qSXsY2E7VXOZMSn_0Kndf9Y",
  },
  {
  id: 4,
  name: "Classic White Tee",
  price: 399,
  image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTE5ysQboNuXxtPPryF4o_6nZCweuZNwdto64-5EFAWrKPlB8bWzVBLUvuR15dWOHslnmnLcfBCpGf1XTEWgMWQBsKKhGDhr8wRcUWAbwvo0ewykM5ziaJkqQ",
},
{
  id: 5,
  name: "Urban Black Shirt",
  price: 549,
  image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRtEbBpBQajpBVM8LrBHwZqe_N_ExW8xcZdTLfkRlM_hyFq2P7bgV-mgYwoWKKumDnGcL2Q8nGVm14hUQfqObqq6scEJqMXfm30vh80yVVyJVcwVBskaSSV",
},
{
  id: 6,
  name: "Oversized Beige Tee",
  price: 679,
  image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQSyiS9RYnb9pnx__J4KlaoyIKpCifmhIN9INFS79f79-qTqxzPa-8Vj1UHZpbxxqPhkXZqOpC1fFnzWwtB7og3jCgDfRBiL3cxcKG5eMkhfOYABYgYEqg-ln4",
},
{
  id: 7,
  name: "Streetwear Graphic Tee",
  price: 799,
  image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRNVMuik4h4526ZAxRH7EivSkClaCFvGQhjiNrYM0cFO0nXupdaOB-NjfZnQS_gQX3Gj96ORfr3DC4lG5H9OmqONfCMkks34Upgw1R-IeoTTccoQEroU-8yFqsR",
},
{
  id: 8,
  name: "Vintage Desk Lamp",
  price: 699,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYx_Ss3YcRjPBlFJO1dfoYrxC9DyH1LxmTSg&s",
},
{
  id: 9,
  name: "Minimalist Wall Clock",
  price: 459,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSYph5Rc0yVgzoRd-StGQdDV7XCQ_SUISdsQ&s",
},
{
  id: 10,
  name: "Relaxed Cotton Throw Pillow",
  price: 529,
  image: "https://cb.scene7.com/is/image/Crate/RelaxWshCtVlv20inMoonPlwVNS26?$web_pdp_main_carousel_med$",
},
{
  id: 11,
  name: "Goojodoq Mini Fan",
  price: 749,
  image: "https://down-ph.img.susercontent.com/file/cn-11134207-820l4-mhpysgsy6m8085",
},
{
  id: 12,
  name: "iClever Wireless Bluetooth Mouse",
  price: 689,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPm_OTtRPKePMDyowpfghTc_M6byP4miPFjA&s",
},
{
  id: 13,
  name: "Earth Tone Ceramic Mug",
  price: 599,
  image: "https://static1.squarespace.com/static/5f3732ae06f04f5803ed1e7d/5f39db45e734c879bccc113f/6619abe5420b87505f01795c/1765580055859/DSCF0457.jpg?format=1500w",
},
{
  id: 14,
  name: "Aztrid Mini Hobo Bag",
  price: 629,
  image: "https://aztrid.com.ph/cdn/shop/collections/image.jpg?v=1711073407",
},
{
  id: 15,
  name: "Aquaflask Water Bottle",
  price: 499,
  image: "https://aquaflask.com/wp-content/uploads/2025/03/Support-KVMain-KV-001-1x1-1.jpg",
},
{
  id: 16,
  name: "Premium Wireless Speaker",
  price: 899,
  image: "https://images.philips.com/is/image/philipsconsumer/eba76e5f4b4043f18b0cb0cc00817c74?wid=700&hei=700&$pnglarge$",
},
{
  id: 17,
  name: "BELO Tinted Sunscreen",
  price: 769,
  image: "https://down-ph.img.susercontent.com/file/ph-11134207-7rasb-m40a1862h4hl7f",
},
{
  id: 18,
  name: "Borussia Dortmund Digital Watch",
  price: 659,
  image: "https://s.alicdn.com/@sc04/kf/Hce8660ee11624fbea3bd6e3062cfa6e6u/New-Watches-C3-12-Football-Wrist-Watches-LED-Digital-for-Child-Sports-Watch-Electronic-Clock-Hodinky-Reloj-Hombre.png_300x300.jpg",
},
{
  id: 19,
  name: "Orashare Powerbank 20000 mAh",
  price: 579,
  image: "https://ph-test-11.slatic.net/p/1448a5aa29d8c81c16422e1514f421f9.jpg",
},
{
  id: 20,
  name: "Pattern Iphone Phone Case",
  price: 150,
  image: "https://img.kwcdn.com/product/open/2023-06-20/1687275695277-1ced512503714feea1f7cabc491ce0b2-goods.jpeg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp",
},

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
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
          ListEmptyComponent={
            <Text style={{ color: dark ? "#fff" : "#000" }}>No items found.</Text>
          }
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                { width: "48%", backgroundColor: dark ? "#1a1a1a" : "#f2f2f2" },
              ]}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: "100%", height: 120, borderRadius: 8 }}
              />
              <Text
                style={{ fontWeight: "bold", marginTop: 8, color: dark ? "#fff" : "#000" }}
              >
                {item.name}
              </Text>
              <Text style={{ color: dark ? "#fff" : "#000" }}>₱{item.price}</Text>
              <Pressable
                style={[
                  styles.button,
                  { backgroundColor: dark ? "#444" : "#000" },
                ]}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </Pressable>
            </View>
          )}
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

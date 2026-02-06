import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
  ProductDetails: { product: Product };
};

export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

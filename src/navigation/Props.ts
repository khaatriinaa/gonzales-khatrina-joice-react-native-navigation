import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

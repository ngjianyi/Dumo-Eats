import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "@/app";
import { TabParamList } from "./TabNavigation";
import { CompositeScreenProps } from "@react-navigation/native";
type PropsLogin = NativeStackScreenProps<
  RootStackParamList,
  "login",
  "Stack"
>;
type PropsSignup = NativeStackScreenProps<
  RootStackParamList,
  "signup",
  "Stack"
>;
type Propsforget = NativeStackScreenProps<
  RootStackParamList,
  "forget",
  "Stack"
>;
type Propsmain = NativeStackScreenProps<RootStackParamList, "main", "Stack">;

type Propsprofile = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Profile">,
  NativeStackScreenProps<RootStackParamList, "main">
>;

export { PropsLogin, PropsSignup, Propsforget, Propsmain, Propsprofile };

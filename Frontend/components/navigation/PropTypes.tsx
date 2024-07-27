import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "@/app";
import { TabParamList } from "./TabNavigation";
import { CompositeScreenProps } from "@react-navigation/native";
type PropsLogin = NativeStackScreenProps<
  RootStackParamList,
  "login",
  "MyStack"
>;
type PropsSignup = NativeStackScreenProps<
  RootStackParamList,
  "signup",
  "MyStack"
>;
type Propsforget = NativeStackScreenProps<
  RootStackParamList,
  "forget",
  "MyStack"
>;
type Propsmain = NativeStackScreenProps<RootStackParamList, "main", "MyStack">;

type Propsprofile = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Profile">,
  NativeStackScreenProps<RootStackParamList, "main">
>;
export { PropsLogin, PropsSignup, Propsforget, Propsmain, Propsprofile };

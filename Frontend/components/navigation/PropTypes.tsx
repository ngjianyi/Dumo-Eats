import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app';
type PropsLogin = NativeStackScreenProps<RootStackParamList, 'login', 'MyStack'>;
type PropsSignup = NativeStackScreenProps<RootStackParamList, 'signup', 'MyStack'>;
type Propsforget = NativeStackScreenProps<RootStackParamList, 'forget', 'MyStack'>;
type Propsmain = NativeStackScreenProps<RootStackParamList, 'main', 'MyStack'>;
export {PropsLogin, PropsSignup, Propsforget, Propsmain }
import React, {useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/screens/Authentication/LoginScreen";
import SignupScreen from "@/screens/Authentication/SignupScreen";
import ForgotScreen from "@/screens/Authentication/ForgotPWScreen";
import TabNavigation from "@/components/navigation/TabNavigation";
import UserLoggedInContext from "@/contexts/UserLoggedIn";


export type RootStackParamList = {
  signup: undefined;
  login: undefined
  forget: undefined
  main: undefined
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Index() {
  const [UserLoggedIn, setUser] = useState(false)
  return (
    <UserLoggedInContext.Provider value={{UserLoggedIn, setUser}}>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="signup"
          component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="forget"
          component={ForgotScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="main"
          component={TabNavigation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </UserLoggedInContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

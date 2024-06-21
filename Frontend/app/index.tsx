import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/screens/LoginScreen";
import SignupScreen from "@/screens/SignupScreen";
import ForgotScreen from "@/screens/ForgotPWScreen";
import TabNavigation from "@/components/navigation/TabNavigation";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    // NOTE TO TO CHANGE BACK TO LOGIN AFTER TESTING
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

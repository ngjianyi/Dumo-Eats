import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "@/screens/LoginScreen";
import SignupScreen from "@/screens/SignupScreen";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen 
          name="signup" 
          component={SignupScreen}
          options={{
            headerShown:false
          }} 
        />
        <Stack.Screen 
          name="login" 
          component={LoginScreen} 
          options={{
            headerShown:false
          }}
        />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
})

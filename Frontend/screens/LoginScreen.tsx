import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
// import axios, { AxiosError } from "axios";

const logoImg = require("@/assets/images/logo.png");

export default function LoginScreen({ navigation }: any) {
  const signupHandler = () => navigation.navigate("signup");
  const forgetHandler = () => navigation.navigate("forget");
  const [visible, setVisibility] = useState(false);
  const pressHandler = () => setVisibility(!visible);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    // const response = await fetch("http://127.0.0.1:8000/auth/login/", {
    const response = await fetch("https://dumo-eats.onrender.com/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      SecureStore.setItemAsync("refresh", data["refresh"]);
      AsyncStorage.setItem("access", data["access"]);
      navigation.navigate("main");
    } else {
      const error = await response.json();
      console.error(error);
    }
    setUsername("");
    setPassword("");
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.headerText}>
            <Text style={styles.subHeaderTextHello}>Hello! </Text>
            <Text style={styles.subHeaderText}>Welcome back to DumoEats!</Text>
          </View>
        </View>
        <View style={styles.details}>
          <TextInput
            style={styles.input}
            placeholderTextColor={"grey"}
            placeholder=" Username"
            value={username}
            onChangeText={(val) => {
              setUsername(val);
            }}
            autoCapitalize="none"
          />
          <View style={{ justifyContent: "center" }}>
            <TextInput
              style={styles.input}
              placeholderTextColor={"grey"}
              placeholder=" Password"
              secureTextEntry={!visible}
              value={password}
              onChangeText={(val) => {
                setPassword(val);
              }}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.visible} onPress={pressHandler}>
              {visible ? (
                <Ionicons name="eye" size={22} color="black" />
              ) : (
                <Ionicons name="eye-off" size={22} color="black" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={forgetHandler}>
            <Text style={{ textAlign: "right", color: "dodgerblue" }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.login}>Log In</Text>
        </TouchableOpacity>
        <View>
          <Text style={{ textAlign: "center" }}>
            Don't have an account yet?
          </Text>
          <TouchableOpacity style={styles.signupButton} onPress={signupHandler}>
            <Text style={styles.signUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    marginTop: 50,
    alignItems: "center",
  },

  headerText: {
    // fontSize: 35,
    // fontWeight: "bold",
    // color: "darkgreen",
    flexDirection: "row",
  },

  subHeaderTextHello: {
    fontWeight: "bold",
    marginVertical: 10,
    color: "darkgreen",
  },

  subHeaderText: {
    fontWeight: "bold",
    marginVertical: 10,
  },

  details: {
    margin: 5,
    padding: 35,
  },

  input: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "lavender",
    borderRadius: 5,
  },

  visible: {
    position: "absolute",
    right: 12,
  },

  loginButton: {
    backgroundColor: "springgreen",
    marginTop: 40,
    marginBottom: 30,
    marginHorizontal: 30,
    borderRadius: 20,
    padding: 5,
  },

  login: {
    textAlign: "center",
    fontSize: 18,
    padding: 5,
    color: "black",
  },

  signupButton: {
    backgroundColor: "maroon",
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 30,
    borderRadius: 20,
    padding: 5,
  },

  signUp: {
    textAlign: "center",
    fontSize: 18,
    padding: 5,
    color: "white",
  },

  logo: {
    height: 50,
    width: 220,
  },
});

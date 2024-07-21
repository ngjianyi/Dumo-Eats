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
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import { AUTH } from "@/firebaseCONFIG";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import UserLoggedInContext from "@/contexts/UserLoggedIn";
import { PropsLogin } from "@/components/navigation/PropTypes";
const logoImg = require("@/assets/images/logo.png");

export default function LoginScreen({ navigation }: PropsLogin) {
  const userLoggedInContext = useContext(UserLoggedInContext);
  const signupHandler = () => navigation.navigate("signup");
  const forgetHandler = () => navigation.navigate("forget");
  const [visible, setVisibility] = useState(false);
  const pressHandler = () => setVisibility(!visible);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = AUTH;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (!auth.currentUser?.emailVerified) {
        AUTH.signOut();
        alert("Email not verified");
      } else {
        userLoggedInContext?.setUser(!userLoggedInContext?.UserLoggedIn);
      }
    } catch (error: any) {
      console.log(error);
      alert("log in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  //observer that listens for changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTH, (user) => {
      if (user && userLoggedInContext?.UserLoggedIn) {
        navigation.navigate("main");
      } else if (user == null) {
      }
    });
    return () => {
      unsubscribe;
    };
  }, [userLoggedInContext?.UserLoggedIn]);

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
            placeholder=" Email"
            value={email}
            onChangeText={(val) => {
              setEmail(val);
            }}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            aria-label="Email"
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
              autoCorrect={false}
              autoComplete="off"
              aria-label="Password"
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
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleSubmit}
          aria-label="loginButton"
          >
          <Text style={styles.login}>Log In</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color="deepskyblue" />
        ) : (
          true
        )}
        <View>
          <Text style={{ textAlign: "center" }}>
            Don't have an account yet?
          </Text>
          <TouchableOpacity 
            style={styles.signupButton} 
            onPress={signupHandler}
            aria-label="signupButton"
            >
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

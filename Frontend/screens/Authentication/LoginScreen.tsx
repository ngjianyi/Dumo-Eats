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
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AUTH } from "@/firebaseCONFIG";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import UserLoggedInContext from "@/contexts/UserLoggedIn";
import { PropsLogin } from "@/components/navigation/PropTypes";
import { UserLoggedInInterface } from "@/contexts/UserLoggedIn";
import { COLORS, SIZES } from "@/constants/Theme";

const logoImg = require("@/assets/images/logo.png");

export default function LoginScreen({ navigation }: PropsLogin) {
  const userLoggedInContext: UserLoggedInInterface | undefined =
    useContext(UserLoggedInContext);
  const signupHandler = () => navigation.navigate("signup");
  const forgetHandler = () => navigation.navigate("forget");
  const [visible, setVisibility] = useState<boolean>(false);
  const pressHandler = () => setVisibility(!visible);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const auth = AUTH;

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert("", "Please enter an email");
      return;
    } else if (!password) {
      Alert.alert("", "Please enter a password");
      return;
    }
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (!auth.currentUser?.emailVerified) {
        AUTH.signOut();
        alert("Email not verified");
      } else {
        userLoggedInContext?.setUser(!userLoggedInContext?.UserLoggedIn);
        setEmail("");
        setPassword("");
        Keyboard.dismiss();
      }
    } catch (error: any) {
      const errorCode = error.code;
      // if (errorCode == "auth/invalid-email") {
      //   alert("Invalid email provided");
      // } else if (errorCode == "auth/invalid-credential") {
      //   alert("Invalid credentials provided");
      // } else if (errorCode == "auth/missing-password") {
      //   alert("Please enter password");
      // } else {
      //   alert("Login failed, invalid credentials");
      // }
      if (
        errorCode == "auth/invalid-email" ||
        errorCode == "auth/invalid-password" ||
        errorCode == "auth/invalid-credential"
      ) {
        Alert.alert("", "Invalid email / password");
      }
    } finally {
      setLoading(false);
    }
  };

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
          {/* <View style={styles.headerText}>
            <Text style={styles.subHeaderTextHello}>Hello! </Text>
            <Text style={styles.subHeaderText}>Welcome back to DumoEats!</Text>
          </View> */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
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
                <Ionicons name="eye" size={22} color={COLORS.gray} />
              ) : (
                <Ionicons name="eye-off" size={22} color={COLORS.gray} />
              )}
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity onPress={forgetHandler}>
            <Text style={{ textAlign: "right", color: "dodgerblue" }}>
              Forgot password?
            </Text>
          </TouchableOpacity> */}
          <View style={styles.forgetPasswordContainer}>
            <TouchableOpacity onPress={forgetHandler}>
              <Text style={styles.blueText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit}
          aria-label="loginButton"
        >
          <Text style={styles.login}>Sign In</Text>
        </TouchableOpacity> */}
        {!loading ? (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit}
            aria-label="loginButton"
          >
            <Text style={styles.login}>Sign In</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size="large" />
        )}
        {/* {loading ? (
          <ActivityIndicator size="large" color="deepskyblue" />
        ) : (
          true
        )} */}
        <View style={styles.noAccountContainer}>
          {/* <View>
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
          </View> */}
          <Text style={styles.defaultText}>Don't have an account?</Text>
          <TouchableOpacity onPress={signupHandler} aria-label="signupButton">
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    backgroundColor: COLORS.lightWhite,
  },

  header: {
    marginTop: 50,
    alignItems: "center",
  },

  // headerText: {
  //   flexDirection: "row",
  // },

  // subHeaderTextHello: {
  //   fontWeight: "bold",
  //   marginVertical: 10,
  //   color: "darkgreen",
  // },

  // subHeaderText: {
  //   fontWeight: "bold",
  //   marginVertical: 10,
  // },

  details: {
    // margin: 5,
    // padding: 35,
    margin: SIZES.xxLarge,
  },

  input: {
    // padding: 10,
    // marginVertical: 10,
    // backgroundColor: "lavender",
    // borderRadius: 5,
    // backgroundColor: COLORS.gray2,
    borderWidth: SIZES.xSmall / 8,
    borderColor: COLORS.gray,
    marginVertical: SIZES.small,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall / 2,
  },

  visible: {
    position: "absolute",
    // right: 12,
    right: SIZES.xSmall,
  },

  loginButton: {
    // backgroundColor: "springgreen",
    backgroundColor: COLORS.tertiary,
    // marginTop: 40,
    // marginBottom: 30,
    // marginHorizontal: 30,
    marginHorizontal: SIZES.xxLarge,
    borderRadius: SIZES.xSmall * 2,
    // marginHorizontal: SIZES.xxLarge * 2,
    // padding: 5,
    padding: SIZES.xSmall / 2,
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

  forgetPasswordContainer: {
    alignItems: "flex-end",
  },
  noAccountContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
  },
  welcomeContainer: {
    margin: SIZES.xSmall,
  },
  welcomeText: {
    fontSize: SIZES.xLarge,
    fontWeight: "700",
    color: "black",
    marginVertical: SIZES.xSmall / 4,
  },
  defaultText: {
    fontSize: SIZES.medium,
    color: "black",
    marginVertical: SIZES.xSmall / 4,
  },
  blueText: {
    // textAlign: "center",
    // fontSize: 18,
    // padding: 5,
    // color: "white",
    fontSize: SIZES.medium,
    color: COLORS.blue,
    marginVertical: SIZES.xSmall / 4,
  },
  signupText: {
    fontSize: SIZES.medium,
    color: COLORS.blue,
    marginLeft: SIZES.xSmall / 2,
    marginVertical: SIZES.xSmall / 4,
  },

  logo: {
    height: 50,
    width: 220,
  },
});

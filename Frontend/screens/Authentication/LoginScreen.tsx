import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
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
        Alert.alert("", "Email is not verified");
      } else {
        userLoggedInContext?.setUser(!userLoggedInContext?.UserLoggedIn);
        setEmail("");
        setPassword("");
        Keyboard.dismiss();
      }
    } catch (error: any) {
      const errorCode = error.code;
      if (
        errorCode == "auth/invalid-email" ||
        errorCode == "auth/invalid-password" ||
        errorCode == "auth/invalid-credential"
      ) {
        Alert.alert("", "Invalid email / password");
      } else {
        Alert.alert("", "Something went wrong");
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

          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Welcome back!</Text>
          </View>
        </View>

        <View style={styles.details}>
          <TextInput
            style={styles.input}
            placeholderTextColor={COLORS.gray}
            placeholder="Email"
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
              placeholderTextColor={COLORS.gray}
              placeholder="Password"
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

            <TouchableHighlight
              style={styles.visible}
              onPress={pressHandler}
              underlayColor={COLORS.lightWhite}
            >
              <Ionicons
                name={visible ? "eye" : "eye-off"}
                size={22}
                color={COLORS.gray}
              />
            </TouchableHighlight>
          </View>

          <View style={styles.forgetPasswordContainer}>
            <TouchableOpacity onPress={forgetHandler}>
              <Text style={styles.blueText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {!loading ? (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit}
            aria-label="loginButton"
          >
            <Text style={styles.login}>Log In</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size="large" />
        )}

        <View style={styles.noAccountContainer}>
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
    backgroundColor: COLORS.lightWhite,
  },

  header: {
    marginTop: 50,
    alignItems: "center",
  },

  details: {
    margin: SIZES.xxLarge,
  },

  input: {
    borderWidth: SIZES.xSmall / 8,
    borderColor: COLORS.gray,
    marginVertical: SIZES.small,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall / 2,
  },

  visible: {
    position: "absolute",
    right: SIZES.xSmall,
    backgroundColor: COLORS.lightWhite,
    paddingLeft: SIZES.xSmall / 2,
  },

  loginButton: {
    backgroundColor: COLORS.tertiary,
    marginHorizontal: SIZES.xxLarge,
    borderRadius: SIZES.xSmall * 2,
    padding: SIZES.xSmall / 4,
  },

  login: {
    textAlign: "center",
    fontSize: SIZES.large,
    padding: SIZES.xSmall / 2,
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
  headerContainer: {
    margin: SIZES.xSmall,
  },
  headerText: {
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

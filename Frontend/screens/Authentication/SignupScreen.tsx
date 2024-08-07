import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { PropsSignup } from "@/components/navigation/PropTypes";
import { COLORS, SIZES } from "@/constants/Theme";

export default function SignupScreen({ navigation }: PropsSignup) {
  const haveAccountHandler: () => void = () => navigation.navigate("login");
  const [visible1, setVisibility1] = useState<boolean>(false);
  const [visible2, setVisibility2] = useState<boolean>(false);
  const pressHandler1 = () => setVisibility1(!visible1);
  const pressHandler2 = () => setVisibility2(!visible2);

  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const auth = AUTH;

  const handleSubmit = async () => {
    if (!username) {
      Alert.alert("", "Please enter a username");
      return;
    } else if (!firstName) {
      Alert.alert("", "Please enter a first name");
      return;
    } else if (!lastName) {
      Alert.alert("", "Please enter a last name");
      return;
    } else if (!email) {
      Alert.alert("", "Please enter an email");
      return;
    } else if (!password1) {
      Alert.alert("", "Please enter a password");
      return;
    } else if (!password2) {
      Alert.alert("", "Please enter a confirmation password");
      return;
    } else if (password1 !== password2) {
      Alert.alert("", "Passwords do not match");
      return;
    } else if (password1.length < 6) {
      Alert.alert("", "Password must have at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const querySnapshot: QuerySnapshot<DocumentData, DocumentData> =
        await getDocs(collection(DATA_BASE, "Usernames"));
      let status: boolean = false;
      querySnapshot.forEach((document) => {
        if (document.data().username == username) {
          status = true;
        }
      });

      if (status) {
        Alert.alert("", "Username has been taken");
        return;
      }

      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password1
      );

      if (auth.currentUser != null) {
        sendEmailVerification(auth.currentUser);
      }
      alert("Check Inbox for verification email");

      await setDoc(doc(DATA_BASE, "Users", "" + auth.currentUser?.uid), {
        userName: username,
        name: firstName + " " + lastName,
        email: email,
        calorieGoal: 0,
        following: [username],
        collection: [],
        currentCalorie: 0,
        badges: [false, false, false, false, false],
        DOB: "",
        streak: [],
        lastUpdatedAt: "",
        savedRecipes: [],
        profilePic: "",
        calorieHistory: { date: 0 },
        gender: "",
      });

      await addDoc(collection(DATA_BASE, "Usernames"), {
        username: username,
      });
      navigation.navigate("login");
    } catch (error: any) {
      const errorCode = error.code;
      if (errorCode == "auth/email-already-in-use") {
        Alert.alert("", "Email is already in use");
      } else if (errorCode == "auth/invalid-email") {
        Alert.alert("", "Please enter a valid email");
      } else {
        Alert.alert("", "Something went wrong");
      }
    } finally {
      setLoading(false);
      auth.signOut();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Create your account</Text>
          </View>
        </View>

        <View style={styles.details}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={COLORS.gray}
            value={username}
            onChangeText={(val) => setUsername(val)}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            aria-label="Username"
          />
          <TextInput
            style={styles.input}
            placeholder="First name"
            placeholderTextColor={COLORS.gray}
            value={firstName}
            onChangeText={(val) => {
              setFirstName(val);
            }}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            aria-label="Firstname"
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            placeholderTextColor={COLORS.gray}
            value={lastName}
            onChangeText={(val) => {
              setLastName(val);
            }}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            aria-label="Lastname"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.gray}
            value={email}
            onChangeText={(val) => setEmail(val)}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            aria-label="Email"
          />
          <View style={{ justifyContent: "center" }}>
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.gray}
              placeholder=" Password"
              secureTextEntry={!visible1}
              value={password1}
              onChangeText={(val) => {
                setPassword1(val);
              }}
              textContentType="oneTimeCode"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              aria-label="Password1"
            />
            <TouchableHighlight
              style={styles.visible}
              onPress={pressHandler1}
              underlayColor={COLORS.lightWhite}
            >
              <Ionicons
                name={visible1 ? "eye" : "eye-off"}
                size={22}
                color={COLORS.gray}
              />
            </TouchableHighlight>
          </View>
          <View style={{ justifyContent: "center" }}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={COLORS.gray}
              secureTextEntry={!visible2}
              value={password2}
              onChangeText={(val) => {
                setPassword2(val);
              }}
              textContentType="oneTimeCode"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              aria-label="Password2"
            />
            <TouchableHighlight
              onPress={pressHandler2}
              style={styles.visible}
              underlayColor={COLORS.lightWhite}
            >
              <Ionicons
                name={visible2 ? "eye" : "eye-off"}
                size={22}
                color={COLORS.gray}
              />
            </TouchableHighlight>
          </View>
        </View>

        {!loading ? (
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSubmit}
            aria-label="SignupButton"
          >
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size="large" />
        )}

        <View style={styles.haveAccountContainer}>
          <Text style={styles.defaultText}>Have an account?</Text>

          <TouchableOpacity
            onPress={haveAccountHandler}
            aria-label="signupButton"
          >
            <Text style={styles.signinText}>Log in</Text>
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
    alignItems: "center",
    marginTop: SIZES.medium,
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

  signUpButton: {
    backgroundColor: COLORS.tertiary,
    marginHorizontal: SIZES.xxLarge,
    borderRadius: SIZES.xSmall * 2,
    padding: SIZES.xSmall / 4,
  },

  signup: {
    textAlign: "center",
    fontSize: SIZES.large,
    padding: SIZES.xSmall / 2,
    color: "black",
  },

  haveAccountContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
  },
  defaultText: {
    fontSize: SIZES.medium,
    color: "black",
    marginVertical: SIZES.xSmall / 4,
  },
  signinText: {
    fontSize: SIZES.medium,
    color: COLORS.blue,
    marginLeft: SIZES.xSmall / 2,
    marginVertical: SIZES.xSmall / 4,
  },
});

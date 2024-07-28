import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
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
        alert("Username is already taken");
        return;
      }

      if (username == "") {
        alert("Missing username");
        return;
      }

      if (firstName == "" || lastName == "") {
        alert("Missing name");
        return;
      }

      if (password1 == "") {
        alert("Missing password");
        return;
      }

      if (password1.length < 6) {
        alert("Password too short, must be at least 6 characters");
        return;
      }
      
      if (password1 != password2) {
        alert("Passwords do not match");
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
        calorieHistory: {"date": 0},
      });

      await addDoc(collection(DATA_BASE, "Usernames"), {
        username: username,
      });
    } catch (error: any) {
      const errorCode = error.code;
      if (errorCode == "auth/email-already-in-use") {
        alert("Email already in use");
      } else if (errorCode == "auth/invalid-email") {
        alert("Invalid email");
      } else if (errorCode == "auth/missing-email") {
        alert("Missing email");
      } else {
        alert("Sign up failed: " + error.message);
      }
      return;
    } finally {
      setLoading(false);
      auth.signOut();
    }
    navigation.navigate("login");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create Account</Text>
          <Text style={styles.subHeaderText}>
            Start your journey with DumoEats today!
          </Text>
        </View>
        <View style={styles.details}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={"grey"}
            onChangeText={(val) => setUsername(val)}
            autoCapitalize="none"
            autoCorrect={false}
            aria-label="Username"
          />
          <TextInput
            style={styles.input}
            placeholder="First name"
            placeholderTextColor={"grey"}
            onChangeText={(val) => {
              setFirstName(val);
            }}
            autoCapitalize="none"
            autoCorrect={false}
            aria-label="Firstname"
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            placeholderTextColor={"grey"}
            onChangeText={(val) => {
              setLastName(val);
            }}
            autoCapitalize="none"
            autoCorrect={false}
            aria-label="Lastname"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"grey"}
            onChangeText={(val) => setEmail(val)}
            autoCapitalize="none"
            autoCorrect={false}
            aria-label="Email"
          />
          <View style={{ justifyContent: "center" }}>
            <TextInput
              style={styles.input}
              placeholderTextColor={"grey"}
              placeholder=" Password"
              secureTextEntry={!visible1}
              onChangeText={(val) => {
                setPassword1(val);
              }}
              textContentType="oneTimeCode"
              autoCapitalize="none"
              autoCorrect={false}
              aria-label="Password1"
            />
            <TouchableOpacity style={styles.visible} onPress={pressHandler1}>
              {visible1 ? (
                <Ionicons name="eye" size={22} color="black" />
              ) : (
                <Ionicons name="eye-off" size={22} color="black" />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center" }}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={"grey"}
              secureTextEntry={!visible2}
              onChangeText={(val) => {
                setPassword2(val);
              }}
              textContentType="oneTimeCode"
              autoCapitalize="none"
              aria-label="Password2"
            />
            <TouchableOpacity onPress={pressHandler2} style={styles.visible}>
              {visible2 ? (
                <Ionicons name="eye" size={22} color="black" />
              ) : (
                <Ionicons name="eye-off" size={22} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSubmit}
          aria-label="SignupButton"
        >
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color="deepskyblue" />
        ) : (
          true
        )}
        <TouchableOpacity onPress={haveAccountHandler}>
          <Text style={styles.back}>Already have an account?</Text>
        </TouchableOpacity>
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
    alignItems: "center",
    marginTop: 50,
  },

  headerText: {
    fontSize: 35,
    color: "blue",
    fontWeight: "bold",
  },
  subHeaderText: {
    fontWeight: "bold",
    marginVertical: 10,
  },

  details: {
    padding: 35,
    margin: 5,
  },

  input: {
    backgroundColor: "lavender",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },

  visible: {
    position: "absolute",
    right: 12,
  },

  signUpButton: {
    backgroundColor: "maroon",
    marginTop: 40,
    marginBottom: 30,
    marginHorizontal: 30,
    borderRadius: 20,
    padding: 5,
  },

  signup: {
    textAlign: "center",
    fontSize: 18,
    padding: 5,
    color: "white",
  },

  back: {
    textAlign: "center",
    fontWeight: "bold",
    color: "dodgerblue",
  },
});

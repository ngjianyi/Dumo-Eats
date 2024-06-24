import React, { useState } from "react";

import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createUserWithEmailAndPassword, onAuthStateChanged,sendEmailVerification } from "firebase/auth";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import { doc, setDoc } from "firebase/firestore"; 


export default function SignupScreen({ navigation }: any) {
  const haveAccountHandler: any = () => navigation.navigate("login");
  const [visible1, setVisibility1] = useState(false);
  const [visible2, setVisibility2] = useState(false);

  const pressHandler1 = () => setVisibility1(!visible1);
  const pressHandler2 = () => setVisibility2(!visible2);

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const[loading, setLoading] = useState(false);
  const auth = AUTH;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (password1.length < 5) {
        alert("Password too short, must be at least 5 characters ")
        return;
      }
      if (password1 != password2) {
        alert("Passwords do not match")
        return;
      }
      const response = await createUserWithEmailAndPassword(auth, email, password1)
      if (auth.currentUser != null) {
        sendEmailVerification(auth.currentUser);
      }
      alert("Check Inbox for verification email")
      //add user into firestore db
      await setDoc(doc(DATA_BASE,"Users", "" + auth.currentUser?.uid), {
        userName: username,
        name: firstName + " " + lastName,
        email: email,
        calorieGoal: 0,
        following: [username],
      })
      
      auth.signOut(); 
      navigation.navigate("login")
    } catch (error: any){
      console.log(error);
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  // const handleSubmit = async () => {
  //   if (password1 !== password2) {
  //     console.error("Passwords do not match");
  //     return;
  //   }
  //   // const response = await fetch('http://127.0.0.1:8000/auth/register/', {
  //   const response = await fetch(
  //     "https://dumo-eats.onrender.com/auth/register/",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password: password1,
  //         password2: password2,
  //         username: username,
  //         first_name: firstName,
  //         last_name: lastName,
  //       }),
  //     }
  //   );
  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(data);
  //     navigation.navigate("login");
  //   } else {
  //     const error = await response.json();
  //     console.error(error);
  //   }
  // };

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
          />
          <TextInput
            style={styles.input}
            placeholder="First name"
            placeholderTextColor={"grey"}
            onChangeText={(val) => {
              setFirstName(val);
            }}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            placeholderTextColor={"grey"}
            onChangeText={(val) => {
              setLastName(val);
            }}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"grey"}
            onChangeText={(val) => setEmail(val)}
            autoCapitalize="none"
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
        <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
        {loading ? (<ActivityIndicator size="large" color="deepskyblue"/>): true}
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

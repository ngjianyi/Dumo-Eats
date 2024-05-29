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
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SignupScreen({ navigation }: any) {
  const haveAccountHandler: any = () => navigation.navigate("login");
  const [visible1, setVisibility1] = useState(false);
  const [visible2, setVisibility2] = useState(false);

  const pressHandler1 = () => setVisibility1(!visible1);
  const pressHandler2 = () => setVisibility2(!visible2);


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
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"grey"}
          />
          <View style={{ justifyContent: "center" }}>
            <TextInput
              style={styles.input}
              placeholderTextColor={"grey"}
              placeholder=" Password"
              secureTextEntry={!visible1}
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
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
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

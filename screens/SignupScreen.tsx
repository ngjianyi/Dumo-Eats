import React from "react";
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard} from "react-native";

export default function SignupScreen({navigation}: any) {
    const haveAccountHandler: any = () => navigation.navigate("login");

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerText} >Create Account</Text>
              <Text style={styles.subHeaderText}>Start your journey with DumoEats today!</Text>
          </View>
          <View style={styles.details}>
            <TextInput
              style={styles.input}
              placeholder="Username"
            />
             <TextInput
              style={styles.input}
              placeholder="Email"
            />
             <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
            />
             <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
            />
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
    flex:1,
    backgroundColor:"white",
  },

  header: {
    alignItems:"center",
    marginTop: 50,
  },

  headerText: {
    fontSize: 35,
    color:"blue",
    fontWeight:"bold",
  },
  subHeaderText: {
    fontWeight:"bold",
    marginVertical: 10
  },

  details: {
    paddingHorizontal:30,
  },

  input: {
    backgroundColor:"lavender",
    padding:10,
    marginVertical:10,
  },
  
  signUpButton: {
    backgroundColor:"maroon",
    marginTop:50,
    marginBottom:30,
    marginHorizontal:30,
    borderRadius:20,
    padding:5,  
  },

  signup:{
    textAlign:"center",
    fontSize: 18,
    padding:5,
    color:"white"
  },

  back: {
    textAlign:"center",
    fontWeight:"bold",
  }
})
  
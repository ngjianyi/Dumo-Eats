import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from "react-native";
import React from "react";

export default function LoginScreen({navigation}: any) {
    const signupHandler = () => navigation.navigate("signup");
    const loginHandler = () => navigation.navigate("home");
    return (
        <TouchableWithoutFeedback onPress= {() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container} >
                <View style={styles.header}>
                    <Text style={styles.headerText}>Hello!</Text>
                    <Text style={styles.subHeaderText}>Welcome back to DumoEats!</Text>
                </View>
                <View style={styles.details}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={"grey"}
                        placeholder=" Username"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={"grey"}
                        placeholder=" Password"
                        secureTextEntry
                    />
                    <TouchableOpacity>
                        <Text style={{textAlign:"right"}}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.login}>Log In</Text>
                </TouchableOpacity>
                <View>
                    <Text style ={{textAlign:"center"}}>Don't have an account yet?</Text>
                    <TouchableOpacity 
                        style={styles.signupButton}
                        onPress={signupHandler}>
                        <Text style={styles.signUp}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
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
    marginTop:50,
    alignItems:"center",
  },

  headerText: {
    // paddingTop:20,
    fontSize: 35,
    fontWeight:"bold",
    color:"darkgreen"
  },

  subHeaderText: {
    fontWeight:"bold",
    marginVertical: 10
  },
  details:{
    margin:5,
    padding:35,
  },

  input: {
    padding:5,
    marginVertical:5,
    backgroundColor:"lavender",
    borderRadius: 5
  },

  loginButton: {
    backgroundColor:"springgreen",
    marginVertical:20,
    marginHorizontal:60,
    borderRadius:20,
    padding:5,
  },

  login:{
    textAlign:"center",
    fontSize: 18,
  },

  signupButton: {
    backgroundColor:"gold",
    marginVertical:3,
    marginHorizontal:60,
    borderRadius:20,
    padding:5,
  },

  signUp: {
    textAlign:"center",
    fontSize: 18,
  },

})
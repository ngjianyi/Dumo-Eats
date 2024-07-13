import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
  } from "react-native";
  import React, { useState } from "react";
  import {AUTH} from "@/firebaseCONFIG";
  import {  sendPasswordResetEmail } from "firebase/auth";
  
  export default function ForgotScreen({ navigation }: any) {
    const backHandler = () => navigation.navigate("login");
    const [email, setEmail] = useState("");
    const sendReset = () => {
      sendPasswordResetEmail(AUTH, email)
    .then(() => {
      alert("Check your Email")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message)
    });
    }
  
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Reset Password</Text>
            <Text style={styles.subHeaderText}>
              Please enter the email used during sign up.
            </Text>
          </View>
          <View style={styles.detail}>
            <TextInput 
              style={styles.input} 
              placeholder="Email" 
              placeholderTextColor={"grey"}
              onChangeText={(value) => setEmail(value)}
              />
            <TouchableOpacity onPress={backHandler}>
              <Text style={styles.back}>Back to Login</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.submit} onPress={sendReset}>
            <Text style={styles.submitText}>Submit</Text>
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
      fontWeight: "bold",
    },
  
    subHeaderText: {
      marginTop: 20,
      marginBottom: 50,
    },
    
    detail: {
      padding:35,
    },
  
    input: {
      backgroundColor: "lavender",
      padding: 10,
      marginVertical: 10,
      borderRadius:5,
    },
  
    back: {
      textAlign:"right",
      color:"dodgerblue"
    },
  
    submit: {
      backgroundColor: "maroon",
      marginTop: 50,
      marginBottom: 30,
      marginHorizontal: 30,
      borderRadius: 20,
      padding: 5,
    },
  
    submitText: {
      textAlign: "center",
      fontSize: 18,
      padding: 5,
      color: "white",
    }
  });
  
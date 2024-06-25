import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
  } from "react-native";
import React, { useState, useEffect, useContext} from "react";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import { doc, DocumentData, collection, getDocs, getDoc, query, where, updateDoc } from "firebase/firestore";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function UpdateScreen({modalHandler, setBar, bar}: any) {
    const[calories, setCalories] = useState(0);
    const userRef = doc(DATA_BASE, "Users", "" + AUTH.currentUser?.uid)

    const updateCalories = (input: string) => {
        if (isNaN(Number(input)) || input =="0") {
             Alert.alert("Error", "Input needs to be a number and greater than 0", [{text: "ok"}])
        } else {
            setCalories(Number(input))
        }
    }
    
    const submitCalories = async () => {
        modalHandler();
        const curr = (await getDoc(userRef)).data()?.currentCalorie
        await updateDoc(userRef, {
            currentCalorie: curr + calories
        });
        setBar(!bar)
        // progressHandler(calories);
    }
    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={styles.closeContainer}>
                    <TouchableOpacity 
                    onPress={()=>modalHandler()}
                    style={styles.closeButton}>
                        <Ionicons name="close-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Calories Log</Text>
                </View>
                <View style={styles.detailsCalorie}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add calories (kcal)"
                        keyboardType="numeric"
                        onChangeText={updateCalories}
                    /> 
                    <TouchableOpacity>
                        <Ionicons name="camera" size={35} color="black" />
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                    style={styles.submitButton}
                    onPress={submitCalories}
                >
                    <Text style={styles.submit}>Submit</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white",
        
    },

    closeContainer: {
        alignItems:"flex-end",
        marginTop: 20,
    },

    closeButton: {
        marginRight:20,
        backgroundColor:"red",

    },

    header: {
        marginTop:50,
    },

    headerText: {
        textAlign:"center",
        fontSize: 35,
        color: "darkcyan",
        fontWeight: "bold",
    },

    detailsFood: {

    },

    detailsCalorie: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"

    },

    input: {
        backgroundColor:"lavender",
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        width:300,
        marginLeft: 20,
        marginRight:5,
    },
   

    submitButton:{
        backgroundColor: "maroon",
        marginTop: 40,
        marginBottom: 30,
        marginHorizontal: 30,
        borderRadius: 20,
        padding: 5,
    },

    submit: {
        textAlign:"center",
        color:"white",
        fontSize: 18,
        padding: 5,
    }


})
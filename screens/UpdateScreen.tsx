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
import React, { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function UpdateScreen({modalHandler, progressHandler}: any) {
    const[calories, setCalories] = useState(0);
    const updateCalories = (input: string) => {
        isNaN(Number(input))
        ? Alert.alert("Error", "Input needs to be a number", [{text: "ok"}])
        :setCalories(Number(input))
    }
    const submitCalories = (calorie: number) => {
        modalHandler();
        progressHandler(calorie);
    }
    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
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
                    onPress={() => submitCalories(calories)}
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
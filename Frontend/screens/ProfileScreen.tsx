import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
  } from "react-native";
import React, { useState } from "react";
// import * as Keychain from "react-native-keychain";
 
const profilePic = require("@/assets/images/SampleProfile.png")

export default function ProfileScreen({navigation}: any) {
    const [name, setName] = useState("Tom henry");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [calorieGoal, setGoal] = useState("");

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Profile</Text>
                    <Image source={profilePic} style={styles.profilePic}/>
                </View>
                <View style={styles.details}>
                    <Text style={styles.inputLabel}>Name:</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            onChangeText={(value: string) => setName(value)}
                            placeholder= "Tom henry"
                            value={name}
                        />
                    </View>
                    <Text style={styles.inputLabel}>Date of Birth:</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            onChangeText={(value: string) => setDate(value)}
                            placeholder="03/06/2024"
                            value={date}
                        />
                    </View>
                    <Text style={styles.inputLabel}>Email:</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            onChangeText={(value: string) => setEmail(value)}
                            placeholder="dumoeats@gmail.com"
                            value={email}
                        />
                    </View>
                    <Text style={styles.inputLabel}>Calories Goal:</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            onChangeText={(value: string) => setGoal(value)}
                            placeholder= "1234"
                            value={calorieGoal}
                        />
                    </View>
                    
                </View>
                <TouchableOpacity 
                    style={styles.logoutButton}
                    onPress={() => navigation.navigate("login")}>
                    <Text style={styles.logout}>logout</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header: {
        marginTop: 20,
        alignItems:"center",
    },

    headerText: {
        fontSize:20,
        marginBottom:30,
    },

    profilePic: {
        height: 100,
        width: 100,
        borderRadius: 85,
        borderWidth: 2,
        borderColor:"black"
    },
    details: {
        marginTop:20,
        padding:15,
    },
    inputLabel: {
        marginHorizontal:2
    },

    inputBox: {
        height:44,
        width:"100%",
        borderWidth:2,
        borderColor:"lightgrey",
        marginVertical: 14,
        justifyContent: "center",
        paddingLeft: 8,

    },

    logoutButton: {
        backgroundColor:"maroon",
        marginHorizontal: 150,
    },

    logout: {
        textAlign:'center',
        padding:5,
        color:"white",
    },
})
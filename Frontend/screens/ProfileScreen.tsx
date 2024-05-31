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
import * as Keychain from "react-native-keychain";
 
const profilePic = require("@/assets/images/SampleProfile.png")

export default function ProfileScreen({navigation}: any) {
    const logoutHandler = () => {
        navigation.navigate("login")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
                <Image source={profilePic} style={styles.profilePic}/>
            </View>
            <View style={styles.details}>
                <Text>Name</Text>
                <View>

                </View>
            </View>
            <TouchableOpacity 
                style={styles.logoutButton}
                onPress={logoutHandler}>
                <Text style={styles.logout}>logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
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

    inputBox: {
        
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
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

export default function ProfileScreen({navigation}: any) {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.logoutButton}
                onPress={() => navigation.navigate("login")}>
                <Text style={styles.logout}>logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center"
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
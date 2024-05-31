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

export default function Scan() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>camera</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
    },
})
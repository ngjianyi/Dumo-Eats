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
    FlatList,
    Modal,
    ImageURISource,
  } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { updateDoc, arrayUnion, arrayRemove, doc, DocumentData, collection, getDocs, getDoc, DocumentReference, FieldValue } from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";

interface Item {
    title: string,
    description: string,
    img: ImageURISource,
    imgGrey: ImageURISource,
}
interface badgeprops {
    item: Item 
}

export default function Badge({item}: badgeprops) {
    return(
        <View style={styles.badgeContainer}>
            <View style={styles.icon}>
                <Image style={styles.pic} source={item.img}/>
            </View>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
                <View style={styles.description}>
                    <Text style={styles.sentence}>{item.description}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    badgeContainer: {
        flexDirection:"row",
        backgroundColor:"azure",
        width:"100%",
        borderWidth:1,
        borderColor:"maroon",
        alignItems:"center",
        padding: 50,
    },

    icon: {
        position:"absolute",
        left: 10,
    },
    pic: {
        height: 50,
        width: 50,
    },
    content: {
        marginLeft:50,
    },

    header: {
        marginBottom:5,
    },

    title: {
        fontWeight:"bold",
        fontSize:20,

    },

    description: {

    },

    sentence: {
        fontSize:14,
    },
})  
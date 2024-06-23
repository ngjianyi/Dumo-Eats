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
  } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { updateDoc, arrayUnion, arrayRemove, doc, DocumentData, collection, getDocs, getDoc, DocumentReference } from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import { delay } from "@reduxjs/toolkit/dist/utils";
import CommentsScreen from "@/screens/CommentsScreen";


export default function Comment({comment, details}: any) {
    return(
        <View style={styles.commentBox}>
            <View style={styles.userInfo}>
                <Text style={{fontSize:15, fontWeight:"bold"}}>{details.userName}</Text>
            </View>
            <View style={styles.comment}>
                <Text>{comment}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    commentBox: {
        marginVertical:10,
        alignSelf:"center",
        width:"95%",
        // borderWidth:4,
        // borderColor:"lightblue"
    },
    userInfo: {
  
    },
    
    comment: {
    },

})
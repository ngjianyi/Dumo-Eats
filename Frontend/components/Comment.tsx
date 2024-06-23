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
    const userRef = doc(DATA_BASE, "Users", "" + AUTH.currentUser?.uid)
    const [name, setName] = useState("")
    const docsnap = async () => await getDoc(userRef).then((val) => {setName(val.data()?.userName)})
    docsnap()
    return(
        <View style={styles.commentBox}>
            <View style={styles.userInfo}>
                <Text style={{fontSize:15, fontWeight:"bold"}}>{name}</Text>
                <Text style={{fontSize:15, marginLeft: 5,}}>{comment.split("|")[0]}</Text>
            </View>
            <View style={styles.comment}>
                <Text >{comment.split("|")[1]}</Text>
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
        flexDirection:"row",
        alignItems:"center",

    },
    
    comment: {
    },

})
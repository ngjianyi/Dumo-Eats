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
import CommentsScreen from "./CommentsScreen";
import TimeElapsed from "@/utils/functions/TimeElapsed";
type Props = {
    commentRef: DocumentReference;
};

export default function Comment({commentRef}: Props) {
    const userRef = doc(DATA_BASE, "Users", "" + AUTH.currentUser?.uid)
    // const [name, setName] = useState("")
    // const docsnap = async () => await getDoc(userRef).then((val) => {setName(val.data()?.userName)})
    // docsnap()
    const [username, setUsername] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [date, setDate] = useState<string>("");
  
    
    const getComment = async () => {
      const commentDocSnap = await getDoc(commentRef);
      if (commentDocSnap.exists()) {
        const commentData = commentDocSnap.data();
        const userRef: DocumentReference = commentData.user;
        const userDocSnap = await getDoc(userRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUsername(userData.userName);
        } else {
          setUsername("Unknown");
        }
        setBody(commentData.body);
        setDate(TimeElapsed(commentData.time));
      } else {
        setBody("Something went wrong");
      }
    };
    useEffect(() => 
       {getComment()}
    , [])
    
    return(
        <View style={styles.commentBox}>
            <View style={styles.userInfo}>
                {/* <Text style={{fontSize:15, fontWeight:"bold"}}>{comment.split("|")[0]}</Text>
                <Text style={{fontSize:15, marginLeft: 5,}}>{comment.split("|")[1]}</Text> */}
                <Text style={{fontSize:15, fontWeight:"bold"}}>{username}</Text>
                <Text style={{fontSize:15, marginLeft: 5,}}>{date}</Text>
            </View>
            <View style={styles.comment}>
                {/* <Text >{comment.split("|")[2]}</Text> */}
                <Text >{body}</Text>

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
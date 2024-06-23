import {ScrollView, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, TouchableWithoutFeedback, Keyboard, TextInput, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import { doc, DocumentData, collection, getDocs, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import Ionicons from '@expo/vector-icons/Ionicons';
import CommentsList from "@/components/CommentsList";
import { useLocalSearchParams } from "expo-router";

export default function CommentsScreen({item, visible, setVisible, comments, setRefresh, refreshComment} : any) {
    const [input, setInput] = useState("")
    const postref = item.postRef;

    //add comment to comments array field, and then change dependency of useEffect
    const onPost =  async () => {
        //add new comment to comments array
        await updateDoc(postref, {
            comments: arrayUnion(input)
        })
        //set back to ""
        setInput("")
        setRefresh(!refreshComment)
        Keyboard.dismiss()
    }
    return(
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>
                            Comments
                        </Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={() =>setVisible(!visible)}>
                        <Ionicons name="close-sharp" size={24} color="white" />                
                    </TouchableOpacity>
                </View>
                <View style={styles.commentsSection}>
                    <CommentsList comments={comments} details={item}/>
                </View>
                
                <KeyboardAvoidingView style={styles.inputContainer} behavior="position">
                    <View style={styles.input}>
                        <View style={{marginRight:5, width:"100%"}}>
                            <TextInput 
                                style={{marginRight:10, width:"90%",}}
                                placeholder="Add comment"
                                value={input}
                                multiline={true}
                                onChangeText={(val)=>setInput(val)}
                            />
                        </View>
                        
                        <TouchableOpacity 
                        onPress={onPost}
                        style={styles.sendButton}>
                            <Ionicons name="send" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
               
            </SafeAreaView> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
    },
    header: {
        flexDirection:"row",
        marginTop: 20,
        width:"95%",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        backgroundColor:"turquoise"
    },
    title: {
        fontSize:25,
        textAlign:"center",
    },

    closeButton: {
        position: "absolute",
        backgroundColor:"red",
        borderRadius:5,
        right:2,
    },
    commentsSection: {
        flex:1,
        width:"100%"
    },
    inputContainer: {
        width:"100%",
    },

    input: {
        backgroundColor:"gainsboro",
        padding: 10,
        width:"100%",
        alignSelf:"center",
        flexDirection:"row",
        alignItems:"center",
    },

    sendButton: {
        position:"absolute",
        right:0,
        marginLeft:10,
    }
})

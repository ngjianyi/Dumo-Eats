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
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { updateDoc, arrayUnion, arrayRemove, doc, DocumentData, collection, getDocs, getDoc, DocumentReference, FieldValue } from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import CommentsScreen from "@/screens/Home/Feed/Comments/CommentsScreen";
const profilepic = require("@/assets/images/SampleProfile.png")
// interface PostItem {
//     caption: string;
//     image: string;
//     userName: string;
//     time: string;
//     likes: [string];
//     comments: [string];
//     postRef: DocumentReference;
// }

interface Props {
    item: DocumentReference;
}

export default function SavedPost({item} : Props) {
    const[temp, setTemp] = useState(false)
    const[visible, setVisible] = useState(false)
    const[comments, setComments] = useState<DocumentReference[]>([]);
    const[refreshComment, setRefresh] = useState(false)
    const[likes, setLikes] = useState(0)
    const[heart, setHeart] = useState(false)
    const[caption, setCaption] = useState<string>("")
    const[username, setUsername] = useState<string>("")
    const[time, setTime] = useState<string>("")
    const [URI, setURI] = useState<string>("default")
    
     const setInitialStates = async () => {
        const updatedDoc = (await getDoc(item)).data()
        setLikes(updatedDoc?.likes.length)
        setHeart(updatedDoc?.likes.includes(AUTH.currentUser?.uid))
        setComments(updatedDoc?.comments)
        setURI(updatedDoc?.image)
        setUsername(updatedDoc?.userName)
        setCaption(updatedDoc?.caption)
        setTime(updatedDoc?.time)
     }
    //  const getAllComments = async () => {
    //     setComments([])
    //     const updatedDoc = (await getDoc(postref)).data()
    //     //acts like a stack, last in first to be displayed
    //     setComments(updatedDoc?.comments)
    //  }

    // to keep previous state of likes when refreshed / logged in 
    // to keep previous state of comments
    const getAllComments = async () => {
        const updatedDoc = (await getDoc(item)).data();
        setComments(updatedDoc?.comments);
    };
    
     useEffect(() => {
        setInitialStates()
        getAllComments
     }, [refreshComment])

     
    return (
        <View style={styles.container}>
            <View>
                <Modal visible={visible}>
                    <CommentsScreen item={item} visible={visible} setVisible={setVisible} comments={comments} refreshComment={refreshComment} setRefresh={setRefresh}/>
                </Modal>
            </View>
            <View style={styles.header}>
                <View style={styles.userinfo}>
                    <Image source={profilepic} style={styles.profilePic}/>
                    <View>
                        <Text style={styles.username}>{username}</Text>
                        <Text style={styles.username}>{time}</Text>
                    </View>
                </View>   
            </View> 
            <View style={styles.imageHolder}>
                <Image source={{uri: URI}} style={styles.image}/>
            </View>
            <View style={styles.footer}>
                <View style={styles.leftFooter}>
                    <TouchableOpacity
                    onPress={()=>setTemp(!temp)}
                    >
                        {heart 
                            ? <Ionicons name="heart" size={40} color="red" />
                            : <Ionicons name="heart-outline" size={40} color="black"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setVisible(!visible)}>
                        <Ionicons name="chatbubble-outline" size={35} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.description}>
                <Text style={[styles.caption, {color:"green", marginBottom:3,}]}>
                    {likes} Likes
                </Text>
                <Text style={styles.caption}>
                    <Text style={{fontWeight:"bold"}}>
                        {username}
                    </Text>
                    <Text>
                        {" " + caption}
                    </Text>
                </Text>
                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        marginVertical:10,
    },
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width: "95%",
        marginBottom:0,
        backgroundColor:"springgreen",
        borderWidth:1,
        borderBottomWidth:0,
    },

    profilePic: {
        borderRadius:50,
        height:40,
        width: 40,
        borderWidth:1.5,
        marginLeft:5,
    },

    username: {
        marginLeft: 5,
    },

    userinfo: {
        flexDirection:"row",
        alignItems: "center",
    },
    imageHolder: {
        flex:1,
        aspectRatio: 1.5,
        width:"100%",
        alignItems:"center",
        
    },
    image: {
        height: "100%",
        width: "95%",
        resizeMode: "cover",
    },

    footer: {
        flexDirection:"row",
        backgroundColor:"beige",
        width: "95%",
        borderWidth:1,
        borderBottomWidth:0,
    },

    leftFooter:{
        paddingVertical:5,
        flexDirection:"row",
        width: "25%",
        justifyContent:"space-between",
    },

    rightFooter: {
        flex:1,
        paddingVertical:5,
        alignItems:"flex-end"
    },

    description: {
        width:"95%",
        backgroundColor:"beige",
        borderWidth:1,
        borderTopWidth:0,
    },

    caption: {
        paddingLeft: 5,
    }
})
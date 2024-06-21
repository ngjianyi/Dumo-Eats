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
  } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
const profilepic = require("@/assets/images/SampleProfile.png")
export default function Post({item}: any) {
    return(
        <View style={styles.container}> 
            <View style={styles.header}>
                <View style={styles.userinfo}>
                    <Image source={profilepic} style={styles.profilePic}/>
                    <View>
                        <Text style={styles.username}>{item.userName}</Text>
                        <Text style={styles.username}>{item.time}</Text>
                    </View>
                </View>   
            </View> 
            <View style={styles.imageHolder}>
                <Image source={{uri: item.image}} style={styles.image}/>
            </View>
            <View style={styles.footer}>
                <View style={styles.leftFooter}>
                    <TouchableOpacity>
                        <Ionicons name="heart-outline" size={40} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="chatbubble-outline" size={35} color="black" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                        <Ionicons name="bookmark-outline" size={35} color="black" />
                    </TouchableOpacity> */}
                </View>
                <View style={styles.rightFooter}>
                    <TouchableOpacity>
                        <Ionicons name="bookmark-outline" size={35} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.description}>
                <Text style={[styles.caption, {color:"green", marginBottom:3,}]}>
                    1000 Likes
                </Text>
                <Text style={styles.caption}>
                    <Text style={{fontWeight:"bold"}}>
                        {item.userName}
                    </Text>
                    <Text>
                        {" " + item.caption}
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
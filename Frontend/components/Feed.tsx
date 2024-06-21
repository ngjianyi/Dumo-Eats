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
  import Post from "@/components/Posts"

  export default function Feed({ posts }: any) {
    return(
        //<View style={styles.post}>
        <FlatList
            showsVerticalScrollIndicator={false}
            style={{flex:1}}
            data={posts}
            renderItem={({item, index}) => (
                <Post item={item} />
                // <View> 
                //     <Image source={{uri: item.image}} style={styles.Pic}/>
                //     <Text>{item.caption}</Text>
                //     <Text>{item.time}</Text>
                // </View>
            )}  
        />
        //</View>
    )
  }

  const styles = StyleSheet.create({
    post: {
        flex:1,
        marginHorizontal: 17,
        alignItems: 'center',
        backgroundColor:"lightblue",
        paddingLeft:10,
        marginTop:15,
        borderRadius:10,
    },
    Pic: {
        height: 200,
        width: 200,
    },
  })
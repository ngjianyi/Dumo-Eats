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

  export default function Feed({ posts }: any) {
    return(
        <View style={styles.post}>
            <FlatList
            style={{flex:1}}
            data={posts}
            renderItem={({item, index}) => (
                <View> 
                    <Image source={{uri: item.image}} style={styles.Pic}/>
                    <Text>{item.caption}</Text>
                    <Text>{item.time}</Text>
                </View>
            )}  
            />
        </View>
    )
  }

  const styles = StyleSheet.create({
    post: {
        flex:1,
        marginHorizontal: 18,
        alignItems: 'center',
        backgroundColor:"lightblue",
    },
    Pic: {
        height: 200,
        width: 200,
    },
  })
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
  import React, { useState, useContext } from "react";
  import { doc, DocumentData, collection, getDocs, getDoc, query, where } from "firebase/firestore";
  import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
  import SavePost from "./SavePost";

  export default function CollectionList({collectionArray} : any) {

    return(
        <FlatList
            showsVerticalScrollIndicator={true}
            data={collectionArray}
            renderItem={({item, index}) => (
                // <Text>{index}</Text>
                <SavePost item={item}/>
                // <Comment comment={item} details={details} />
            )}  
        />
    )
  }
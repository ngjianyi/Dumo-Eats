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
  import Comment from"@/components/Comment"

  export default function CommentsList({ comments, details }: any) {
    return(
        <FlatList
            showsVerticalScrollIndicator={true}
            data={comments}
            renderItem={({item, index}) => (
                // <Text>{item}</Text>
                <Comment comment={item} details={details} />
            )}  
        />
    )
  }
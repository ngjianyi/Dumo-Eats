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
// import Comment from "./Comment";
import Comment from "@/components/social/comments/Comment";

export default function CommentsList({ comments }: any) {
  return (
    <FlatList
      showsVerticalScrollIndicator={true}
      data={comments}
      renderItem={({ item }) => (
        <Comment commentRef={item} />
      )}
    />
  );
}

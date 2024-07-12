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
import Post from "./Post";

export default function Feed({ posts }: any) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      data={posts}
      renderItem={({ item, index }) => <Post item={item} />}
    />
  );
}

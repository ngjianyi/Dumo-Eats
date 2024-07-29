import {
  FlatList,
} from "react-native";
import React from "react";
import Post from "./Post";
import { DocumentReference } from "firebase/firestore";

interface PostItem {
  caption: string;
  image: string;
  time: string;
  likes: string[];
  comments: DocumentReference[];
  postRef: DocumentReference;
  userRef: DocumentReference
}

interface Props {
  posts: PostItem[]
}

export default function Feed({ posts }: Props ) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      data={posts}
      renderItem={({ item }) => <Post item={item} />}
    />
  );
}

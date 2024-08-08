import { FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import Post from "./Post";
import { DocumentReference } from "firebase/firestore";

interface PostItem {
  caption: string;
  image: string;
  time: string;
  likes: string[];
  comments: DocumentReference[];
  postRef: DocumentReference;
  userRef: DocumentReference;
}

interface Props {
  posts: PostItem[];
  getAllPosts: () => void;
}

export default function Feed({ posts, getAllPosts }: Props) {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    setRefreshing(true);
    getAllPosts();
    setRefreshing(false);
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      data={posts}
      renderItem={({ item }) => <Post item={item} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}

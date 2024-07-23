import Post from "@/screens/Home/Feed/Post";
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
import {
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  DocumentData,
  collection,
  getDocs,
  getDoc,
  DocumentReference,
  FieldValue,
} from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";

interface Props {
  item: DocumentReference;
}

export default function SavePost({ item }: Props) {
  interface PostItem {
    caption: string;
    image: string;
    userName: string;
    time: string;
    likes: string[];
    comments: DocumentReference[];
    postRef: DocumentReference;
  }

  const [comments, setComments] = useState<DocumentReference[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [caption, setCaption] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [URI, setURI] = useState<string>("default");

  const setItem = async () => {
    const updatedDoc = (await getDoc(item)).data();
    setLikes(updatedDoc?.likes);
    setComments(updatedDoc?.comments);
    setURI(updatedDoc?.image);
    setUsername(updatedDoc?.userName);
    setCaption(updatedDoc?.caption);
    setTime(updatedDoc?.time);
  };

  const getItem = () : PostItem=> {
    return {
      caption: caption,
      image: URI,
      userName: username,
      time: time,
      likes: likes,
      comments: comments,
      postRef: item,
    }
  }
  useEffect(() => {
    setItem()
  }, []);

  return <Post item={getItem()} />;
}

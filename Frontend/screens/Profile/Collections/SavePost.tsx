import Post from "@/screens/Home/Feed/Post";

import React, {useEffect, useState } from "react";
import { PostItem } from "@/screens/Home/Feed/Post";
import {
  getDoc,
  DocumentReference,
} from "firebase/firestore";

interface Props {
  item: DocumentReference;
}

export default function SavePost({ item }: Props) {


  const [comments, setComments] = useState<DocumentReference[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [caption, setCaption] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [URI, setURI] = useState<string>("default");
  const [userRef, setUserRef] = useState<DocumentReference>()

  const setItem = async () => {
    const updatedDoc = (await getDoc(item)).data();
    setLikes(updatedDoc?.likes);
    setComments(updatedDoc?.comments);
    setURI(updatedDoc?.image);
    setCaption(updatedDoc?.caption);
    setTime(updatedDoc?.time);
    setUserRef(updatedDoc?.userRef)
  };

  const getItem = () : PostItem=> {
    return {
      caption: caption,
      image: URI,
      time: time,
      likes: likes,
      comments: comments,
      postRef: item,
      userRef: userRef as DocumentReference
    }
  }
  useEffect(() => {
    setItem()
  }, []);

  return <Post item={getItem()} />;
}

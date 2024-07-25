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
import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { getUserDocSnap } from "@/utils/social/User";
import { likeHandler, saveHandler } from "@/utils/social/SocialHandlers";

import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import CommentsScreen from "./Comments/CommentsScreen";
import AddCollectionFunc from "@/contexts/AddCollectionFunc";
import RefreshCommentContext from "@/contexts/RefreshComment";
const profilepic = require("@/assets/images/defaultProfile.png");
interface PostItem {
  caption: string;
  image: string;
  userName: string;
  time: string;
  likes: string[];
  comments: DocumentReference[];
  postRef: DocumentReference;
}

interface PostProps {
  item: PostItem;
}

export default function Post({ item }: PostProps) {
  const refreshCommentContext = useContext(RefreshCommentContext)
  const postref = item.postRef;
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState<DocumentReference[]>([]);
  const [refreshComment, setRefresh] = useState(false);
  const [likes, setLikes] = useState(0);
  const [heart, setHeart] = useState(false);
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState<string>("");
  const[username, setUsername] = useState<string>("");

  const setInitialStates = async () => {
    const updatedDoc = (await getDoc(postref)).data();
    const docSnap = await getUserDocSnap();
    const posterRef : DocumentReference = updatedDoc?.userRef
    const posterDoc = (await getDoc(posterRef)).data()
    setUsername(posterDoc?.userName)
    setImage(posterDoc?.profilePic)
    setLikes(updatedDoc?.likes.length);
    setHeart(updatedDoc?.likes.includes(AUTH.currentUser?.uid));
    // setImage(posterDoc?.userName)
    if (docSnap.exists()) {
      const refArray: DocumentReference[] = docSnap.data().collection;
      const refStringArray: string[] = refArray.map((ref) => ref.path);
      setSaved(refStringArray.includes(postref.path));
    }
  };

  const getAllComments = async () => {
    const updatedDoc = (await getDoc(postref)).data();
    setComments(updatedDoc?.comments);
  };

  // to keep previous state of likes when refreshed / logged in
  // to keep previous state of comments
  useEffect(() => {
    setInitialStates();
    getAllComments();
  }, [refreshCommentContext?.refreshComment]);

  const likeButtonHandler = useCallback(async () => {
    await likeHandler(setHeart, setLikes, postref);
    refreshCommentContext?.setRefreshComment(refreshComment => !refreshComment)
  }, []);

  const saveButtonhandler = useCallback(() => {
    saveHandler(setSaved, postref, "collection");
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Modal visible={visible}>
          <CommentsScreen
            item={item}
            visible={visible}
            setVisible={setVisible}
            comments={comments}
            refreshComment={refreshComment}
            setRefresh={setRefresh}
          />
        </Modal>
      </View>
      <View style={styles.header}>
        <View style={styles.userinfo}>
          {
            image != ""
            ? <Image source={{uri: image}} style= {styles.profilePic}/>
            : <Image source={profilepic} style={styles.profilePic}/>
          }
          <View>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.username}>{item.time}</Text>
          </View>
        </View>
      </View>
      <View style={styles.imageHolder}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.footer}>
        <View style={styles.leftFooter}>
          <TouchableOpacity onPress={likeButtonHandler}>
            {heart ? (
              <Ionicons name="heart" size={40} color="red" />
            ) : (
              <Ionicons name="heart-outline" size={40} color="black" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Ionicons name="chatbubble-outline" size={35} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.rightFooter}>
          <TouchableOpacity onPress={saveButtonhandler}>
            {saved ? (
              <Ionicons name="bookmark" size={35} color="magenta" />
            ) : (
              <Ionicons name="bookmark-outline" size={35} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={[styles.caption, { color: "green", marginBottom: 3 }]}>
          {likes} Likes
        </Text>
        <Text style={styles.caption}>
          <Text style={{ fontWeight: "bold" }}>{username}</Text>
          <Text>{" " + item.caption}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    marginBottom: 0,
    backgroundColor: "aliceblue",
    borderWidth: 1,
    borderBottomWidth: 0,
  },

  profilePic: {
    borderRadius: 50,
    height: 40,
    width: 40,
    marginLeft: 5,
  },

  username: {
    marginLeft: 5,
  },

  userinfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical:5,
  },
  imageHolder: {
    flex: 1,
    aspectRatio: 1.5,
    width: "100%",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "95%",
    resizeMode: "cover",
  },

  footer: {
    flexDirection: "row",
    backgroundColor: "lavenderblush",
    width: "95%",
    borderWidth: 1,
    borderBottomWidth: 0,
  },

  leftFooter: {
    paddingVertical: 5,
    flexDirection: "row",
    width: "25%",
    justifyContent: "space-between",
  },

  rightFooter: {
    flex: 1,
    paddingVertical: 5,
    alignItems: "flex-end",
  },

  description: {
    width: "95%",
    backgroundColor: "lavenderblush",
    borderWidth: 1,
    borderTopWidth: 0,
  },

  caption: {
    paddingLeft: 5,
  },
});

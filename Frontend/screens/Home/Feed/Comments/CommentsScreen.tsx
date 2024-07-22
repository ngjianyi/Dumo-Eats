import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useCallback, Dispatch, SetStateAction, useContext } from "react";
import {
  doc,
  DocumentData,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  DocumentReference,
} from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import { commentHandler } from "@/utils/social/SocialHandlers";
import Ionicons from "@expo/vector-icons/Ionicons";
import CommentsList from "./CommentsList";
import RefreshCommentContext from "@/contexts/RefreshComment";
import moment from "moment";
interface Props {
  item: DocumentData,
  visible: boolean,
  setVisible: Dispatch<SetStateAction<boolean>>,
  comments: DocumentReference<DocumentData, DocumentData>[],
  setRefresh : Dispatch<SetStateAction<boolean>>,
  refreshComment: boolean
}
export default function CommentsScreen({
  item,
  visible,
  setVisible,
  comments,
  setRefresh,
  refreshComment,
}: Props) {
  const [input, setInput] = useState("");
  const postref = item.postRef;
  const userRef = doc(DATA_BASE, "Users", "" + AUTH.currentUser?.uid);
  
  //add comment to comments array field, and then change dependency of useEffect



  // const onPost = async () => {
  //   //add new comment to comments array
  //   const docsnap = await getDoc(userRef);
  //   const posterName = docsnap.data()?.userName;
  //   const time = moment().format("LLL");
  //   await updateDoc(postref, {
  //     comments: arrayUnion(posterName + "|" + time + "|" + input),
  //   });
  //   //set back to ""
  //   setRefresh(!refreshComment);
  // };


  //this will create a comment inside the postcomments collection
  //and then add the new comment ref into the comments array insdie post
  const refreshCommentContext = useContext(RefreshCommentContext)
  const commentButtonHandler = useCallback(
    async (trimmedBody: string): Promise<void> => {
      await commentHandler(trimmedBody, postref, "PostsComments");
      // setRefresh(refreshComment => !refreshComment);
      refreshCommentContext?.setRefreshComment(refreshComment => !refreshComment)
      setInput("");
      Keyboard.dismiss();
    },
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Comments</Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setVisible(!visible)}
        >
          <Ionicons name="close-sharp" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.commentsSection}>
        <CommentsList comments={comments} />
      </View>

      <KeyboardAvoidingView style={styles.inputContainer} behavior="position">
        <View style={styles.input}>
          <View style={{ marginRight: 5, width: "100%" }}>
            <TextInput
              style={{ marginRight: 10, width: "90%" }}
              placeholder="Add comment"
              value={input}
              multiline={true}
              onChangeText={(val) => setInput(val)}
            />
          </View>

          <TouchableOpacity onPress={() => commentButtonHandler(input)} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    marginTop: 20,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "turquoise",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
  },

  closeButton: {
    position: "absolute",
    backgroundColor: "red",
    borderRadius: 5,
    right: 2,
  },
  commentsSection: {
    flex: 1,
    width: "100%",
  },
  inputContainer: {
    width: "100%",
  },

  input: {
    backgroundColor: "gainsboro",
    padding: 10,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },

  sendButton: {
    position: "absolute",
    right: 0,
    marginLeft: 10,
  },
});

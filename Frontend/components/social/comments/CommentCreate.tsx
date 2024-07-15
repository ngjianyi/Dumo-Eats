import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { DocumentReference, DocumentData } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { recipeCommentHandler } from "@/utils/social/SocialHandlers";
import { SIZES } from "@/constants/Theme";

type Props = {
  //   recipeRef: DocumentReference<DocumentData, DocumentData>;
  //   getComments: () => Promise<void>;
  commentButtonHandler: (trimmedBody: string) => Promise<void>;
};

export default function CommentCreate({
  //   recipeRef,
  //   getComments,
  commentButtonHandler,
}: Props) {
  const [body, setBody] = useState<string>("");

  //   const commentButtonHandler = async () => {
  //     const trimmedBody = body.trim();
  //     if (trimmedBody) {
  //       setBody("");
  //       await recipeCommentHandler(trimmedBody, recipeRef);
  //       getComments();
  //     } else {
  //       setBody("");
  //     }
  //   };
  const commentHandler = async () => {
    const trimmedBody = body.trim();
    if (trimmedBody) {
      setBody("");
      //   recipeCommentHandler(trimmedBody, recipeRef).then();
      commentButtonHandler(trimmedBody);
      //   getComments();
    } else {
      setBody("");
    }
  };

  return (
    <SafeAreaView style={styles.inputContainer}>
      <View style={styles.input}>
        <View
          style={{
            marginRight: 5,
            width: "100%",
            borderRadius: SIZES.medium,
          }}
        >
          <TextInput
            style={{
              marginRight: 10,
              width: "90%",
              borderRadius: SIZES.medium,
            }}
            placeholder="Add a comment"
            value={body}
            multiline={true}
            onChangeText={(val) => setBody(val)}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          //   onPress={commentButtonHandler}
          onPress={commentHandler}
          style={styles.sendButton}
        >
          <Ionicons name="send" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
    borderRadius: SIZES.medium,
    // flex: 1,
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
    padding: SIZES.small,
  },
});

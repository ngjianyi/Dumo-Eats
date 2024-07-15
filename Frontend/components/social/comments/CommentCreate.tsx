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
import { useState } from "react";
import { DocumentReference, DocumentData } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { recipeCommentHandler } from "@/utils/social/SocialHandlers";
import { SIZES } from "@/constants/Theme";

type Props = {
  recipeRef: DocumentReference<DocumentData, DocumentData>;
};

export default function CommentCreate({ recipeRef }: Props) {
  const [body, setBody] = useState<string>("");

  const commentButtonHandler = () => {
    setBody("");
    recipeCommentHandler(body, recipeRef);
  };

  return (
    <KeyboardAvoidingView style={styles.inputContainer} behavior="position">
      <View style={styles.input}>
        <View
          style={{ marginRight: 5, width: "100%", borderRadius: SIZES.medium }}
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
          onPress={commentButtonHandler}
          style={styles.sendButton}
        >
          <Ionicons name="send" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    borderRadius: SIZES.medium,
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
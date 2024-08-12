import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "@/constants/Theme";

type Props = {
  commentButtonHandler: (trimmedBody: string) => Promise<void>;
};

export default function CommentCreate({ commentButtonHandler }: Props) {
  const [body, setBody] = useState<string>("");

  /**
   * Creates a comment if the body is non-empty
   */
  const commentHandler = async () => {
    const trimmedBody = body.trim();
    if (trimmedBody) {
      setBody("");
      commentButtonHandler(trimmedBody);
    } else {
      setBody("");
    }
  };

  return (
    <SafeAreaView style={styles.inputContainer}>
      <View style={styles.input}>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Add a comment"
            placeholderTextColor="black"
            value={body}
            multiline={true}
            onChangeText={(val) => setBody(val)}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
          />
        </View>

        <TouchableOpacity onPress={commentHandler} style={styles.sendButton}>
          <Ionicons name="send" size={25} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: SIZES.medium,
  },
  input: {
    backgroundColor: COLORS.gray2,
    padding: SIZES.small,
    alignSelf: "center",
    flexDirection: "row",
  },
  textInput: {
    width: "100%",
  },
  sendButton: {
    position: "absolute",
    right: 0,
    padding: SIZES.small,
  },
});

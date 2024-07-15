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

export default function CommentCreate() {
  return (
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

        <TouchableOpacity onPress={onPost} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="black" />
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

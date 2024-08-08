import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Dispatch, SetStateAction } from "react";
import { DocumentReference, DocumentData } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "@/constants/Theme";
import Comment from "./Comment";
import CommentCreate from "./CommentCreate";

type Props = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  commentRefs: DocumentReference<DocumentData, DocumentData>[];
  commentButtonHandler: (trimmedBody: string) => Promise<void>;
};

export default function CommentsList({
  setVisible,
  commentRefs,
  commentButtonHandler,
}: Props) {
  return (
    <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
      <View style={styles.container}>
        <SafeAreaView style={styles.commentBox}>
          <View style={styles.header}>
            <Text style={styles.title}>Comments</Text>

            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={25} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={commentRefs}
              renderItem={({ item }) => <Comment commentRef={item} />}
            />
          </View>

          <CommentCreate commentButtonHandler={commentButtonHandler} />
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "55%",
    marginTop: "auto",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    // flex: 1,
  },
  commentBox: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    marginTop: SIZES.xSmall,
    // width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: SIZES.medium,
  },
  closeButton: {
    position: "absolute",
    right: SIZES.xSmall,
  },
  empty: {
    textAlign: "center",
  },
});

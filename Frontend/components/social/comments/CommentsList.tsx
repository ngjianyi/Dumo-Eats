import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { DocumentReference, DocumentData } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "@/constants/Theme";
import Comment from "./Comment";
import CommentCreate from "./CommentCreate";

type Props = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  commentRefs: DocumentReference<DocumentData, DocumentData>[];
  recipeRef: DocumentReference<DocumentData, DocumentData>;
};

export default function CommentsList({
  setVisible,
  commentRefs,
  recipeRef,
}: Props) {
  return (
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

        <CommentCreate recipeRef={recipeRef} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "55%",
    marginTop: "auto",
    backgroundColor: COLORS.white,
  },
  commentBox: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    marginTop: SIZES.xSmall,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: SIZES.medium,
  },
  closeButton: {
    position: "absolute",
    right: 0,
  },
  empty: {
    textAlign: "center",
  },
});

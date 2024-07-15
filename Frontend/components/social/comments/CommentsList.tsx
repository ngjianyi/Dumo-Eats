import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { COLORS, SIZES } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import Comment from "./Comment";
import { DocumentReference } from "firebase/firestore";

type Props = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  commentRefs: DocumentReference[];
};

export default function CommentsList({ setVisible, commentRefs }: Props) {
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
          {commentRefs ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={commentRefs}
              renderItem={({ item }) => <Comment commentRef={item} />}
            />
          ) : (
            <Text style={styles.empty}>No comments</Text>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "60%",
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

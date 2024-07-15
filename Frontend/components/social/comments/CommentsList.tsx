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
      <SafeAreaView style={styles.detailsContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Comments</Text>

          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.closeBtn}
          >
            <Ionicons name="close" size={25} color="black" />
          </TouchableOpacity>
        </View>

        {commentRefs ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={commentRefs}
            renderItem={({ item }) => <Comment commentRef={item} />}
          />
        ) : (
          <Text style={styles.empty}>No comments</Text>
        )}
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
  detailsContainer: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    margin: SIZES.xSmall,
  },
  closeBtn: {
    paddingRight: SIZES.medium,
  },
  empty: {
    textAlign: "center",
  },
});

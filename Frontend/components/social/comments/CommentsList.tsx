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
import { getDoc, DocumentReference, DocumentData } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "@/constants/Theme";
import Comment from "./Comment";
import CommentCreate from "./CommentCreate";
import { useEffect, useState } from "react";

type Props = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  recipeRef: DocumentReference<DocumentData, DocumentData>;
};

export default function CommentsList({ setVisible, recipeRef }: Props) {
  const [comments, setComments] = useState<
    DocumentReference<DocumentData, DocumentData>[]
  >([]);

  const getRecipeComments = async () => {
    const recipe = await getDoc(recipeRef);
    const data = recipe.data();
    setComments(data?.comments.reverse());
  };

  useEffect(() => {
    getRecipeComments();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
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
              data={comments}
              renderItem={({ item }) => <Comment commentRef={item} />}
            />
          </View>

          <CommentCreate
            recipeRef={recipeRef}
            getComments={getRecipeComments}
          />
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
    borderRadius: SIZES.small, // NEW
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

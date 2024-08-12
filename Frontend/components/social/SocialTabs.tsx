import { Modal, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { DocumentReference, DocumentData } from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SIZES } from "@/constants/Theme";
import CommentsList from "./comments/CommentsList";

type Props = {
  heart: boolean;
  likes: number;
  likeButtonHandler: () => void;
  saved: boolean;
  saveButtonHandler: () => void;
  commentRefs: DocumentReference<DocumentData, DocumentData>[];
  commentButtonHandler: (trimmedBody: string) => Promise<void>;
};

export default function SocialTabs({
  heart,
  likes,
  likeButtonHandler,
  saved,
  saveButtonHandler,
  commentRefs,
  commentButtonHandler,
}: Props) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <View style={styles.footer}>
        <View style={styles.leftFooter}>
          <TouchableOpacity onPress={likeButtonHandler}>
            {heart ? (
              <Ionicons name="heart" size={25} color="red" />
            ) : (
              <Ionicons name="heart-outline" size={25} color="black" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.commentButton}
            onPress={() => setVisible(true)}
          >
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.rightFooter}>
          <TouchableOpacity onPress={saveButtonHandler}>
            {saved ? (
              <Ionicons name="bookmark" size={25} color="gold" />
            ) : (
              <Ionicons name="bookmark-outline" size={25} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.likesContainer}>
        <Text style={styles.likesText}>
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          () => setVisible(false);
        }}
      >
        <CommentsList
          setVisible={setVisible}
          commentRefs={commentRefs}
          commentButtonHandler={commentButtonHandler}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftFooter: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  commentButton: { marginLeft: SIZES.xSmall },
  rightFooter: {
    alignItems: "flex-end",
  },
  likesContainer: { alignItems: "flex-start" },
  likesText: { fontSize: SIZES.medium - 2, color: "black" },
});

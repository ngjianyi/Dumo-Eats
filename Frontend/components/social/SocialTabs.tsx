import { Modal, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { DocumentReference, Timestamp } from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, SIZES } from "@/constants/Theme";
import CommentsList from "./comments/CommentsList";
import { CommentType } from "@/utils/social/SocialTypes";

type Props = {
  heart: boolean;
  saved: boolean;
  likes: number;
  likeButtonHandler: () => void;
  saveButtonHandler: () => void;
  commentRefs: DocumentReference[];
};

export default function SocialTabs({
  heart,
  saved,
  likes,
  likeButtonHandler,
  saveButtonHandler,
  commentRefs,
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
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Ionicons name="chatbubble-outline" size={25} color="black" />
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

      <Text>{likes === 1 ? `${likes} like` : `${likes} likes`}</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          () => setVisible(false);
        }}
      >
        <CommentsList setVisible={setVisible} commentRefs={commentRefs} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    paddingTop: SIZES.xSmall,
  },
  leftFooter: {
    flexDirection: "row",
    width: "25%",
    justifyContent: "space-between",
  },
  rightFooter: {
    flex: 1,
    alignItems: "flex-end",
  },
});

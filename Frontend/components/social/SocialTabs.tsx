import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  DocumentData,
  collection,
  getDocs,
  getDoc,
  DocumentReference,
  FieldValue,
  setDoc,
} from "firebase/firestore";
import { SIZES } from "@/constants/Theme";
import { likeHandler } from "@/utils/social/SocialHandlers";

type Props = {
  heart: boolean;
  setHeart: React.Dispatch<React.SetStateAction<boolean>>;
  saved: boolean;
  setSaved: React.Dispatch<React.SetStateAction<boolean>>;
  likes: number;
  setLikes: React.Dispatch<React.SetStateAction<number>>;
  itemRef: DocumentReference<DocumentData, DocumentData>;
  likeButtonHandler: () => void;
};

export default function SocialTabs({
  heart,
  setHeart,
  saved,
  setSaved,
  likes,
  setLikes,
  itemRef,
  likeButtonHandler,
}: Props) {
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
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="chatbubble-outline" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.rightFooter}>
          <TouchableOpacity onPress={() => setSaved((prev) => !prev)}>
            {saved ? (
              <Ionicons name="bookmark" size={25} color="gold" />
            ) : (
              <Ionicons name="bookmark-outline" size={25} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.caption}>{likes} likes</Text>
        {/* <Text style={styles.caption}>
          <Text style={{ fontWeight: "bold" }}>{item.userName}</Text>
          <Text>{" " + item.caption}</Text>
        </Text> */}
      </View>
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
  description: {},
  caption: {
    // paddingLeft: 5,
  },
});

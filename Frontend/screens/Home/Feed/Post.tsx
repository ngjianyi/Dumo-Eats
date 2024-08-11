import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  getDoc,
  DocumentReference,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";
import { getUserDocSnap } from "@/utils/social/User";
import {
  likeHandler,
  saveHandler,
  commentHandler,
} from "@/utils/social/SocialHandlers";

import { AUTH } from "@/firebaseCONFIG";
import CommentsScreen from "./Comments/CommentsScreen";
import RefreshCommentContext from "@/contexts/RefreshComment";
import RefreshCollectionContext from "@/contexts/RefreshCollection";

import SocialTabs from "@/components/social/SocialTabs";
import { COLORS, SIZES, SHADOWS } from "@/constants/Theme";

const profilepic = require("@/assets/images/defaultProfile.png");

export interface PostItem {
  caption: string;
  image: string;
  time: string;
  likes: string[];
  comments: DocumentReference[];
  postRef: DocumentReference;
  userRef: DocumentReference;
}

interface PostProps {
  item: PostItem;
}

export default function Post({ item }: PostProps) {
  const refreshCommentContext = useContext(RefreshCommentContext);
  const refreshCollectionContext = useContext(RefreshCollectionContext);
  const postref: DocumentReference = item.postRef;
  const [visible, setVisible] = useState<boolean>(false);
  const [comments, setComments] = useState<DocumentReference[]>([]);
  const [likes, setLikes] = useState<number>(0);
  const [heart, setHeart] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const setInitialStates = async () => {
    const updatedDoc: DocumentData | undefined = (await getDoc(postref)).data();
    const docSnap: DocumentSnapshot<DocumentData, DocumentData> =
      await getUserDocSnap();
    const posterRef: DocumentReference = updatedDoc?.userRef;
    const posterDoc: DocumentData | undefined = (
      await getDoc(posterRef)
    ).data();
    setUsername(posterDoc?.userName);
    setImage(posterDoc?.profilePic);
    setLikes(updatedDoc?.likes.length);
    setHeart(updatedDoc?.likes.includes(AUTH.currentUser?.uid));
    if (docSnap.exists()) {
      const refArray: DocumentReference[] = docSnap.data().collection;
      const refStringArray: string[] = refArray.map((ref) => ref.path);
      setSaved(refStringArray.includes(postref.path));
    }
  };

  const getAllComments = async () => {
    const updatedDoc: DocumentData | undefined = (await getDoc(postref)).data();
    setComments(updatedDoc?.comments.reverse());
  };

  // to keep previous state of likes when refreshed / logged in
  // to keep previous state of comments
  useEffect(() => {
    setInitialStates();
    getAllComments();
  }, [refreshCommentContext?.refreshComment]);

  const likeButtonHandler = useCallback(async () => {
    await likeHandler(setHeart, setLikes, postref);
    refreshCommentContext?.setRefreshComment(
      (refreshComment) => !refreshComment
    );
  }, []);

  const saveButtonhandler = useCallback(async () => {
    await saveHandler(setSaved, postref, "collection");
    refreshCollectionContext?.setRefreshCollection(
      (refreshCollection) => !refreshCollection
    );
    refreshCommentContext?.setRefreshComment(
      (refreshComment) => !refreshComment
    );
  }, []);

  const commentButtonHandler = useCallback(
    async (trimmedBody: string): Promise<void> => {
      await commentHandler(trimmedBody, postref, "PostsComments");
      refreshCommentContext?.setRefreshComment(
        (refreshComment) => !refreshComment
      );
    },
    []
  );

  return (
    <View style={styles.container}>
      {/* <View>
        <Modal visible={visible}>
          <CommentsScreen
            item={item}
            visible={visible}
            setVisible={setVisible}
            comments={comments}
          />
        </Modal>
      </View> */}
      {/* <View style={styles.header}>
        <View style={styles.userinfo}>
          {image != "" ? (
            <Image source={{ uri: image }} style={styles.profilePic} />
          ) : (
            <Image source={profilepic} style={styles.profilePic} />
          )}
          <View>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.username}>{item.time}</Text>
          </View>
        </View>
      </View>
      <View style={styles.imageHolder}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View> */}
      {/* <View style={styles.footer}>
        <View style={styles.leftFooter}>
          <TouchableOpacity onPress={likeButtonHandler}>
            {heart ? (
              <Ionicons name="heart" size={40} color="red" />
            ) : (
              <Ionicons name="heart-outline" size={40} color="black" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Ionicons name="chatbubble-outline" size={35} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.rightFooter}>
          <TouchableOpacity onPress={saveButtonhandler}>
            {saved ? (
              <Ionicons name="bookmark" size={35} color="magenta" />
            ) : (
              <Ionicons name="bookmark-outline" size={35} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={[styles.caption, { color: "green", marginBottom: 3 }]}>
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </Text>
        <Text style={styles.caption}>
          <Text style={{ fontWeight: "bold" }}>{username}</Text>
          <Text>{" " + item.caption}</Text>
        </Text>
      </View> */}
      <View style={styles.header}>
        <Image
          source={image ? { uri: image } : profilepic}
          style={styles.profilePic}
        />

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{username}</Text>
          <Text style={styles.headerText}>{item.time}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.usernameText}>{username}</Text>
        <Text style={styles.descriptionText}>{item.caption}</Text>
      </View>

      <View style={styles.socialsContainer}>
        <SocialTabs
          heart={heart}
          likes={likes}
          likeButtonHandler={likeButtonHandler}
          saved={saved}
          saveButtonHandler={saveButtonhandler}
          commentRefs={comments}
          commentButtonHandler={commentButtonHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // marginVertical: 10,
    marginHorizontal: SIZES.xSmall,
    backgroundColor: COLORS.lightWhite,
    marginBottom: SIZES.xSmall,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    // shadowColor: COLORS.white,
    shadowColor: "black",
  },

  header: {
    flexDirection: "row",
    // margin: SIZES.xSmall / 2,
    padding: SIZES.xSmall / 2,

    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // // width: "95%",
    // marginBottom: 0,
    // backgroundColor: "aliceblue",
    // borderWidth: 1,
    // borderBottomWidth: 0,
  },
  profilePic: {
    // borderRadius: 50,
    // height: 40,
    // width: 40,
    // marginLeft: 5,
    height: SIZES.xxLarge,
    width: SIZES.xxLarge,
    borderRadius: SIZES.xxLarge / 2,
  },
  headerTextContainer: {
    marginLeft: SIZES.xSmall,
  },
  headerText: { fontSize: SIZES.medium - 2, color: "black" },
  imageContainer: {
    aspectRatio: 1.4,
    // aspectRatio: 1.5
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  descriptionContainer: {
    flexDirection: "row",
    // marginHorizontal: SIZES.xSmall / 2,
    // marginTop: SIZES.xSmall / 2,
    paddingHorizontal: SIZES.xSmall / 2,
    paddingTop: SIZES.xSmall / 2,

    // backgroundColor: "lavenderblush",
  },
  usernameText: { fontSize: SIZES.medium - 2, fontWeight: "600" },
  descriptionText: { marginLeft: SIZES.xSmall / 2, fontSize: SIZES.medium - 2 },
  socialsContainer: {
    // marginHorizontal: SIZES.xSmall / 2,
    // marginBottom: SIZES.xSmall / 2,
    paddingHorizontal: SIZES.xSmall / 2,
    paddingBottom: SIZES.xSmall / 2,
    // backgroundColor: "lavenderblush",
  },

  // username: {
  //   marginLeft: 5,
  // },

  // userinfo: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginVertical: 5,
  // },
  // imageHolder: {
  //   flex: 1,
  //   aspectRatio: 1.5,
  //   // width: "95%",
  //   alignItems: "center",
  //   borderWidth: 1,
  // },

  // footer: {
  //   flexDirection: "row",
  //   backgroundColor: "lavenderblush",
  //   // width: "95%",
  //   borderWidth: 1,
  //   borderBottomWidth: 0,
  // },

  // leftFooter: {
  //   paddingVertical: 5,
  //   flexDirection: "row",
  //   width: "25%",
  //   justifyContent: "space-between",
  // },

  // rightFooter: {
  //   flex: 1,
  //   paddingVertical: 5,
  //   alignItems: "flex-end",
  // },

  // description: {
  //   width: "95%",
  //   backgroundColor: "lavenderblush",
  //   borderWidth: 1,
  //   borderTopWidth: 0,
  // },

  // caption: {
  //   paddingLeft: 5,
  // },
});

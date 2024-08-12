import { Text, View, StyleSheet, Image } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
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
import RefreshCommentContext from "@/contexts/RefreshComment";
import RefreshCollectionContext from "@/contexts/RefreshCollection";

import SocialTabs from "@/components/social/SocialTabs";
import { COLORS, SIZES } from "@/constants/Theme";

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
  const [comments, setComments] = useState<DocumentReference[]>([]);
  const [likes, setLikes] = useState<number>(0);
  const [heart, setHeart] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  /**
   * Function updates the existing state of likes, comments for each
   * uploaded post on feed
   */
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
      <View style={styles.descriptionContainer}>
        <Text style={styles.usernameText}>{username}</Text>
        <Text style={styles.descriptionText}>{item.caption}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.xSmall,
    backgroundColor: COLORS.lightWhite,
    marginBottom: SIZES.xSmall,
    borderRadius: SIZES.small,
  },

  header: {
    flexDirection: "row",
    padding: SIZES.xSmall / 2,
  },
  profilePic: {
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
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  descriptionContainer: {
    flexDirection: "row",
    paddingHorizontal: SIZES.xSmall / 2,
    paddingBottom: SIZES.xSmall / 2,
  },
  usernameText: { fontSize: SIZES.medium - 2, fontWeight: "600" },
  descriptionText: { marginLeft: SIZES.xSmall / 2, fontSize: SIZES.medium - 2 },
  socialsContainer: {
    paddingTop: SIZES.xSmall / 2,
    paddingHorizontal: SIZES.xSmall / 2,
  },
});

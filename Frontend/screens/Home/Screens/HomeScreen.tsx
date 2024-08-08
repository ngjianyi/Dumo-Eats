import {
  Modal,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import ProgressTracker from "../CalorieTracker/ProgressTracker";
import {
  DocumentData,
  collection,
  getDocs,
  QuerySnapshot,
  CollectionReference,
} from "firebase/firestore";
import { DATA_BASE } from "@/firebaseCONFIG";
import Feed from "../Feed/Feed";
import AutoRefresh from "@/contexts/AutoRefresh";
import CreatePostScreen from "./CreatePostScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PostItem } from "../Feed/Post";
import { getUserDocSnap } from "@/utils/social/User";
import { COLORS, SIZES } from "@/constants/Theme";

export default function HomeScreen() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [upload, setUpload] = useState<boolean>(false);

  const uploadHandler = () => {
    setUpload(!upload);
  };

  const autoRefreshcontext = useContext(AutoRefresh);

  useEffect(() => {
    setLoading(true);
    setPosts([]);
    getAllPosts();
  }, [refresh, autoRefreshcontext?.autoRefresh]);

  const getAllPosts = async () => {
    setLoading(true);
    setPosts([]);
    //get all documents which points to subcollection inside main 'Posts' collection
    const querySnapshot: QuerySnapshot<DocumentData, DocumentData> =
      await getDocs(collection(DATA_BASE, "Posts"));
    const docSnap = await getUserDocSnap();
    //for each document reference
    const following: string[] = docSnap.data()?.following;
    querySnapshot.forEach(async (document) => {
      //for each subcollection, only take documents of subcollection if id of subcollection is inside following
      if (following.includes(document.id)) {
        const ref: CollectionReference = collection(
          DATA_BASE,
          "Posts",
          "" + document.id,
          document.id + "'s posts"
        );
        const querySnapshotSubcollection: QuerySnapshot<
          DocumentData,
          DocumentData
        > = await getDocs(ref);
        querySnapshotSubcollection.forEach((subdoc) => {
          setPosts((currentPosts) => [
            ...currentPosts,
            subdoc.data() as PostItem,
          ]);
        });
      } else {
        console.log("not a friend");
      }
    });
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={{ fontSize: 18 }}>Today's progress</Text>
      </View> */}

      {/* <View style={styles.progress}>
        <Text style={styles.calories}>Calories (Kcal):</Text>
        <View style={styles.bar}>
          <ProgressTracker />
        </View>
      </View> */}

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {new Date(Date.now()).toDateString()}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <ProgressTracker />
      </View>

      <View style={styles.postsTextContainer}>
        <Text style={styles.postsText}>Posts</Text>

        <TouchableOpacity style={styles.postsButton} onPress={uploadHandler}>
          <Ionicons name="create-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      {!loading ? (
        <Feed posts={posts} getAllPosts={getAllPosts} />
      ) : (
        <ActivityIndicator size="large" color={COLORS.tertiary} />
      )}

      {/* <View style={styles.header}>
        <Text style={{ fontSize: 18 }}>Feed</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => setRefresh(!refresh)}>
            <Ionicons name="refresh-sharp" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.upload} onPress={uploadHandler}>
            <Text style={{ fontSize: 18, color: "white" }}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {loading ? <ActivityIndicator color="blue" size="large" /> : true}
      </View>
      <Feed posts={posts} /> */}
      <Modal
        visible={upload}
        animationType="slide"
        onRequestClose={() => {
          () => setUpload(false);
        }}
      >
        <CreatePostScreen
          upload={upload}
          setUpload={setUpload}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    margin: SIZES.xSmall,
    marginBottom: SIZES.xSmall / 2,
    alignItems: "center",
  },
  headerText: { fontSize: SIZES.xLarge, fontWeight: "500" },
  progressContainer: {
    backgroundColor: COLORS.lightWhite,
    marginHorizontal: SIZES.xSmall,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
  },
  postsTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: SIZES.xSmall,
    marginVertical: SIZES.xSmall,
  },
  postsText: { fontSize: SIZES.xLarge, fontWeight: "400" },
  postsButton: {
    backgroundColor: COLORS.blue,
    padding: SIZES.xSmall / 2,
    borderRadius: SIZES.large / 2,
  },

  // header: {
  //   flexDirection: "row",
  //   marginTop: 20,
  //   backgroundColor: "turquoise",
  //   padding: 8,
  //   marginHorizontal: 14,
  //   borderRadius: 10,
  //   marginBottom: 20,
  //   alignItems: "center",
  // },

  // progress: {
  //   backgroundColor: "lightgrey",
  //   borderRadius: 20,
  //   marginVertical: 20,
  //   marginHorizontal: 14,
  // },

  // calories: {
  //   fontSize: 15,
  //   paddingLeft: 18,
  //   marginVertical: 10,
  // },

  // bar: {
  //   paddingHorizontal: 15,
  //   marginBottom: 20,
  // },

  // button: {
  //   flexDirection: "row",
  //   position: "absolute",
  //   right: 3,
  //   alignItems: "center",
  // },

  // uploadButton: {
  //   flex: 1,
  //   alignItems: "flex-end",
  // },

  // upload: {
  //   backgroundColor: "green",
  //   borderRadius: 5,
  //   padding: 3,
  // },
});

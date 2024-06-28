import {ScrollView, Modal, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import ProgressTracker from "@/components/ProgressTracker";
import UpdateScreen from "./UpdateScreen";
//redux imports
import { connect } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit";
import { fetchUserData } from "@/redux/action";
import { doc, DocumentData, collection, getDocs, getDoc, query, where } from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import Feed from "@/components/Feed";
import AutoRefresh from "@/contexts/AutoRefresh"
import CreatePostScreen from "./CreatePostScreen";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreen() {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(false);

  // const refreshHandler = () => {
  //   setRefresh(!refresh)
  // };
  const autoRefreshcontext = useContext(AutoRefresh)
  const uploadHandler = () => {
    setUpload(!upload)

  }

  //to retrieve  All posts from data base collection "Posts"
  //autoRefreshContext is for adding new users as friends
  
  useEffect(() => {
    setLoading(true)
    setPosts([])
    getAllPosts();
  },[refresh, autoRefreshcontext?.autoRefresh])

  

  //
  const getAllPosts = async () => {
    setLoading(true)
    setPosts([])
    //get all documents which points to subcollection inside main 'Posts' collection
    const querySnapshot = await getDocs(collection(DATA_BASE, "Posts"));
    const docRefUser = doc(DATA_BASE, "Users", ""+ AUTH.currentUser?.uid);
    const docSnap = await getDoc(docRefUser);
    const name = docSnap.data()?.userName;
    //for each document reference
    const following = docSnap.data()?.following;
    console.log(following)
    querySnapshot.forEach(async (document) => {        
        //for each subcollection, only take documents of subcollection if id of subcollection is inside following
        if (following.includes(document.id)) {
          const ref = collection(DATA_BASE, "Posts", "" + document.id, document.id + "'s posts")
          const querySnapshotSubcollection = await getDocs(ref);
          querySnapshotSubcollection.forEach((subdoc) => {
          console.log(document.id + "=>", subdoc.data())
          setPosts(currentPosts => [...currentPosts, subdoc.data()])
        }) 
        } else {
          console.log("not a friend")
        }
        
        // const subCollectionDocRef = doc(DATA_BASE, "Posts", document.id);
        // const subcollectionRef = collection(subCollectionDocRef, value.userName +"'s posts")

    })
    setLoading(false);
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 18 }}>Today's progress</Text>
        </View>
        <View style={styles.progress}>
          <Text style={styles.calories}>Calories (Kcal):</Text>
          <View style={styles.bar}><ProgressTracker/></View>
        </View>

        <View style={styles.header}>
          <Text style={{ fontSize: 18, }}>Feed</Text>
          <View style ={styles.button}>
              <TouchableOpacity onPress={() => setRefresh(!refresh)}>
                <Ionicons name="refresh-sharp" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.upload} onPress={uploadHandler}>
                <Text style={{ fontSize: 18, color:"white" }}>Upload</Text>
              </TouchableOpacity>
          </View>
          
        </View>
        <View>
          {loading ? <ActivityIndicator color="blue" size="large"/> : true}
        </View>
        <Feed posts={posts}/>
        <Modal visible={upload}>
          <CreatePostScreen upload={upload} setUpload={setUpload} refresh={refresh} setRefresh={setRefresh}/>
        </Modal>
      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "turquoise",
    padding: 8,
    marginHorizontal: 14,
    borderRadius: 10,
    marginBottom: 20,
    alignItems:"center"
  },

  progress: {
    backgroundColor: "lightgrey",
    borderRadius: 20,
    marginVertical: 20,
    marginHorizontal: 14,
  },

  calories: {
    fontSize: 15,
    paddingLeft: 18,
    marginVertical: 10,
  },

  bar: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  button: {
    flexDirection:"row",
    position:"absolute",
    right: 3,
    alignItems:"center",
  },

  uploadButton: {
    flex: 1,
    alignItems:"flex-end"
  },

  upload: {
    backgroundColor:"green",
    borderRadius: 5,
    padding: 3,
  },

  feed: {

  }
});

import {ScrollView, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import ProgressTracker from "@/components/ProgressTracker";
import UpdateScreen from "./UpdateScreen";
//redux imports
import { connect } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit";
import { fetchUserData } from "@/redux/action";
import { doc, DocumentData, collection, getDocs, getDoc } from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import Feed from "@/components/Feed";


export default function HomeScreen() {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const refreshHandler = () => {
    setRefresh(!refresh)
  };

  //to retrieve  All posts from data base collection "Posts"
  useEffect(() => {
    setLoading(true)
    setPosts([])
    getAllPosts();
    setLoading(false);
  },[refresh])

  const getAllPosts = async () => {
    setLoading(true)
    //get all documents which points to subcollection inside main 'Posts' collection
    const querySnapshot = await getDocs(collection(DATA_BASE, "Posts"));
    const docRefUser = doc(DATA_BASE, "Users", ""+ AUTH.currentUser?.uid);
    const docSnap = await getDoc(docRefUser);
    const name = docSnap.data()?.userName;
    //for each document reference
    const counter = 0
    querySnapshot.forEach(async (document) => {        
        //for each subcollection, display all posts
        const querySnapshotSubcollection = await getDocs(collection(DATA_BASE, "Posts", "" + document.id, name + "'s posts"));
        querySnapshotSubcollection.forEach((subdoc) => {
          console.log(document.id + "=>", subdoc.data())
          setPosts(currentPosts => [...currentPosts, subdoc.data()])
        }) 
    })
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
          <View style={styles.refreshButton}>
            <TouchableOpacity style={styles.refresh} onPress={refreshHandler}>
              <Text style={{ fontSize: 18, color:"white" }}>Refresh</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {loading ? <ActivityIndicator color="blue" size="large"/> : true}
        </View>
        <Feed posts={posts}/>
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

  refreshButton: {
    flex: 1,
    alignItems:"flex-end"
  },

  refresh: {
    backgroundColor:"maroon",
    borderRadius: 5,
    padding: 3,
  },

  feed: {

  }
});

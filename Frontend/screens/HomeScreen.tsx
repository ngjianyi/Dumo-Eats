import {ScrollView, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import ProgressTracker from "@/components/ProgressTracker";
import UpdateScreen from "./UpdateScreen";
//redux imports
import { connect } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit";
import { fetchUserData } from "@/redux/action";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import Feed from "@/components/Feed";


export default function HomeScreen() {
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const refreshHandler = () => setRefresh(true);
  //to retrieve  All posts from data base collection "Posts"
  useEffect(() => {getAllPosts();},[refresh])

  const getAllPosts = async () => {
    setLoading(true)
    setPosts([])
    //get all documents which points to subcollection inside main 'Posts' collection
    const querySnapshot = await getDocs(collection(DATA_BASE, "Posts"));
    //for each document reference
    querySnapshot.forEach(async (doc) => {
        // console.log(doc.id)
        //for each subcollection, display all posts
        const querySnapshotSubcollection = await getDocs(collection(DATA_BASE, "Posts", "" + doc.id, "Gojo's posts"));
        querySnapshotSubcollection.forEach((subdoc) => {
          console.log(doc.id + "=>", subdoc.data())
          setPosts(currentPosts => [...currentPosts, subdoc.data()])
        })
        setRefresh(false)
      setLoading(false);
  })};

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

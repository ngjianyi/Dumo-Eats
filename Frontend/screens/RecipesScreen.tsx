import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    FlatList,
  } from "react-native";
  import React, { useState } from "react";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
  import Recipe from "@/components/Recipes";
  export default function RecipesScreen() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <View style={styles.searchHeader}>
            <View style={styles.subHeader}>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={30} color="black" />
                <TextInput
                  style={styles.input}
                  placeholder="Search for your favourite recipes!"
                  placeholderTextColor={"grey"}
                />
              </View>
              <View style={styles.headerButtons}>
                <TouchableOpacity style={styles.slider}>
                  <FontAwesome6 name="sliders" size={36} color="black" />
                </TouchableOpacity>
                <View style={styles.cameraView}>
                  <TouchableOpacity style={styles.camera}>
                    <Ionicons name="camera-outline" size={55} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <Recipe />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    list: {
      flex: 1,
    },
  
    searchHeader: {
      backgroundColor: "lightskyblue",
      borderRadius: 20,
      marginVertical: 20,
      marginHorizontal: 14,
      alignItems: "center",
    },
  
    subHeader: {
      width: "85%",
    },
  
    input: {
      padding: 10,
      fontSize: 16,
    },
  
    searchBar: {
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 10,
      marginTop: 10,
      borderRadius: 20,
    },
  
    headerButtons: {
      marginVertical: 20,
      flexDirection: "row",
      alignItems: "center",
    },
  
    slider: {
      justifyContent: "center",
    },
  
    cameraView: {
      marginLeft: "30%",
    },
  
    camera: {
      backgroundColor: "white",
      borderRadius: 160,
      width: 70,
      height: 70,
      alignItems: "center",
      justifyContent: "center",
    },
  
    recipeItem: {
      flex: 1,
      backgroundColor: "coral",
      marginVertical: 5,
      borderRadius: 20,
      marginHorizontal: 14,
      justifyContent: "center",
    },
  
    content: {
      flexDirection: "row",
      marginVertical: 20,
      alignItems: "center",
      marginLeft: 30,
      justifyContent: "space-between",
    },
  
    image: {
      backgroundColor: "white",
      marginRight: "10%",
    },
  
    name: {
      fontSize: 25,
      fontStyle: "italic",
      color: "teal",
      marginLeft: 0,
    },
  
    buttons: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginBottom: 10,
    },
    healthy: {
      borderRadius: 20,
      backgroundColor: "lightgreen",
      padding: 10,
    },
    unhealthy: {
      borderRadius: 20,
      backgroundColor: "red",
      padding: 7,
    },
  });
  
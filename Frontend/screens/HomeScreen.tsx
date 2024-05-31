import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import ProgressTracker from "@/components/ProgressTracker";
import UpdateScreen from "./UpdateScreen";

export default function HomeScreen() {
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
        <Text style={{ fontSize: 18 }}>Feed</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    marginTop: 20,
    backgroundColor: "turquoise",
    padding: 8,
    marginHorizontal: 14,
    borderRadius: 10,
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
});

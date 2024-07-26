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
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  DimensionValue,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AUTH, DATA_BASE, STORAGE } from "@/firebaseCONFIG";
import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import * as Progress from "react-native-progress";

interface props {
  calorie: number;
  prog: number;
  yLabel: string;
}
const getWidth = (prog: number): DimensionValue | undefined => {
  if (prog > 1) {
    prog = 1;
  }
  const numString: string = String(prog * 100);
  const width: DimensionValue | undefined = `${numString}%` as DimensionValue;
  return width;
};

export default function CalorieBar({ calorie, prog, yLabel }: props) {
  return (
    <View style={styles.container}>
      <View style={{ marginRight: 20, marginLeft:10, }}>
        <Text style={styles.word}>{yLabel}</Text>
      </View>
      <View style={{ width: getWidth(prog) }}>
        <Progress.Bar
          progress={1}
          width={null}
          height={20}
          borderRadius={10}
          color="dodgerblue"
        />
      </View>
      <View style={{ marginLeft: 5 }}>
        <Text style={styles.word}>{calorie}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  word: {
    fontSize: 14,
    color: "black",
    
  },

  barContainer: {
    width: "80%",
  },
});

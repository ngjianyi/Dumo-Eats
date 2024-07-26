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
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AUTH, DATA_BASE, STORAGE } from "@/firebaseCONFIG";
import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import CalorieBar from "./CalorieBar";
interface props {
  widthArray: number[];
  dateArray: string[];
  calorieArray: number[];
}
export default function CalorieGraph({
  widthArray,
  dateArray,
  calorieArray,
}: props) {
  return (
    <View style={styles.container}>
      <CalorieBar
        calorie={calorieArray[6]}
        prog={widthArray[6]}
        yLabel={dateArray[6]}
      />
      <CalorieBar
        calorie={calorieArray[5]}
        prog={widthArray[5]}
        yLabel={dateArray[5]}
      />
      <CalorieBar
        calorie={calorieArray[4]}
        prog={widthArray[4]}
        yLabel={dateArray[4]}
      />
      <CalorieBar
        calorie={calorieArray[3]}
        prog={widthArray[3]}
        yLabel={dateArray[3]}
      />
      <CalorieBar
        calorie={calorieArray[2]}
        prog={widthArray[2]}
        yLabel={dateArray[2]}
      />
      <CalorieBar
        calorie={calorieArray[1]}
        prog={widthArray[1]}
        yLabel={dateArray[1]}
      />
      <CalorieBar
        calorie={calorieArray[0]}
        prog={widthArray[0]}
        yLabel={dateArray[0]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "lavenderblush",
    marginHorizontal:15,
    borderRadius:15,
  },

  
});

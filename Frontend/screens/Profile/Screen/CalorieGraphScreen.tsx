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
import Ionicons from "@expo/vector-icons/Ionicons";
import { Timestamp } from "firebase/firestore";
import CalorieGraph from "../Graph/CalorieGraph";
import {
  doc,
  DocumentData,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { getUserDocSnap, getUserRef } from "@/utils/social/User";
import { Dates } from "@/utils/functions/Dates";
import { dateFormat } from "@/utils/functions/dateFormat";
interface props {
  setGraph: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CalorieGraphScreen({ setGraph }: props) {
  const [dateArray, setDateArray] = useState<string[]>([]);
  const [calorieArray, setCalorieArray] = useState<number[]>([]);
  const [widthArray, setWidthArray] = useState<number[]>([]);

  const getData = async () => {
    const dates = Dates();
    const caloriesArray: number[] = [];
    const widthsArray: number[] = [];
    const userDocSnap = await getUserDocSnap();
    let max = 0;
    const map = userDocSnap.data()?.calorieHistory;
    for (let i = 0; i < 7; i += 1) {
      try {
        const calories: number | undefined = map[dates[i]];
        
        if (calories != undefined) {
          widthsArray.push(calories);
          caloriesArray.push(calories);
          max = Math.max(calories, max);
        } else {
          caloriesArray.push(0);
          widthsArray.push(0);
        }
      } catch (error: any) {
        console.log(error);
      }
    }

    max = Math.floor(max * 1.5);
    const progArray = widthsArray.map((x) => x / max);
    setCalorieArray(caloriesArray);
    setWidthArray(progArray);
    setDateArray(dateFormat(dates));
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly calorie record</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setGraph(false)}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <CalorieGraph
        widthArray={widthArray}
        dateArray={dateArray}
        calorieArray={calorieArray}
      />
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
    backgroundColor: "blue",
    padding: 8,
    marginHorizontal: 14,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  closeButton: {
    position: "absolute",
    left: 4,
  },

  
});

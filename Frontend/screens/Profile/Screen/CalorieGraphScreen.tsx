import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import CalorieGraph from "../Graph/CalorieGraph";
import { getUserDocSnap } from "@/utils/social/User";
import { Dates } from "@/utils/functions/Dates";
import { dateFormat } from "@/utils/functions/dateFormat";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";

import { COLORS, SIZES } from "@/constants/Theme";

interface props {
  setGraph: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CalorieGraphScreen({ setGraph }: props) {
  const [dateArray, setDateArray] = useState<string[]>([]);
  const [calorieArray, setCalorieArray] = useState<number[]>([]);
  const [widthArray, setWidthArray] = useState<number[]>([]);

  const getData = async () => {
    const dates: string[] = Dates();
    const caloriesArray: number[] = [];
    const widthsArray: number[] = [];
    const userDocSnap: DocumentSnapshot<DocumentData, DocumentData> =
      await getUserDocSnap();
    let max: number = 0;
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
    const progArray: number[] = widthsArray.map((x) => x / max);
    setCalorieArray(caloriesArray);
    setWidthArray(progArray);
    setDateArray(dateFormat(dates));
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setGraph(false)}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Calories in the last 7 days</Text>
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
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: SIZES.medium,
    margin: SIZES.xSmall,
  },
  closeButton: { position: "absolute", left: SIZES.small },
  headerText: {
    fontSize: SIZES.xLarge,
    fontWeight: "700",
    color: "black",
    marginVertical: SIZES.xSmall / 4,
  },
});

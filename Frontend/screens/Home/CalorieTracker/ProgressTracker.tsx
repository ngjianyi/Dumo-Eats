import UpdateCaloriesScreen from "@/screens/Home/CalorieTracker/UpdateCaloriesScreen";
import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import * as Progress from "react-native-progress";
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import CalorieGoal from "@/contexts/CalorieGoal";
import RefreshCalorieContext from "@/contexts/RefreshCalorie";
import moment from "moment";
import { getUserDocSnap, getUserRef } from "@/utils/social/User";

export default function ProgressTracker() {
  const docref: DocumentReference<DocumentData, DocumentData> = getUserRef()
  const refreshCalorieContext = useContext(RefreshCalorieContext);
  const [currentCal, setCal] = useState<number>(0);
  const [prog, setProg] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const calorieContext = useContext(CalorieGoal);

  const getCalorieProgress = async () => {
    const docsnap = await getUserDocSnap()
    calorieContext?.setCalorie(docsnap.data()?.calorieGoal);
    const targetGoal: number = docsnap.data()?.calorieGoal;
    const curr: number = docsnap.data()?.currentCalorie;
    setCal(curr);
    const ratio: number =
      calorieContext?.calorie != undefined ? curr / targetGoal : 0;
    if (isNaN(ratio)) {
      return;
    } else {
      setProg(ratio);
    }
  };

  const resetHandler = async () => {
    const date: string = moment().format("LL"); // Jul 24, 2024
    await updateDoc(docref, {
      currentCalorie: 0,
      [`calorieHistory.${date}`]: 0
    });
    setCal(0);
    setProg(0);
  };

  const autoReset = async () => {
    const docsnap : DocumentSnapshot<DocumentData, DocumentData> = await getUserDocSnap();
    const streakArray: string[] = docsnap.data()?.streak;
    if (docsnap.data()?.currentCalorie == 0) {
      return;
    }
    if (streakArray == undefined) {
      return;
    }
    const lastUploadDay: string = docsnap.data()?.lastUpdatedAt;
    const todayDate: string = moment().format("LL"); // July 24, 2024
    if (todayDate != lastUploadDay) {
      resetHandler();
    }
  };

  useEffect(() => {
    getCalorieProgress();
    autoReset();
  }, [refreshCalorieContext?.refreshCalorie]);

  const modalHandler = () => {
    setOpen(!open);
  };

  return (
    <View>
      <Progress.Bar
        progress={prog}
        width={null}
        height={30}
        borderRadius={20}
        aria-label="caloriebar"
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetHandler}
          aria-label="ResetButton"
        >
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={modalHandler}
          aria-label="UpdateButton"
        >
          <Text style={styles.update}>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detail}>
        <Text style={styles.amount}>
          {currentCal} / {calorieContext?.calorie}
        </Text>
      </View>

      <Modal visible={open}>
        <UpdateCaloriesScreen modalHandler={modalHandler} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
  },

  updateButton: {
    backgroundColor: "lightblue",
    marginRight: 10,
    padding: 6,
    marginTop: 10,
    borderRadius: 10,
    position: "absolute",
    right: 0,
  },

  resetButton: {
    backgroundColor: "red",
    marginRight: 10,
    padding: 6,
    marginTop: 10,
    borderRadius: 10,
  },

  reset: {
    fontSize: 15,
    paddingHorizontal: 8,
    color: "white",
  },

  update: {
    fontSize: 15,
  },

  amount: {
    marginTop: 10,
    color: "mediumblue",
  },
  detail: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

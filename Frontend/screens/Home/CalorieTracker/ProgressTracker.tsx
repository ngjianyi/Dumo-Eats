import UpdateCaloriesScreen from "@/screens/Home/CalorieTracker/UpdateCaloriesScreen";
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
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
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS, SIZES } from "@/constants/Theme";

export default function ProgressTracker() {
  const docref: DocumentReference<DocumentData, DocumentData> = getUserRef();
  const refreshCalorieContext = useContext(RefreshCalorieContext);
  const [currentCal, setCal] = useState<number>(0);
  const [prog, setProg] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const calorieContext = useContext(CalorieGoal);

  /**
   * Retrieves current calorie from firestore and sets the
   * ratio for progress bar
   */
  const getCalorieProgress = async () => {
    const docsnap = await getUserDocSnap();
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

  /**
   * Function that allow users to manually reset calories
   */
  const resetHandler = async () => {
    Alert.alert(
      "Reset Calories",
      "Click confirm to reset your calories for today",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
        },
        {
          text: "Confirm",
          onPress: async () => {
            const date: string = moment().format("LL"); // Jul 24, 2024
            await updateDoc(docref, {
              currentCalorie: 0,
              [`calorieHistory.${date}`]: 0,
            });
            setCal(0);
            setProg(0);
          },
        },
      ]
    );
  };
  /**
   * Function that automatically resets calories for progressbar
   * whenever a user logs in on a new day
   */
  const autoReset = async () => {
    const docsnap: DocumentSnapshot<DocumentData, DocumentData> =
      await getUserDocSnap();
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
      await updateDoc(docref, {
        currentCalorie: 0,
      });
      setCal(0);
      setProg(0);
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
      <View style={styles.calorieContainer}>
        <Text style={styles.caloriesText}>
          Calories: {currentCal} / {calorieContext?.calorie} kcal
        </Text>
        <Text style={styles.caloriesText}>
          {calorieContext?.calorie
            ? `${Math.ceil((currentCal / calorieContext?.calorie) * 100)}%`
            : "Error"}
        </Text>
      </View>

      <Progress.Bar
        progress={prog}
        width={null}
        height={SIZES.medium * 2}
        borderRadius={SIZES.medium}
        color={COLORS.blue}
        borderColor={COLORS.blue}
        aria-label="caloriebar"
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetHandler}
          aria-label="ResetButton"
        >
          <Ionicons name="reload" size={SIZES.xLarge} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={modalHandler}
          aria-label="UpdateButton"
        >
          <AntDesign name="plus" size={SIZES.xLarge} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={open}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          () => setOpen(false);
        }}
      >
        <UpdateCaloriesScreen modalHandler={modalHandler} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  calorieContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZES.xSmall / 2,
  },
  caloriesText: {
    fontSize: SIZES.medium,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: SIZES.xSmall / 2,
  },
  resetButton: {
    backgroundColor: COLORS.tertiary,
    padding: SIZES.xSmall / 2,
    borderRadius: SIZES.xLarge / 2 + SIZES.xSmall / 2,
    marginRight: SIZES.xSmall,
  },
  updateButton: {
    backgroundColor: COLORS.blue,
    padding: SIZES.xSmall / 2,
    borderRadius: SIZES.xLarge / 2 + SIZES.xSmall / 2,
  },
});

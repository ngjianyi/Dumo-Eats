import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useContext } from "react";
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import RefreshBadgeContext from "@/contexts/RefreshBadge";
import RefreshCalorieContext from "@/contexts/RefreshCalorie";
import { getUserDocSnap, getUserRef } from "@/utils/social/User";
import moment from "moment";

import { COLORS, SIZES } from "@/constants/Theme";

export const checkStreak = (prev: string, curr: string): boolean => {
  const array1: string[] = prev.split("/");
  const array2: string[] = curr.split("/");
  const month1: number = Number(array1[0]);
  const month2: number = Number(array2[0]);
  const day1: number = Number(array1[1]);
  const day2: number = Number(array2[1]);
  const year1: number = Number(array1[2]);
  const year2: number = Number(array2[2]);
  const thirty: number[] = [4, 6, 9, 11];
  //same month
  if (year1 != year2) {
    return false;
  }
  //same month
  else if (month1 == month2 && day2 > day1) {
    return day2 - day1 == 1;
    //end of 30 days month
  } else if (thirty.includes(month1) && day1 == 30) {
    return day2 == 1 && month2 - month1 == 1;
    //end of feb
  } else if (month1 == 2 && day1 == 28) {
    return day2 == 1 && month2 - month1 == 1;
    //end of year
  } else if (month1 == 12 && day1 == 31) {
    return day2 == 1 && month2 == 1;
    //end of 31 days month
  } else if (day1 == 31) {
    return day2 == 1 && month2 - month1 == 1;
  } else {
    return false;
  }
};

let updateCalories: (x: string) => void = (x) => {};

export default function UpdateCaloriesScreen({ modalHandler }: any) {
  const [calories, setCalories] = useState<number>(0);
  const refreshBadgeContext = useContext(RefreshBadgeContext);
  const refreshCalorieContext = useContext(RefreshCalorieContext);
  const userRef: DocumentReference<DocumentData, DocumentData> = getUserRef();

  updateCalories = (input: string) => {
    if (isNaN(Number(input)) || Number(input) < 0) {
      alert("Error, input needs to be a number and greater than 0");
    } else {
      setCalories(Number(input));
    }
  };

  const submitCalories = async () => {
    modalHandler();
    const doc: DocumentData | undefined = (await getUserDocSnap()).data();
    const curr: number = doc?.currentCalorie;
    const targetGoal: number = doc?.calorieGoal;
    const date: string = moment().format("LL"); // Jul 24, 2024
    await updateDoc(userRef, {
      currentCalorie: curr + calories,
      lastUpdatedAt: date,
      [`calorieHistory.${date}`]: curr + calories,
    });
    const docsnap: DocumentSnapshot<DocumentData, DocumentData> =
      await getUserDocSnap();
    if (docsnap.data()?.currentCalorie >= targetGoal) {
      let streakArray: string[] = docsnap.data()?.streak;
      const currdate: string = moment().format("l"); // 6/26/2024
      if (streakArray.length >= 1) {
        const previousDayindex: number = streakArray.length - 1;
        //check if streak is maintained
        const prevDate: string = streakArray[previousDayindex];
        const consistent: boolean = checkStreak(prevDate, currdate);
        if (consistent) {
          //increase streak
          streakArray.push(currdate);
        } else {
          //clear streak, start from 1
          streakArray = [];
          streakArray.push(currdate);
        }
      } else {
        //no streak yet, add to streakArray
        streakArray.push(currdate);
      }
      const temp: boolean[] = docsnap.data()?.badges;
      //first time hiting goal when use app
      const firstTime: boolean = !temp[1];
      let newbadge: boolean = false;
      let badgeName: string = "";
      if (firstTime) {
        temp[1] = true;
        newbadge = true;
        badgeName = "Baby Steps Explorer";
      }
      //check if met required streak to unlock badge, do note since nth is changed to false
      //previously actained achievements are not made invalid
      //check if already obtained before
      if (!temp[3] && streakArray.length == 2) {
        temp[3] = true;
        newbadge = true;
        badgeName = "Chasing Success";
      }

      if (!temp[4] && streakArray.length == 7) {
        temp[4] = true;
        newbadge = true;
        badgeName = "Unstoppable Force";
      }

      await updateDoc(userRef, {
        badges: temp,
        streak: streakArray,
      });
      //new badge unlocked, refresh badges screen by changing useEFFECT dependency and give alert
      if (newbadge) {
        refreshBadgeContext?.setRefreshBadge(
          !refreshBadgeContext?.refreshBadge
        );
        alert("New Badge " + badgeName + " unlocked!");
      }
    }
    refreshCalorieContext?.setRefreshCalorie(
      !refreshCalorieContext?.refreshCalorie
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {/* <SafeAreaView style={styles.container}>
        <View style={styles.closeContainer}>
          <TouchableOpacity
            onPress={() => modalHandler()}
            style={styles.closeButton}
          >
            <Ionicons name="close-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Calories Log</Text>
        </View>
        <View style={styles.detailsCalorie}>
          <TextInput
            style={styles.input}
            placeholder="Add calories (kcal)"
            keyboardType="numeric"
            onChangeText={updateCalories}
            aria-label="InputBox"
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitCalories}
          aria-label="SubmitButton"
        >
          <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView> */}

        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Log your calories</Text>

            <TouchableOpacity onPress={modalHandler} style={styles.closeButton}>
              <Ionicons name="close" size={25} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.details}>
            <TextInput
              style={styles.input}
              placeholder="Add calories (kcal)"
              keyboardType="numeric"
              onChangeText={updateCalories}
              aria-label="InputBox"
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitCalories}
            aria-label="SubmitButton"
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
export { updateCalories };

const styles = StyleSheet.create({
  container: {
    height: "35%",
    marginTop: "auto",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: SIZES.xSmall,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    textAlign: "center",
    fontSize: SIZES.medium,
  },
  closeButton: {
    position: "absolute",
    right: SIZES.xSmall,
  },
  details: {
    margin: SIZES.xxLarge,
  },
  input: {
    borderWidth: SIZES.xSmall / 8,
    borderColor: COLORS.gray,
    marginVertical: SIZES.small,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall / 2,
  },
  submitButton: {
    backgroundColor: COLORS.tertiary,
    marginHorizontal: SIZES.xxLarge,
    borderRadius: SIZES.xSmall * 2,
    padding: SIZES.xSmall / 4,
  },
  submitText: {
    textAlign: "center",
    fontSize: SIZES.large,
    padding: SIZES.xSmall / 2,
    color: "black",
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: "white",
  // },
  // closeContainer: {
  //   alignItems: "flex-end",
  //   marginTop: 20,
  // },

  // closeButton: {
  //   marginRight: 20,
  //   backgroundColor: "red",
  // },

  // header: {
  //   marginTop: 50,
  // },

  // headerText: {
  //   textAlign: "center",
  //   fontSize: 35,
  //   color: "darkcyan",
  //   fontWeight: "bold",
  // },

  // detailsFood: {},

  // detailsCalorie: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },

  // input: {
  //   backgroundColor: "lavender",
  //   padding: 10,
  //   marginVertical: 10,
  //   borderRadius: 5,
  //   width: 300,
  // },

  // submitButton: {
  //   backgroundColor: "maroon",
  //   marginTop: 40,
  //   marginBottom: 30,
  //   marginHorizontal: 30,
  //   borderRadius: 20,
  //   padding: 5,
  // },

  // submit: {
  //   textAlign: "center",
  //   color: "white",
  //   fontSize: 18,
  //   padding: 5,
  // },
});

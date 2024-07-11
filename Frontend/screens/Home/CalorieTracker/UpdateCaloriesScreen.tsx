import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
  } from "react-native";
import React, { useState, useEffect, useContext} from "react";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import { doc, DocumentData, collection, getDocs, getDoc, query, where, updateDoc } from "firebase/firestore";
import Ionicons from '@expo/vector-icons/Ionicons';
import RefreshBadgeContext from "@/contexts/RefreshBadge";
import RefreshCalorieContext from "@/contexts/RefreshCalorie";
import moment from "moment"
export const checkStreak =  (prev: string, curr: string) : boolean => {
    const array1 = prev.split("/")
    const array2 = curr.split("/")
    const month1 = Number(array1[0])
    const month2 = Number(array2[0])
    const day1 = Number(array1[1])
    const day2 = Number(array2[1])
    const year1 = Number(array1[2])
    const year2 = Number(array2[2])
    const thirty = [4,6,9,11]
    //same month
    if (year1 != year2 ) {
        return false
    }
    //same month
    else if (month1 == month2 && day2 > day1) {
        return day2 - day1 == 1
        //end of 30 days month
    } else if (thirty.includes(month1) && day1 == 30) {
        return day2 == 1 && month2 - month1 == 1
        //end of feb
    } else if (month1 == 2 && day1 == 28) {
        return day2 == 1 && month2 - month1 == 1
        //end of year
    } else if (month1 == 12 && day1 == 31){
        return day2 == 1 && month2 == 1
        //end of 31 days month
    } else if (day1 == 31){
        return day2 == 1 && month2 - month1 == 1
    } else {
        return false
    }
    // 6/26/2024

} 
export default function UpdateCaloriesScreen({modalHandler}: any) {
    const docref = doc(DATA_BASE, "Users", ""+ AUTH.currentUser?.uid)
    const[calories, setCalories] = useState(0);
    const userRef = doc(DATA_BASE, "Users", "" + AUTH.currentUser?.uid)
    const refreshBadgeContext = useContext(RefreshBadgeContext)
    const refreshCalorieContext = useContext(RefreshCalorieContext)


    const updateCalories = (input: string) => {
        if (isNaN(Number(input)) || input =="0") {
             Alert.alert("Error", "Input needs to be a number and greater than 0", [{text: "ok"}])
        } else {
            setCalories(Number(input))
        }
    }
    
    const submitCalories = async () => {
        modalHandler();
        const doc = (await getDoc(userRef)).data()
        const curr = doc?.currentCalorie
        const targetGoal = doc?.calorieGoal
        
        await updateDoc(userRef, {
            currentCalorie: curr + calories,
            lastUpdatedAt: moment().format('l')
        });
        const docsnap = await getDoc(userRef)
        if  (docsnap.data()?.currentCalorie >= targetGoal) {
            let streakArray = docsnap.data()?.streak
            const currdate = moment().format('l');    // 6/26/2024
            if (streakArray.length >= 1) {
                const previousDayindex = streakArray.length - 1
                //check if streak is maintained
                const prevDate = streakArray[previousDayindex];
                const consistent: boolean = checkStreak(prevDate, currdate)
                if (consistent) {
                    //increase streak
                    streakArray.push(currdate)
                } else {
                    //clear streak, start from 1
                    streakArray = []
                    streakArray.push(currdate)
                }
            } else {
                //no streak yet, add to streakArray
                streakArray.push(currdate)
            }
            const temp = docsnap.data()?.badges
            //first time hiting goal when use app
            const firstTime = !temp[1]
            let newbadge: boolean = false
            let badgeName: string = ""
            if (firstTime) {
                temp[1] = true
                newbadge = true
                badgeName = "Baby Steps Explorer"
            } 
            //check if met required streak to unlock badge, do note since nth is changed to false
            //previously actained achievements are not made invalid
            //check if already obtained before
            if (!temp[3] && streakArray.length == 2) {
                temp[3] = true
                newbadge = true
                badgeName = "Chasing Success"
            }

            if (!temp[4] && streakArray.length == 7) {
                temp[4] = true
                newbadge = true
                badgeName = "Unstoppable Force"

            }
    
            await updateDoc(docref, {
                badges: temp,
                streak: streakArray
            })
            //new badge unlocked, refresh badges screen by changing useEFFECT dependency and give alert
            if (newbadge) {
                refreshBadgeContext?.setRefreshBadge(!refreshBadgeContext?.refreshBadge)
                alert("New Badge " + badgeName + " unlocked!")
            }            
        }
        //setBar(!bar)
        refreshCalorieContext?.setRefreshCalorie(!refreshCalorieContext?.refreshCalorie)
        // progressHandler(calories);
    }
    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={styles.closeContainer}>
                    <TouchableOpacity 
                    onPress={()=>modalHandler()}
                    style={styles.closeButton}>
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
                    /> 
                    <TouchableOpacity>
                        <Ionicons name="camera" size={35} color="black" />
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                    style={styles.submitButton}
                    onPress={submitCalories}
                >
                    <Text style={styles.submit}>Submit</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white",
        
    },

    closeContainer: {
        alignItems:"flex-end",
        marginTop: 20,
    },

    closeButton: {
        marginRight:20,
        backgroundColor:"red",

    },

    header: {
        marginTop:50,
    },

    headerText: {
        textAlign:"center",
        fontSize: 35,
        color: "darkcyan",
        fontWeight: "bold",
    },

    detailsFood: {

    },

    detailsCalorie: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"

    },

    input: {
        backgroundColor:"lavender",
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        width:300,
        marginLeft: 20,
        marginRight:5,
    },
   

    submitButton:{
        backgroundColor: "maroon",
        marginTop: 40,
        marginBottom: 30,
        marginHorizontal: 30,
        borderRadius: 20,
        padding: 5,
    },

    submit: {
        textAlign:"center",
        color:"white",
        fontSize: 18,
        padding: 5,
    }


})
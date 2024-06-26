import UpdateScreen from "@/screens/UpdateScreen";
import React, {useState, useContext, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Modal} from "react-native";
import * as Progress from 'react-native-progress';
import { doc, DocumentData, collection, getDocs, getDoc, query, where, updateDoc } from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import CalorieGoal from "@/contexts/CalorieGoal";
import RefreshBadgeContext from "@/contexts/RefreshBadge";
import moment from "moment"

export default function ProgressTracker({input} : any) {
    const docref = doc(DATA_BASE, "Users", ""+ AUTH.currentUser?.uid)
    const refreshBadgeContext = useContext(RefreshBadgeContext)

    const checkStreak = (prev: string, curr: string) : boolean => {
        const array1 = prev.split("/")
        const array2 = curr.split("/")
        const month1 = Number(array1[0])
        const month2 = Number(array2[0])
        const day1 = Number(array1[1])
        const day2 = Number(array2[1])

        const thirty = [4,6,9,11]
        //same month
        if (month1 == month2 && day2 > day1) {
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

    //store current calories from db to display
    const [currentCal, setCal] = useState(0);
    //ratio to maintain
    const [prog, setProg] = useState(0);
    const [open, setOpen] = useState(false);
    //for target goal 
    const calorieContext = useContext(CalorieGoal);
    //dependency to refresh bar after submiting calories
    const [bar, setBar] = useState(false)
    // const getCalorieGoal = async () => {
    //     const docsnap = await getDoc(docref)
    //     calorieContext?.setCalorie(docsnap.data()?.calorieGoal)
    // }
    const getCalorieProgress = async () => {
        //update total calories clocked
        const docsnap = await getDoc(docref)
        calorieContext?.setCalorie(docsnap.data()?.calorieGoal)  
        const targetGoal: number = docsnap.data()?.calorieGoal
        const curr: number = docsnap.data()?.currentCalorie
        setCal(curr)
        const ratio: number = calorieContext?.calorie != undefined
                    ? curr / targetGoal
                    : 0        
        if (isNaN(ratio)) {
            return
        } else {
            console.log(ratio)
            setProg(ratio)
        }

        //check for two possible achievements, first time hit goal + streaks
        if  (calorieContext?.calorie != undefined && curr >= calorieContext?.calorie) {
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
    }

    const resetHandler = async () => {
        const docsnap = await getDoc(docref)
        await updateDoc(docref, {
            currentCalorie: 0
        })
        setCal(0)
        setProg(0)
    }

    const autoReset = async () => {
        const docsnap = await getDoc(docref)
        const streakArray = docsnap.data()?.streak
        //already reset and nvr upload any caloreis
        if (currentCal == 0) {
            return
        }
        const lastIndex: number = streakArray.length - 1
        const lastUploadDay: string = streakArray[lastIndex]
        const todayDate: string = moment().format('l')   // 6/26/2024
        //doesnt mattter when lastupload day is, its bound to be different
        if (todayDate != lastUploadDay) {
            resetHandler()
        }
    }

    useEffect(() => {
        getCalorieProgress()
        autoReset()
    }, [bar])

    //to control the popup
    const modalHandler = () => {
        setOpen(!open);
    };

    //to modify the progress of bar, taking input from UpdateScreen component
    // const progressHandler = (input: number) => {
    //     if (prog >= 1) {
    //         setProg(0);
    //         // setCal(0);
    //     } else {
    //         if (calorieContext?.calorie != undefined) {
    //             setCal(currentCal + input)
    //             let x: number = prog + (input / calorieContext?.calorie);
    //             setProg(x);
    //         } 
            
    //     }  
    // }

    return(
        <View>
            <Progress.Bar 
                progress={prog} 
                width={null} 
                height={30} 
                borderRadius={20}
            />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity 
                    style={styles.resetButton}
                    onPress={resetHandler}
                >
                    <Text style={styles.reset}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.updateButton}
                    onPress={modalHandler}
                >
                    <Text style={styles.update}>Update</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.detail}>
                <Text style={styles.amount}>{currentCal} / {calorieContext?.calorie}</Text>
            </View>

            <Modal 
                visible={open}
            >
                {/* <UpdateScreen modalHandler={modalHandler} progressHandler={progressHandler} /> */}
                <UpdateScreen modalHandler={modalHandler} bar={bar} setBar={setBar} />

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection:"row",

    },

    updateButton: {
        backgroundColor:"lightblue",
        marginRight: 10,
        padding: 6,
        marginTop: 10,
        borderRadius:10,
        position:"absolute",
        right :0,
    },

    resetButton: {
        backgroundColor:"red",
        marginRight: 10,
        padding: 6,
        marginTop: 10,
        borderRadius:10,
    },

    reset: {
        fontSize:15,
        paddingHorizontal:8,
        color:"white",
    },

    

    update: {
        fontSize:15,
    },

    amount: {
        marginTop: 10,
        color: "mediumblue"
    },
    detail: {
        flexDirection:"row",
        justifyContent:"flex-end"
    }
})
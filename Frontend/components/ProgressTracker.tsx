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

    //store current calories from db to display
    const [currentCal, setCal] = useState(0);
    //ratio to maintain
    const [prog, setProg] = useState(0);
    const [open, setOpen] = useState(false);
    //for target goal 
    const calorieContext = useContext(CalorieGoal);
    //dependency to refresh bar after submiting calories
    const [bar, setBar] = useState(false)

    // to update total calories clocked and progress bar
    const getCalorieProgress = async () => {
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
    }

    const resetHandler = async () => {
        const docsnap = await getDoc(docref)
        await updateDoc(docref, {
            currentCalorie: 0
        })
        setCal(0)
        setProg(0)
        console.log("test3")
    }

    const autoReset = async () => {
        const docsnap = await getDoc(docref)
        const streakArray = docsnap.data()?.streak

        //already reset and nvr upload any caloreis
        if (docsnap.data()?.currentCalorie == 0) {
            return
        }
        if (streakArray == undefined) {
            return
        }
        const lastIndex: number = streakArray.length - 1
        // const lastUploadDay: string = streakArray[lastIndex]
        const lastUploadDay: string = docsnap.data()?.lastUpdatedAt

        const todayDate: string = moment().format('l')   // 6/26/2024
        console.log(todayDate)
        //doesnt mattter when lastupload day is, its bound to be different 
        //but make sure only reset if goal was reached previously
        //if not threre will be a bug where everytime u update calories but havent rch goal it will reset to 0
        if (todayDate != lastUploadDay) {
            resetHandler()
        }
    }

    useEffect(() => {
        getCalorieProgress()
        autoReset()
    },[bar])

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
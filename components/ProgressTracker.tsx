import UpdateScreen from "@/screens/UpdateScreen";
import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Modal} from "react-native";
import * as Progress from 'react-native-progress';

export default function ProgressTracker({input} : any) {
    //arbituary number for testing
    let goal: number = 2300;
    const [currentCal, setCal] = useState(0);
    const [prog, setProg] = useState(0);
    const [open, setOpen] = useState(false);
    //to control the popup
    const modalHandler = () => {
        setOpen(!open);
    };

    //to modify the progress of bar, taking input from UpdateScreen component
    const progressHandler = (input: number) => {
        if (prog >= 1) {
            setProg(0);
            setCal(0);
        } else {
            setCal(currentCal + input)
            let x: number = prog + (input / 2300);
            setProg(x);
        }
        
    }
    return(
        <View>
            <Progress.Bar 
                progress={prog} 
                width={null} 
                height={30} 
                borderRadius={20}
            />
            <View style={{alignItems:"flex-end"}}>
                <TouchableOpacity 
                    style={styles.updateButton}
                    onPress={modalHandler}
                >
                    <Text style={styles.update}>Update</Text>
                </TouchableOpacity>
                <Text style={styles.amount}>{currentCal} / 2300</Text>
            </View>
            <Modal 
                visible={open}
            >
                <UpdateScreen modalHandler={modalHandler} progressHandler={progressHandler} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    updateButton: {
        backgroundColor:"lightblue",
        marginRight: 10,
        padding: 6,
        marginTop: 10,
        borderRadius:10,
    },

    update: {
        fontSize:15,
    },

    amount: {
        marginTop: 10,
        color: "mediumblue"
    }
})
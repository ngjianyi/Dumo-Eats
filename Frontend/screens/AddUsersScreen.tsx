import {TextInput, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator,Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import {useState} from "react"
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
export default function AddUsersScreen({searchUser, setSearch}:any) {
    const [follow, setFollow] = useState("")
    const addHandler = () => {
        //add to data base
        setSearch(!searchUser)
    }
    //append to following array on database
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.searchWrapper}>
                <Text style={styles.header}>Add your friends here!</Text>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={(text) => setFollow(text)}
                    placeholder="Who are you looking for?"
                    autoCapitalize="none"
                />
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={addHandler}
                >
                    <Text style={{color:"white"}}>Add Friend</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
        
        
    )
}


const styles = StyleSheet.create({
    searchWrapper: {
        flex: 1,
        marginHorizontal: 10,
        alignItems: "center",
      },
    header: {
        marginTop: 70,
        fontSize:18,
    },

    searchInput: {
    padding:10,
    backgroundColor:"light-grey",
    width: "95%",
    marginTop:50,
    borderRadius:10,
    borderWidth:1,
    },

    addButton: {
        backgroundColor:"maroon",
        padding:8,
        marginTop:10,
        borderRadius:8,
    }
})

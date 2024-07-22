import {TextInput, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator,Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import {useState, useContext} from "react"
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import { updateDoc, arrayUnion, arrayRemove, doc, DocumentData, collection, getDocs, getDoc, DocumentReference } from "firebase/firestore";
import Ionicons from '@expo/vector-icons/Ionicons';
import AutoRefresh from "@/contexts/AutoRefresh";

export default function AddUsersScreen({searchUser, setSearch}:any) {
    const [followed, setFollow] = useState("")
    const refreshContext = useContext(AutoRefresh)
    const addHandler = async () => {
        //check if username exists
        const querySnapshot = await getDocs(collection(DATA_BASE, "Usernames"));
        let status :boolean = false
        querySnapshot.forEach((document) => {
            if (document.data().username == followed) {
                status = true
            }
        })

        if (!status) {
            alert("No such user")
            return
        }
        //add to data base
        const userRef = doc(DATA_BASE, "Users", ""+AUTH.currentUser?.uid)
        const array = (await getDoc(userRef)).data()?.following 

        if (array.includes(followed)) {
            alert("Already added friend")
            return
        }
        await updateDoc(userRef, {
            following: arrayUnion(followed)         
        });
        setFollow("")
        Alert.alert("Successful!", "Added " + followed + " as friend", [{text: 'OK', onPress: () => {
            setSearch(!searchUser)
            refreshContext?.setRefresh(!refreshContext.autoRefresh)
        }}])
        
    }
    //append to following array on database
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.searchWrapper}>
                <View style={styles.header}>
                    <Text style={styles.title}>Add your friends here!</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={(()=>setSearch(!searchUser))}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />                    
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.searchInput}
                    onChangeText={(text) => setFollow(text)}
                    placeholder="Username"
                    autoCapitalize="none"
                    value={followed}
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
        marginTop: 50,
        flexDirection:"row",
        width:"100%",
        justifyContent:"center",
        backgroundColor:"hotpink",
        padding:20,
        alignItems:"center",
        borderRadius:10,
    },
    title: {
        fontSize:18,
        alignSelf:"center",
        color:"white"
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
        backgroundColor:"hotpink",
        padding:8,
        marginTop:50,
        borderRadius:8,
    },
    closeButton: {
        position: "absolute",
        left:4,
    },
})

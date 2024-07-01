import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import { doc, DocumentData, collection, getDocs, getDoc, query, where, updateDoc } from "firebase/firestore";
import AddUsersScreen from "./AddUsersScreen";
import CollectionScreen from "./CollectionScreen";
import CalorieGoal from "@/contexts/CalorieGoal";
import RefreshBadgeContext from "@/contexts/RefreshBadge";
import UserLoggedInContext from "@/contexts/UserLoggedIn";
const profilePic = require("@/assets/images/SampleProfile.png");

export default function ProfileScreen({ navigation }: any) {
  const userRef = doc(DATA_BASE, "Users", ""+ AUTH.currentUser?.uid);
  const calorieContext = useContext(CalorieGoal);
  const refreshBadgeContext = useContext(RefreshBadgeContext)
  const userLoggedInContext = useContext(UserLoggedInContext)

  const getAllDetails = async () => {
    const docsnap = await getDoc(userRef);
    setName(docsnap.data()?.name);
    setGoal(docsnap.data()?.calorieGoal);
    setDate(docsnap.data()?.DOB)
  }

  const updateDetails = async () => {
    const validDate = checkDate(date)
    if (!validDate) {
      alert("Invalid date please key in day/month/year only")
      return
    }
    await updateDoc(userRef, {
      calorieGoal: caloriegoal,
      name: name,
      DOB: date,
    })
    //to change false value to true for set calorie goal badge
  

    Keyboard.dismiss()
    const docsnap = await getDoc(userRef);
    calorieContext?.setCalorie(docsnap.data()?.calorieGoal)
    const temp = docsnap.data()?.badges
    if (!temp[0] && docsnap.data()?.calorieGoal > 0) {
      temp[0] = true
      await updateDoc(userRef, {
        badges: temp
      })
      refreshBadgeContext?.setRefreshBadge(!refreshBadgeContext?.refreshBadge)
      alert("New Badge Strategic Visionary Unlocked!")
    }
    //for testing purposes
    // } else {
    //   temp[0] = false
    //   await updateDoc(userRef, {
    //     badges: temp
    //   })
    //   refreshBadgeContext?.setRefreshBadge(!refreshBadgeContext?.refreshBadge)

    // }
    alert("Updated Successfully!")

  }
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [caloriegoal, setGoal] = useState(0);
  const [searchUser, setSearch] = useState(false);
  const[collection, setCollection] = useState(false);
  const[refresh, setRefresh] = useState(false);

  const logOutHandler = () => {
    userLoggedInContext?.setUser(!userLoggedInContext?.UserLoggedIn)
    AUTH.signOut().then(navigation.navigate("login"));
  };

  const collectionsHandler = ()=> {
    setRefresh(refresh);
    setCollection(!collection);
  }

  const checkDate = (val: string) => {
    const array = val.split("/")
    if (array.length != 3) {
      return false
    } else if (Number(array[0]) > 31 || Number(array[1]) > 12 || Number(array[2]) > 2024) {
      return false
    } else {
      return true
    }
  }
  
  useEffect(() => {
    getAllDetails();
  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Modal visible={searchUser}>
          <AddUsersScreen searchUser={searchUser} setSearch={setSearch}/>
        </Modal>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
          <Image source={profilePic} style={styles.profilePic} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            // onPress={() => navigation.navigate("login")}
            onPress={logOutHandler}
          >
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            // onPress={() => navigation.navigate("login")}
            onPress={() => setSearch(!searchUser)}
          >
            <Text style={styles.logout}>Add Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.collectionButton}
          onPress={collectionsHandler}>
            <Text style={styles.logout}>Collections</Text>
            </TouchableOpacity>
        </View>
          <ScrollView  style={{flex:1}}>
              <View style={styles.details}>
                <Text style={styles.inputLabel}>Name:</Text>
                <View style={styles.inputBox}>
                  <TextInput
                    onChangeText={(value: string) => {
                        setName(value)
                    }}
                    value={name}
                    autoCorrect={false}
                  />
                </View>
                <Text style={styles.inputLabel}>Date of Birth:</Text>
                <View style={styles.inputBox}>
                  <TextInput
                    onChangeText={(value: string) => {
                      setDate(value)
                    }}
                    placeholder="31/06/2024"
                    value={date}
                  />
                </View>
                <Text style={styles.inputLabel}>Calories Goal:</Text>
                <View style={styles.inputBox}>
                  <TextInput
                    keyboardType={"numeric"}
                    onChangeText={(val: string) => {
                      setGoal(Number(val))
                    }}
                    value={String(caloriegoal)}
                  />
                </View>
              </View>
              <View style={{width:"100%", alignItems:"center"}}>
                <TouchableOpacity 
                onPress={updateDetails}
                style={styles.updateButton}>
                  <Text style={styles.updateDetails}>Update</Text>
                </TouchableOpacity>
              </View>
          </ScrollView>
        <Modal visible={collection}>
          <CollectionScreen refresh={refresh} collection ={collection} setCollection={setCollection}/>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    alignItems: "center",
  },

  headerText: {
    fontSize: 20,
    marginBottom: 30,
  },

  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: "black",
  },
  details: {
    marginTop: 5,
    padding: 15,
  },
  inputLabel: {
    marginHorizontal: 2,
  },
  
  inputBox: {
    height: 44,
    width: "100%",
    borderWidth: 2,
    borderColor: "lightgrey",
    marginVertical: 14,
    justifyContent: "center",
    paddingLeft: 8,
  },

  buttonContainer: {
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-evenly"
  },

  logoutButton: {
    backgroundColor: "maroon",
    marginVertical: 10,
    paddingVertical:8,
    borderRadius:14,
    width:"25%"
  },

  logout: {
    textAlign: "center",
    padding: 5,
    color: "white",
    fontWeight:"bold"
  },

  addButton: {
    backgroundColor: "hotpink",
    marginVertical: 10,
    paddingVertical:8,
    borderRadius:14,
    width:"25%"
  },

  collectionButton: {
    backgroundColor: "gold",
    marginVertical: 10,
    paddingVertical:8,
    borderRadius:14,
    width:"25%"
  },

  updateButton: {
    backgroundColor: "mediumseagreen",
    marginVertical: 80,
    marginBottom:20,
    paddingVertical:8,
    borderRadius:14,
    width:"25%",
  },
  updateDetails: {
    textAlign: "center",
    color: "white",
    fontWeight:"bold",
    padding:5,

  },

});

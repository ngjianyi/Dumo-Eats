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
import { AUTH, DATA_BASE, STORAGE } from "@/firebaseCONFIG";
import { StorageReference, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  doc,
  DocumentData,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import Entypo from "@expo/vector-icons/Entypo";

//   import AddUsersScreen from "./AddUsersScreen";

import AddUsersScreen from "./AddUsersScreen";
import CollectionScreen from "./CollectionScreen";
import CalorieGoal from "@/contexts/CalorieGoal";
import RefreshBadgeContext from "@/contexts/RefreshBadge";
import UserLoggedInContext from "@/contexts/UserLoggedIn";
import RefreshCalorieContext from "@/contexts/RefreshCalorie";
import RefreshCommentContext from "@/contexts/RefreshComment";
import { Propsmain } from "@/components/navigation/PropTypes";
import CalorieGraphScreen from "./CalorieGraphScreen";
const defaultProfilePic = require("@/assets/images/defaultProfile.png");

export const checkDate = (val: string) => {
  const array = val.split("/");
  if (array.length != 3) {
    return false;
  } else if (
    Number(array[0]) > 31 ||
    Number(array[1]) > 12 ||
    Number(array[2]) > 2024
  ) {
    return false;
  } else if (
    Number(array[0]) <= 0 ||
    Number(array[1]) <= 0 ||
    Number(array[2]) <= 0
  ) {
    return false;
  } else {
    return true;
  }
};

export default function ProfileScreen({ navigation }: Propsmain) {
  const userRef = doc(DATA_BASE, "Users", "" + AUTH.currentUser?.uid);
  const calorieContext = useContext(CalorieGoal);
  const refreshBadgeContext = useContext(RefreshBadgeContext);
  const userLoggedInContext = useContext(UserLoggedInContext);
  const refreshCalorieContext = useContext(RefreshCalorieContext);
  const refreshCommentContext = useContext(RefreshCommentContext);

  const getAllDetails = async () => {
    const docsnap = await getDoc(userRef);
    setName(docsnap.data()?.name);
    setGoal(docsnap.data()?.calorieGoal);
    setDate(docsnap.data()?.DOB);
    setImage(docsnap.data()?.profilePic);
    
  };

  const updateDetails = async () => {
    const validDate = checkDate(date);
    if (!validDate) {
      alert("Please enter Date of birth (day/month/year)");
      return;
    }
    setLoading(true)
    await updateDoc(userRef, {
      calorieGoal: caloriegoal,
      name: name,
      DOB: date,
    });
    //to change false value to true for set calorie goal badge
    Keyboard.dismiss();
    const docsnap = await getDoc(userRef);
  

    const prev: string = docsnap.data()?.profilePic
    if (prev != image) {
      try {
        const response = await fetch(image)
        const blob = await response.blob();
        const storageRef : StorageReference = ref(STORAGE, "DumoEatsProfilePic/" + Date.now() + ".jpg");
        await uploadBytes(storageRef, blob)
        .then((snapshot) => {
          console.log("Uploaded a blob");
        })
        .then((response) => {
          getDownloadURL(storageRef).then(async (dlURL: string) => {
            await updateDoc(userRef, {
              profilePic: dlURL
            });
          })})
      } catch (error: any) {
        setLoading(false)
        alert("no image uploaded");
      }
    }
    setLoading(false)
    calorieContext?.setCalorie(docsnap.data()?.calorieGoal);
    const temp = docsnap.data()?.badges;
    if (!temp[0] && docsnap.data()?.calorieGoal > 0) {
      temp[0] = true;
      await updateDoc(userRef, {
        badges: temp,
      });
      console.log(refreshBadgeContext?.refreshBadge)
      refreshBadgeContext?.setRefreshBadge(!refreshBadgeContext?.refreshBadge);
      console.log(refreshBadgeContext?.refreshBadge)
      alert("New Badge Strategic Visionary Unlocked!");
    }
    refreshCalorieContext?.setRefreshCalorie(
      !refreshCalorieContext?.refreshCalorie
    );
    refreshCommentContext?.setRefreshComment(refreshComment => !refreshComment)    
    alert("Updated Successfully!");
  };
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [caloriegoal, setGoal] = useState(0);
  const [searchUser, setSearch] = useState(false);
  const [collection, setCollection] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [image, setImage] = useState<string>("");
  const [graph, setGraph] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const logOutHandler = () => {
    userLoggedInContext?.setUser(!userLoggedInContext?.UserLoggedIn);
    AUTH.signOut().then(() => navigation.navigate("login"));
  };

  const collectionsHandler = () => {
    setRefresh(refresh);
    setCollection(!collection);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    getAllDetails();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Modal visible={searchUser}>
          <AddUsersScreen searchUser={searchUser} setSearch={setSearch} />
        </Modal>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.picContainer}>
              {image != "" ? (
                <Image source={{ uri: image }} style={styles.profilePic} />
              ) : (
                <Image source={defaultProfilePic} style={styles.profilePic} />
              )}
              <View style={styles.pencil}>
                <Entypo name="edit" size={24} color="blue" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
              onPress={() =>setGraph(true)}
              style={styles.graphButton}
              >
              <Text style={styles.updateDetails}>Graph</Text>
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
            onPress={collectionsHandler}
          >
            <Text style={styles.logout}>Collections</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.details}>
            <Text style={styles.inputLabel}>Name:</Text>
            <View style={styles.inputBox}>
              <TextInput
                onChangeText={(value: string) => {
                  setName(value);
                }}
                value={name}
                autoCorrect={false}
              />
            </View>
            <Text style={styles.inputLabel}>Date of Birth:</Text>
            <View style={styles.inputBox}>
              <TextInput
                onChangeText={(value: string) => {
                  setDate(value);
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
                  setGoal(Number(val));
                }}
                value={String(caloriegoal)}
              />
            </View>
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={updateDetails}
              style={styles.updateButton}
            >
              <Text style={styles.updateDetails}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.logoutButton}
            // onPress={() => navigation.navigate("login")}
            onPress={logOutHandler}
          >
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal visible={collection}>
          <CollectionScreen refresh={refresh} setCollection={setCollection} />
        </Modal>
        <Modal visible={graph}>
          <CalorieGraphScreen setGraph={setGraph}/>
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

  picContainer: {
    height: 100,
    width: 100,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: "grey",
  },

  profilePic: {
    height: "100%",
    width: "100%",
    borderRadius: 85,
  },
  pencil: {
    position: "absolute",
    bottom: 0,
    right: 2,
    backgroundColor: "white",
    borderRadius: 15,
    height: 28,
    width: 28,
    alignItems: "center",
    justifyContent: "center",
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
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },

  logoutButton: {
    backgroundColor: "maroon",
    paddingVertical: 8,
    borderRadius: 14,
    width: "25%",
  },

  logout: {
    textAlign: "center",
    padding: 5,
    color: "white",
    fontWeight: "bold",
  },

  addButton: {
    backgroundColor: "hotpink",
    marginVertical: 10,
    paddingVertical: 8,
    borderRadius: 14,
    width: "25%",
  },

  collectionButton: {
    backgroundColor: "gold",
    marginVertical: 10,
    paddingVertical: 8,
    borderRadius: 14,
    width: "25%",
  },

  updateButton: {
    backgroundColor: "mediumseagreen",
    marginVertical: 30,
    marginBottom: 20,
    paddingVertical: 8,
    borderRadius: 14,
    width: "25%",
  },

  graphButton: {
    backgroundColor: "blue",
    marginVertical: 10,
    paddingVertical: 8,
    borderRadius: 14,
    width: "25%",

    
  },
  updateDetails: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    padding: 5,
  },
});

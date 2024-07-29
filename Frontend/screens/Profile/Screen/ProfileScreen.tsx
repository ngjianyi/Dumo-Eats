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
  ImageSourcePropType,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AUTH, DATA_BASE, STORAGE } from "@/firebaseCONFIG";
import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import Entypo from "@expo/vector-icons/Entypo";

import AddUsersScreen from "./AddUsersScreen";
import CollectionScreen from "./CollectionScreen";
import CalorieGoal from "@/contexts/CalorieGoal";
import RefreshBadgeContext from "@/contexts/RefreshBadge";
import UserLoggedInContext from "@/contexts/UserLoggedIn";
import RefreshCalorieContext from "@/contexts/RefreshCalorie";
import RefreshCommentContext from "@/contexts/RefreshComment";
import { Propsprofile } from "@/components/navigation/PropTypes";
import CalorieGraphScreen from "./CalorieGraphScreen";
import { getUserDocSnap, getUserRef } from "@/utils/social/User";
import RNPickerSelect from "react-native-picker-select";

const defaultProfilePic: ImageSourcePropType = require("@/assets/images/defaultProfile.png");

export const checkDate = (val: string): boolean => {
  const long = new Set([1, 3, 5, 7, 8, 10, 12]);
  const short = new Set([4, 6, 9, 11]);

  const array = val.split("/");
  const day = parseInt(array[0]);
  const month = parseInt(array[1]);
  const year = parseInt(array[2]);
  if (array.length != 3) {
    return false;
  } else if (day > 31 || month > 12 || year > 2024) {
    return false;
  } else if (day <= 0 || month <= 0 || year <= 0) {
    return false;
  }
  if (long.has(month)) {
    return day <= 31;
  } else if (short.has(month)) {
    return day <= 30;
  } else {
    return day <= 28;
  }
};

export default function ProfileScreen({ navigation }: Propsprofile) {
  const userRef: DocumentReference = getUserRef();
  const calorieContext = useContext(CalorieGoal);
  const refreshBadgeContext = useContext(RefreshBadgeContext);
  const userLoggedInContext = useContext(UserLoggedInContext);
  const refreshCalorieContext = useContext(RefreshCalorieContext);
  const refreshCommentContext = useContext(RefreshCommentContext);

  const getAllDetails = async () => {
    const docsnap: DocumentSnapshot<DocumentData, DocumentData> =
      await getUserDocSnap();
    setName(docsnap.data()?.name);
    setGoal(docsnap.data()?.calorieGoal);
    setDate(docsnap.data()?.DOB);
    setImage(docsnap.data()?.profilePic);
    setGender(docsnap.data()?.gender);
  };

  const updateDetails = async () => {
    const validDate = checkDate(date);
    if (!validDate) {
      alert("Please enter Date of birth (day/month/year)");
      return;
    }
    setLoading(true);
    await updateDoc(userRef, {
      calorieGoal: caloriegoal,
      name: name,
      DOB: date,
      gender: gender,
    });
    Keyboard.dismiss();
    const docsnap: DocumentSnapshot<DocumentData, DocumentData> =
      await getUserDocSnap();
    const prev: string = docsnap.data()?.profilePic;
    if (prev != image) {
      try {
        const response = await fetch(image);
        const blob: Blob = await response.blob();
        const storageRef: StorageReference = ref(
          STORAGE,
          "DumoEatsProfilePic/" + Date.now() + ".jpg"
        );
        await uploadBytes(storageRef, blob)
          .then((snapshot) => {
            console.log("Uploaded a blob");
          })
          .then((response) => {
            getDownloadURL(storageRef).then(async (dlURL: string) => {
              await updateDoc(userRef, {
                profilePic: dlURL,
              });
            });
          });
      } catch (error: any) {
        setLoading(false);
        alert("no image uploaded");
      }
    }
    setLoading(false);
    calorieContext?.setCalorie(docsnap.data()?.calorieGoal);
    const temp: boolean[] = docsnap.data()?.badges;
    if (!temp[0] && docsnap.data()?.calorieGoal > 0) {
      temp[0] = true;
      await updateDoc(userRef, {
        badges: temp,
      });
      console.log(refreshBadgeContext?.refreshBadge);
      refreshBadgeContext?.setRefreshBadge(!refreshBadgeContext?.refreshBadge);
      console.log(refreshBadgeContext?.refreshBadge);
      alert("New Badge Strategic Visionary Unlocked!");
    }
    refreshCalorieContext?.setRefreshCalorie(
      !refreshCalorieContext?.refreshCalorie
    );
    refreshCommentContext?.setRefreshComment(
      (refreshComment) => !refreshComment
    );
    alert("Updated Successfully!");
  };
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [caloriegoal, setGoal] = useState<number>(0);
  const [searchUser, setSearch] = useState<boolean>(false);
  const [collection, setCollection] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [graph, setGraph] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");

  const logOutHandler = () => {
    userLoggedInContext?.setUser(!userLoggedInContext?.UserLoggedIn);
    AUTH.signOut().then(() => navigation.navigate("login"));
  };

  const collectionsHandler = () => {
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
            onPress={() => setGraph(true)}
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

            <Text style={styles.inputLabel}>Gender:</Text>
            <RNPickerSelect
              onValueChange={(value) => setGender(value)}
              items={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              value={gender}
              placeholder={{}}
              style={pickerSelectStyles}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
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
          <CollectionScreen setCollection={setCollection} />
        </Modal>
        <Modal visible={graph}>
          <CalorieGraphScreen setGraph={setGraph} />
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
    // marginVertical: 30,
    // marginBottom: 20,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "lightgrey",
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 44,
    width: "100%",
    marginVertical: 14,
    justifyContent: "center",
    paddingLeft: 8,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 44,
    width: "100%",
    marginVertical: 14,
    justifyContent: "center",
    paddingLeft: 8,
  },
});

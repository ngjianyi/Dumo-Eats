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
  Alert,
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

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS, SIZES } from "@/constants/Theme";

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
    Alert.alert("", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
      },
      {
        text: "Ok",
        onPress: () => {
          userLoggedInContext?.setUser(!userLoggedInContext?.UserLoggedIn);
          AUTH.signOut().then(() => navigation.navigate("login"));
        },
      },
    ]);
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
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Profile</Text>

          <TouchableOpacity onPress={pickImage}>
            <View style={styles.imageContainer}>
              <Image
                source={image ? { uri: image } : defaultProfilePic}
                style={styles.image}
              />
              <View style={styles.editIcon}>
                <Entypo name="edit" size={24} color={COLORS.gray} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={logOutHandler}>
            <MaterialIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => setGraph(true)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Graph</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setSearch(!searchUser)}
          >
            <Text style={styles.buttonText}>Add Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={collectionsHandler}>
            <Text style={styles.buttonText}>Collections</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value: string) => {
              setName(value);
            }}
            value={name}
            autoCorrect={false}
            autoCapitalize="none"
            autoComplete="off"
            placeholderTextColor={COLORS.gray}
          />

          <Text style={styles.inputText}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value: string) => {
              setDate(value);
            }}
            placeholder="DD/MM/YYYY"
            value={date}
            placeholderTextColor={COLORS.gray}
          />

          <Text style={styles.inputText}>Calories Goal</Text>
          <TextInput
            style={styles.input}
            keyboardType={"numeric"}
            onChangeText={(val: string) => {
              setGoal(Number(val));
            }}
            value={String(caloriegoal)}
            placeholderTextColor={COLORS.gray}
          />

          <Text style={styles.inputText}>Gender</Text>
          <RNPickerSelect
            onValueChange={(value) => setGender(value)}
            items={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
            value={gender}
            placeholder={{ label: "Please select a gender", value: "" }}
            style={pickerSelectStyles}
          />
        </View>

        <View style={styles.updateButtonContainer}>
          <TouchableOpacity onPress={updateDetails} style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={searchUser}>
          <AddUsersScreen searchUser={searchUser} setSearch={setSearch} />
        </Modal>

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
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: SIZES.medium,
    margin: SIZES.xSmall,
  },
  headerText: {
    fontSize: SIZES.xLarge,
    fontWeight: "700",
    color: "black",
    marginVertical: SIZES.xSmall / 4,
  },
  logoutButton: { position: "absolute", right: 0 },
  imageContainer: {
    height: 100,
    width: 100,
  },
  image: { height: "100%", width: "100%", borderRadius: 50 },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 15,
    height: 28,
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: SIZES.xSmall,
    marginBottom: SIZES.xLarge,
  },
  button: {
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.xSmall * 2,
    padding: SIZES.xSmall / 4,
    width: "30%",
  },
  buttonText: {
    textAlign: "center",
    fontSize: SIZES.medium,
    padding: SIZES.xSmall / 2,
    color: "black",
  },
  details: {
    marginHorizontal: SIZES.xxLarge,
  },
  inputText: { fontSize: SIZES.medium },
  input: {
    borderWidth: SIZES.xSmall / 8,
    borderColor: COLORS.gray,
    marginTop: SIZES.small / 2,
    marginBottom: SIZES.small,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall / 2,
  },
  updateButtonContainer: { alignItems: "center", marginTop: SIZES.xLarge },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: SIZES.xSmall / 8,
    borderColor: COLORS.gray,
    marginVertical: SIZES.small / 2,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall / 2,
  },
  inputAndroid: {
    borderWidth: SIZES.xSmall / 8,
    borderColor: COLORS.gray,
    marginVertical: SIZES.small / 2,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall / 2,
  },
});

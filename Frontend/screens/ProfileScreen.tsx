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
} from "react-native";
import React, { useState } from "react";
import { AUTH } from "@/firebaseCONFIG";
import CreatePostScreen from "./CreatePostScreen";
import AddUsersScreen from "./AddUsersScreen";
// import * as Keychain from "react-native-keychain";

const profilePic = require("@/assets/images/SampleProfile.png");

export default function ProfileScreen({ navigation }: any) {
  const [name, setName] = useState("Tom henry");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [calorieGoal, setGoal] = useState("");
  const [searchUser, setSearch] = useState(false);
  const logOutHandler = () => {
    AUTH.signOut().then(navigation.navigate("login"));
  };
  const uploadHandler = () => {
    navigation.navigate("upload");
  };

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
        <View style={styles.details}>
          <Text style={styles.inputLabel}>Name:</Text>
          <View style={styles.inputBox}>
            <TextInput
              onChangeText={(value: string) => setName(value)}
              placeholder="Tom henry"
              value={name}
            />
          </View>
          <Text style={styles.inputLabel}>Date of Birth:</Text>
          <View style={styles.inputBox}>
            <TextInput
              onChangeText={(value: string) => setDate(value)}
              placeholder="03/06/2024"
              value={date}
            />
          </View>
          <Text style={styles.inputLabel}>Calories Goal:</Text>
          <View style={styles.inputBox}>
            <TextInput
              onChangeText={(value: string) => setGoal(value)}
              placeholder="1234"
              value={calorieGoal}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          // onPress={() => navigation.navigate("login")}
          onPress={logOutHandler}
        >
          <Text style={styles.logout}>logout</Text>
        </TouchableOpacity>

         <TouchableOpacity
          style={styles.logoutButton}
          // onPress={() => navigation.navigate("login")}
          onPress={() => setSearch(!searchUser)}
        >
          <Text style={styles.logout}>add</Text>
        </TouchableOpacity>
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
    marginTop: 20,
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

  logoutButton: {
    backgroundColor: "maroon",
    marginHorizontal: 150,
    marginVertical: 10,
  },

  logout: {
    textAlign: "center",
    padding: 5,
    color: "white",
  },
});

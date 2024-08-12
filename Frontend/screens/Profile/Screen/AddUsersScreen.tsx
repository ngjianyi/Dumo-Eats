import {
  TextInput,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useState, useContext, SetStateAction, Dispatch } from "react";
import { DATA_BASE } from "@/firebaseCONFIG";
import {
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
  DocumentReference,
} from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import AutoRefresh from "@/contexts/AutoRefresh";
import { getUserDocSnap, getUserRef } from "@/utils/social/User";

import { COLORS, SIZES } from "@/constants/Theme";

interface Props {
  searchUser: boolean;
  setSearch: Dispatch<SetStateAction<boolean>>;
}
export default function AddUsersScreen({ searchUser, setSearch }: Props) {
  const [followed, setFollow] = useState<string>("");
  const refreshContext = useContext(AutoRefresh);
  const addHandler = async () => {
    //check if username exists
    const querySnapshot = await getDocs(collection(DATA_BASE, "Usernames"));
    let status: boolean = false;
    querySnapshot.forEach((document) => {
      if (document.data().username == followed) {
        status = true;
      }
    });

    if (!status) {
      alert("No such user");
      return;
    }
    //add to data base
    const userRef: DocumentReference = getUserRef();
    const array: string[] = (await getUserDocSnap()).data()?.following;

    if (array.includes(followed)) {
      alert("Already added friend");
      return;
    }
    await updateDoc(userRef, {
      following: arrayUnion(followed),
    });
    setFollow("");
    Alert.alert("Successful!", "Added " + followed + " as friend", [
      {
        text: "OK",
        onPress: () => {
          // setSearch(!searchUser);
          refreshContext?.setRefresh(!refreshContext.autoRefresh);
        },
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSearch(!searchUser)}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Add friends</Text>
        </View>

        <View style={styles.details}>
          <TextInput
            style={styles.input}
            placeholderTextColor={COLORS.gray}
            onChangeText={(text) => setFollow(text)}
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            value={followed}
          />
        </View>

        <TouchableOpacity style={styles.submit} onPress={addHandler}>
          <Text style={styles.submitText}>Add friend</Text>
        </TouchableOpacity>
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
    marginTop: "50%",
    margin: SIZES.xSmall,
  },
  closeButton: {
    marginLeft: SIZES.xSmall * 2,
    marginTop: SIZES.xSmall,
  },
  headerText: {
    fontSize: SIZES.xLarge,
    fontWeight: "700",
    color: "black",
    marginVertical: SIZES.xSmall / 4,
  },
  details: {
    margin: SIZES.xxLarge,
  },
  input: {
    borderWidth: SIZES.xSmall / 8,
    borderColor: COLORS.gray,
    marginVertical: SIZES.small,
    padding: SIZES.small,
    borderRadius: SIZES.xSmall / 2,
  },
  submit: {
    backgroundColor: COLORS.tertiary,
    marginHorizontal: SIZES.xxLarge,
    borderRadius: SIZES.xSmall * 2,
    padding: SIZES.xSmall / 4,
  },
  submitText: {
    textAlign: "center",
    fontSize: SIZES.large,
    padding: SIZES.xSmall / 2,
    color: "black",
  },
});

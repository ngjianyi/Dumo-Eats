import {
  TextInput,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useEffect, useState } from "react";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import {
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  DocumentData,
  collection,
  getDocs,
  getDoc,
  DocumentReference,
} from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import Tabs from "@/components/tabs/Tabs";
import RecipeList from "../Collections/RecipeList";
import CollectionList from "../Collections/CollectionList";
import { COLORS } from "@/constants/Theme";

export default function CollectionScreen({
  collection,
  setCollection,
  refresh,
}: any) {
  const tabs = ["Recipes", "Posts"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [collectionArray, setArray] = useState<string[]>([]);
  const getAllCollection = async () => {
    setArray([]);
    const docref = doc(DATA_BASE, "Users", "" + AUTH.currentUser?.uid);
    const docsnap = (await getDoc(docref)).data();
    setArray(docsnap?.collection);
  };

  useEffect(() => {
    getAllCollection();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Collection</Text>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setCollection(!collection)}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Recipes" ? (
        <RecipeList />
      ) : activeTab === "Posts" ? (
        <CollectionList collectionArray={collectionArray} />
      ) : (
        <Text>Something went wrong</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  header: {
    marginTop: 70,
    flexDirection: "row",
    marginHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "gold",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
  },

  closeButton: {
    position: "absolute",
    left: 4,
  },
});

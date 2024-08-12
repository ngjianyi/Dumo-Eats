import { Dispatch, SetStateAction, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import { DocumentData, DocumentReference, doc } from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import Tabs from "@/components/tabs/Tabs";
import RecipeList from "../Collections/RecipeList";
import CollectionList from "../Collections/CollectionList";
import { COLORS, SIZES } from "@/constants/Theme";
import RefreshCollectionContext from "@/contexts/RefreshCollection";
import { getUserDocSnap } from "@/utils/social/User";
type Props = {
  setCollection: Dispatch<SetStateAction<boolean>>;
};

export default function CollectionScreen({ setCollection }: Props) {
  const refreshCollectionContext = useContext(RefreshCollectionContext);
  const tabs = ["Recipes", "Posts"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [collectionArray, setArray] = useState<DocumentReference[]>([]);

  const getAllCollection = async () => {
    setArray([]);
    const docref = doc(DATA_BASE, "Users", "" + AUTH.currentUser?.uid);
    const docsnap: DocumentData | undefined = (await getUserDocSnap()).data();
    setArray(docsnap?.collection);
  };
  useEffect(() => {
    getAllCollection();
  }, [refreshCollectionContext?.refreshCollection]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setCollection((prev) => !prev)}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Collections</Text>
      </View>

      <View style={styles.tabsContainer}>
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>

      {activeTab === "Recipes" ? (
        <RecipeList />
      ) : activeTab === "Posts" ? (
        <CollectionList collectionArray={collectionArray} />
      ) : (
        <Text>Something went wrong</Text>
      )}
    </SafeAreaView>
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
  closeButton: { position: "absolute", left: SIZES.small },
  headerText: {
    fontSize: SIZES.xLarge,
    fontWeight: "700",
    color: "black",
    marginVertical: SIZES.xSmall / 4,
  },
  tabsContainer: {
    alignItems: "center",
    marginHorizontal: SIZES.xSmall,
  },
});

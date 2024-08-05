import { useContext } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "@/constants/Theme";
import { RecipeContext } from "../RecipeProvider";

type Props = {
  handleClick: () => void;
  navigation: any;
};

export default function Header({ handleClick, navigation }: Props) {
  const { query, setQuery } = useContext<any>(RecipeContext);
  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity
        style={styles.filterBtn}
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Ionicons name="options" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={(text) => setQuery(text)}
          placeholder="What are you looking for?"
          autoCapitalize="none"
          placeholderTextColor={COLORS.gray}
        />
      </View>

      <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.xSmall / 4,
    height: 50,
    width: "100%",
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    marginHorizontal: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  filterBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
});

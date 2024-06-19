import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "@/constants/Theme";

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
  navigation: any;
};

export default function Header({
  query,
  setQuery,
  handleClick,
  navigation,
}: Props) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.welcomeMessage}>Recipes</Text>
      </View>
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
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  welcomeMessage: {
    // fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
    textAlign: "center",
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    // fontFamily: FONT.regular,
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

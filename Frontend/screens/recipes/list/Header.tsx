import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { SIZES, COLORS, FONT } from "@/constants/Theme";

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
};

export default function Header({ query, setQuery, handleClick }: Props) {
  const Drawer = createDrawerNavigator();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.welcomeMessage}>Recipes</Text>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.filterBtn} onPress={handleClick}>
          <AntDesign name="filter" size={24} color="black" />
        </TouchableOpacity>
        <NavigationContainer>
          <Drawer.Navigator>
            {/* Add your Drawer components here */}
          </Drawer.Navigator>
        </NavigationContainer>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={(text) => setQuery(text)}
            placeholder="What are you looking for?"
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
    fontFamily: FONT.bold,
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
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
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

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useContext } from "react";
import { RecipeContext } from "@/screens/recipes/RecipeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Recipe({ recipes, navigation }: any) {
  const { id, setId, recipe, setRecipe } = useContext<any>(RecipeContext);
  const handlePress = (item: any) => {
    setId(item.id);
    setRecipe(item);
    navigation.navigate("indiv");
  };
  return (
    <View style={styles.list}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <TouchableOpacity onPress={() => handlePress(item)}>
                <Text style={styles.jobName} numberOfLines={1}>
                  {item.title}
                </Text>
              </TouchableOpacity>

              <Text style={styles.jobType}>
                Calories: {Math.ceil(item.calories)}
              </Text>
              <View style={styles.buttons}>
                <TouchableOpacity>
                  <Ionicons name="heart-outline" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="chatbubble-outline" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="bookmark-outline" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="arrow-redo-outline" size={25} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.logoContainer}>
              <Image
                src={item.image}
                resizeMode="contain"
                style={styles.logImage}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
  },
  list: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFF",
    margin: 5,
    // ...SHADOWS.medium,
    // shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 70,
    height: 70,
    backgroundColor: "#F3F4F8",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  logImage: {
    width: "90%",
    height: "90%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  jobName: {
    fontSize: 16,
    fontFamily: "DMBold",
    color: "#312651",
  },
  jobType: {
    fontSize: 12 + 2,
    fontFamily: "DMRegular",
    color: "#83829A",
    marginTop: 3,
    textTransform: "capitalize",
  },
  //   recipeItem: {
  //     flex: 1,
  //     backgroundColor: "coral",
  //     marginVertical: 5,
  //     borderRadius: 20,
  //     marginHorizontal: 14,
  //     justifyContent: "center",
  //   },

  //   content: {
  //     flexDirection: "row",
  //     marginVertical: 20,
  //     alignItems: "center",
  //     marginLeft: 30,
  //     justifyContent: "space-between",
  //   },

  //   image: {
  //     backgroundColor: "white",
  //     marginRight: "10%",
  //   },

  //   name: {
  //     fontSize: 25,
  //     fontStyle: "italic",
  //     color: "teal",
  //     marginLeft: 0,
  //   },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
  },
  //   healthy: {
  //     borderRadius: 20,
  //     backgroundColor: "lightgreen",
  //     padding: 10,
  //   },
  //   unhealthy: {
  //     borderRadius: 20,
  //     backgroundColor: "red",
  //     padding: 7,
  //   },
});

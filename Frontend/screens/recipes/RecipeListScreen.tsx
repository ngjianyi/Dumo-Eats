import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import axios, { AxiosError } from "axios";
import Recipes from "@/components/Recipes";
import { SIZES } from "@/constants/Theme";

export default function ListScreen({ navigation }: any) {
  const cuisineTypes = [
    "African",
    "Asian",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];
  const [cuisineType, setCuisineType] = useState("Asian");
  const [query, setQuery] = useState<string>("chicken");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<any>(null);

  const getRecipes = async () => {
    setIsLoading(true);
    const KEY: string = "429fc2334b13424f9ab79a250d6d4a3c";
    const URL: string = `https://api.spoonacular.com/recipes/complexSearch`;
    setIsLoading(true);
    await axios
      .get(URL, {
        params: {
          apiKey: KEY,
          cuisine: cuisineType,
          instructionsRequired: true,
          addRecipeNutrition: true,
          addRecipeInstructions: true,
          number: 5,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        setRecipes(response.data.results);
        setIsLoading(false);
        setError(false);
      })
      .catch((error: Error | AxiosError) => {
        console.error("Error:", error);
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getRecipes();
  }, [cuisineType]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <View style={styles.searchHeader}>
            <View style={styles.subHeader}>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={30} color="black" />
                <TextInput
                  style={styles.input}
                  placeholder="Search for your favourite recipes!"
                  placeholderTextColor={"grey"}
                />
              </View>
              <View style={styles.headerButtons}>
                <TouchableOpacity style={styles.slider}>
                  <FontAwesome6 name="sliders" size={36} color="black" />
                </TouchableOpacity>
                <View style={styles.cameraView}>
                  <TouchableOpacity style={styles.camera}>
                    <Ionicons name="camera-outline" size={55} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.tabsContainer}>
            <FlatList
              data={cuisineTypes}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => {
                    setCuisineType(item);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <Recipes recipes={recipes} navigation={navigation} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SIZES.xSmall / 2,
  },

  list: {
    flex: 1,
  },

  searchHeader: {
    backgroundColor: "lightskyblue",
    borderRadius: 20,
    marginVertical: 20,
    marginHorizontal: 14,
    alignItems: "center",
  },

  subHeader: {
    width: "85%",
  },

  input: {
    padding: 10,
    fontSize: 16,
  },

  searchBar: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginTop: 10,
    borderRadius: 20,
  },

  headerButtons: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  slider: {
    justifyContent: "center",
  },

  cameraView: {
    marginLeft: "30%",
  },

  camera: {
    backgroundColor: "white",
    borderRadius: 160,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  tabsContainer: {
    width: "100%",
    marginTop: 16,
    padding: 3,
  },
  tab: {
    paddingVertical: 12 / 2,
    paddingHorizontal: 12,
    marginHorizontal: 2,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#444262",
  },
  tabText: {
    fontFamily: "DMMedium",
    color: "#444262",
  },

  recipeItem: {
    flex: 1,
    backgroundColor: "coral",
    marginVertical: 5,
    borderRadius: 20,
    marginHorizontal: 14,
    justifyContent: "center",
  },

  content: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
    marginLeft: 30,
    justifyContent: "space-between",
  },

  image: {
    backgroundColor: "white",
    marginRight: "10%",
  },

  name: {
    fontSize: 25,
    fontStyle: "italic",
    color: "teal",
    marginLeft: 0,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10,
  },
  healthy: {
    borderRadius: 20,
    backgroundColor: "lightgreen",
    padding: 10,
  },
  unhealthy: {
    borderRadius: 20,
    backgroundColor: "red",
    padding: 7,
  },
});

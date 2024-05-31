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
    FlatList,
  } from "react-native";
  import React, { useState } from "react";
  import Ionicons from "@expo/vector-icons/Ionicons";
  
  export default function Recipe() {
    const [recipes, setRecipes] = useState([
      {
        name: "Chicken rice",
        key: 1,
        img: require("@/assets/images/taco.png"),
        status: "Healthier!",
        healthy: true,
      },
      {
        name: "Prawn fried rice",
        key: 2,
        img: require("@/assets/images/fried-rice.png"),
        status: " High in sodium!",
        healthy: false,
      },
      {
        name: "Caesar Salad",
        key: 3,
        img: require("@/assets/images/salad.png"),
        status: " Healthier!",
        healthy: true,
      },
  
      {
        name: "Carbonara",
        key: 4,
        img: require("@/assets/images/pasta.png"),
        status: " High in sodium!",
        healthy: false,
      },
    ]);
    return (
      <View style={styles.list}>
        <FlatList
          data={recipes}
          renderItem={({ item }) => (
            <View style={styles.recipeItem}>
              <View style={styles.content}>
                <TouchableOpacity>
                  <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
                <View style={styles.image}>
                  <Image source={item.img} style={{ width: 100, height: 100 }} />
                </View>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity>
                  <Ionicons name="heart-outline" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="chatbubble-outline" size={35} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="bookmark-outline" size={35} color="black" />
                </TouchableOpacity>
                <View>
                  {item.healthy ? (
                    <View style={styles.healthy}>
                      <Text>{item.status}</Text>
                    </View>
                  ) : (
                    <View style={styles.unhealthy}>
                      <Text>{item.status}</Text>
                    </View>
                  )}
                </View>
  
                <TouchableOpacity>
                  <Ionicons name="arrow-redo-outline" size={35} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    list: {
      flex: 1,
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
  
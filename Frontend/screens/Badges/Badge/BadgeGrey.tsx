import { Text, View, StyleSheet, Image, ImageURISource } from "react-native";
import React from "react";

interface Item {
  title: string;
  description: string;
  img: ImageURISource;
  imgGrey: ImageURISource;
}
interface badgeprops {
  item: Item;
}

export default function BadgeGrey({ item }: badgeprops) {
  return (
    <View style={styles.badgeContainer}>
      <View style={styles.icon}>
        <Image style={styles.pic} source={item.imgGrey} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View>
          <Text style={styles.sentence}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    backgroundColor: "floralwhite",
    width: "100%",
    borderWidth: 1,
    borderColor: "maroon",
    alignItems: "center",
    padding: 50,
  },

  icon: {
    position: "absolute",
    left: 10,
  },
  pic: {
    height: 50,
    width: 50,
  },
  content: {
    marginLeft: 50,
  },

  header: {
    marginBottom: 5,
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "gainsboro",
  },

  sentence: {
    fontSize: 14,
    color: "darkgrey",
  },
});

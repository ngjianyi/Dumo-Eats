import { Text, View, StyleSheet, Image, ImageURISource } from "react-native";
import React from "react";
import { COLORS, SIZES, SHADOWS } from "@/constants/Theme";

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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item.imgGrey} />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{item.title}</Text>
        </View>
        <Text style={styles.detailsText}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.xSmall,
    marginVertical: SIZES.xSmall / 2,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.gray2,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  imageContainer: { marginRight: SIZES.xSmall / 2 },
  image: { height: 70, width: 70 },
  textContainer: { marginLeft: SIZES.xSmall / 2, flexGrow: 1 },
  headerTextContainer: {
    marginBottom: SIZES.xSmall / 2,
  },
  headerText: {
    color: COLORS.gray,
    fontSize: SIZES.large,
    fontWeight: "600",
    textAlign: "center",
  },
  detailsText: {
    color: COLORS.gray,
    fontSize: SIZES.medium,
    textAlign: "center",
  },
});

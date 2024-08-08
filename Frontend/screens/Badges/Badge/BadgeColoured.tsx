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

export default function BadgeColoured({ item }: badgeprops) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item.img} />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{item.title}</Text>
        </View>

        <Text style={styles.detailsText}>{item.description}</Text>
      </View>
    </View>
    // <View style={styles.badgeContainer}>
    //   <View style={styles.icon}>
    //     <Image style={styles.pic} source={item.img} />
    //   </View>
    //   <View style={styles.content}>
    //     <View style={styles.header}>
    //       <Text style={styles.title}>{item.title}</Text>
    //     </View>
    //     <View style={styles.description}>
    //       <Text style={styles.sentence}>{item.description}</Text>
    //     </View>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.xSmall,
    marginVertical: SIZES.xSmall / 2,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.lightWhite,
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
    color: COLORS.tertiary,
    fontSize: SIZES.large,
    fontWeight: "600",
    textAlign: "center",
  },
  detailsText: {
    color: "black",
    fontSize: SIZES.medium,
    textAlign: "center",
  },
  // badgeContainer: {
  //   flexDirection: "row",
  //   backgroundColor: "azure",
  //   width: "100%",
  //   borderWidth: 1,
  //   borderColor: "maroon",
  //   alignItems: "center",
  //   padding: 50,
  // },
  // icon: {
  //   position: "absolute",
  //   left: 10,
  // },
  // pic: {
  //   height: 50,
  //   width: 50,
  // },
  // content: {
  //   marginLeft: 50,
  // },
  // header: {
  //   marginBottom: 5,
  // },
  // title: {
  //   fontWeight: "bold",
  //   fontSize: 20,
  // },
  // description: {},
  // sentence: {
  //   fontSize: 14,
  // },
});

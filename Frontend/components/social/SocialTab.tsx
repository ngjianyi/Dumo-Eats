import { View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SIZES } from "@/constants/Theme";

type Props = {
  heart: boolean;
  saved: boolean;
};

export default function SocialTabs({ heart, saved }: Props) {
  return (
    <View style={styles.footer}>
      <View style={styles.leftFooter}>
        <TouchableOpacity onPress={() => {}}>
          {heart ? (
            <Ionicons name="heart" size={25} color="red" />
          ) : (
            <Ionicons name="heart-outline" size={25} color="black" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="chatbubble-outline" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.rightFooter}>
        <TouchableOpacity onPress={() => {}}>
          {saved ? (
            <Ionicons name="bookmark" size={25} color="gold" />
          ) : (
            <Ionicons name="bookmark-outline" size={25} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    paddingTop: SIZES.xSmall,
  },
  leftFooter: {
    flexDirection: "row",
    width: "25%",
    justifyContent: "space-between",
  },
  rightFooter: {
    flex: 1,
    alignItems: "flex-end",
  },
});

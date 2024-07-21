import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { StyleSheet } from "react-native";
import { SIZES, COLORS, SHADOWS } from "../../constants/Theme";

type Props = {
  name: string;
  activeTab: string;
  onHandleSearchType: () => void;
};

function TabButton({ name, activeTab, onHandleSearchType }: Props) {
  return (
    <TouchableOpacity
      style={{
        ...styles.btn,
        backgroundColor: name === activeTab ? COLORS.primary : "#F3F4F8",
      }}
      onPress={onHandleSearchType}
    >
      <Text
        style={{
          ...styles.btnText,
          color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xLarge,
    borderRadius: SIZES.medium,
    margin: SIZES.medium,
    marginLeft: 2,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  btnText: {
    fontFamily: "DMMedium",
    fontSize: SIZES.small,
  },
});

export default TabButton;

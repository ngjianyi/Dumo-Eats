import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { SIZES, COLORS, SHADOWS } from "../../../constants/Theme";

type buttonProps = {
  name: string;
  activeTab: string;
  onHandleSearchType: () => void;
};

function TabButton({ name, activeTab, onHandleSearchType }: buttonProps) {
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

type tabProps = {
  tabs: string[];
  activeTab: string;
  setActiveTab: (item: string) => void;
};

const Tabs = ({ tabs, activeTab, setActiveTab }: tabProps) => {
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        {tabs?.map((tab) => (
          <TabButton
            name={tab}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(tab)}
            key={tab}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.small,
    marginBottom: SIZES.small / 2,
  },
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

export default Tabs;

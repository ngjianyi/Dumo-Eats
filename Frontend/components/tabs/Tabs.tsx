import { Dispatch, SetStateAction } from "react";
import { View, StyleSheet } from "react-native";
import TabButton from "./Tab";
import { SIZES } from "../../constants/Theme";

type Props = {
  tabs: string[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
};

const Tabs = ({ tabs, activeTab, setActiveTab }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
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
  container: {},
  tabs: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default Tabs;

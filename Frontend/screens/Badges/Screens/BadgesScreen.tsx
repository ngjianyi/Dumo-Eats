import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import BadgesList from "../Badge/BadgesList";
import { AutoRefreshContextValue } from "@/contexts/RefreshBadge";
import RefreshBadgeContext from "@/contexts/RefreshBadge";
import { getUserDocSnap } from "@/utils/social/User";
import { COLORS, SIZES } from "@/constants/Theme";

export default function BadgesScreen() {
  const [badges, setBadges] = useState<boolean[]>([]);
  const refreshBadgeContext: AutoRefreshContextValue | undefined =
    useContext(RefreshBadgeContext);
  const getBadges = async () => {
    const docsnap = await getUserDocSnap();
    setBadges(docsnap.data()?.badges);
  };

  useEffect(() => {
    getBadges();
  }, [refreshBadgeContext?.refreshBadge]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Badges</Text>
      </View>
      {/* <View style={styles.header}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>Badges</Text>
      </View> */}
      <View style={styles.badgesContainer}>
        <BadgesList booleanArray={badges} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  headerContainer: {
    margin: SIZES.xSmall,
    marginBottom: SIZES.xSmall / 2,
    alignItems: "center",
  },
  headerText: { fontSize: SIZES.xLarge, fontWeight: "500" },
  badgesContainer: { marginHorizontal: SIZES.xSmall },
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  // },

  // header: {
  //   marginTop: 20,
  //   backgroundColor: "orange",
  //   width: "95%",
  //   paddingVertical: 20,
  // },

  // badgesContainer: {
  //   width: "95%",
  //   marginTop: 10,
  //   flex: 1,
  // },
});

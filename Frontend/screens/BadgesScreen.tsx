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
  } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import BadgesList from "@/components/Badges/BadgesList";
import { doc, DocumentData, collection, getDocs, getDoc, query, where } from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";
import RefreshBadgeContext from "@/contexts/RefreshBadge";

export default function BadgesScreen() {
    const [badges, setBadges] = useState<boolean[]>([])
    const refreshBadgeContext = useContext(RefreshBadgeContext)

    const getBadges = async () => {
        const userRef = doc(DATA_BASE, "Users", "" + AUTH.currentUser?.uid)
        const docsnap = (await getDoc(userRef))
        setBadges(docsnap.data()?.badges)
    }

    //useContext as dependency
    useEffect(() => {
        getBadges()
    }, [refreshBadgeContext?.refreshBadge])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontSize:20, textAlign:"center"}}>Badges</Text>
            </View>
            <View style={styles.badgesContainer}>
                <BadgesList booleanArray={badges}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
    },

    header: {
        marginTop: 20,
        backgroundColor:"orange",
        width:"95%",
        paddingVertical:20,
    },

    badgesContainer: {
        width:"95%",
        marginTop:10,
        flex:1,
    },
})
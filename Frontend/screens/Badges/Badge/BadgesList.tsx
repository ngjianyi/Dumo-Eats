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
    ImageURISource,
  } from "react-native";
import BadgeColoured from "./BadgeColoured";
import BadgeGrey from "./BadgeGrey";
import { doc, DocumentData, collection, getDocs, getDoc, query, where } from "firebase/firestore";
import { AUTH, DATA_BASE } from "@/firebaseCONFIG";

interface Item {
    title: string,
    description: string,
    img: ImageURISource,
    imgGrey: ImageURISource,
}
const badges: Item[] = [
    {   
        title: "Strategic Visionary",
        description: "Set your first calorie goal under Profile",
        img: require("@/assets/images/start-button.png"),
        imgGrey: require("@/assets/images/start-button-grey.png")
    },
    {   
        title: "Baby Steps Explorer",
        description: "Hit your first calorie goal",
        img: require("@/assets/images/baby-steps.png"),
        imgGrey: require("@/assets/images/baby-steps-grey.png")
    },
    {   
        title: "Upcoming Influencer",
        description: "Upload your first Post",
        img: require("@/assets/images/influencer.png"),
        imgGrey: require("@/assets/images/influencer-grey.png")
    },
    {   
        title: "Chasing Success",
        description: "Hit calorie goal for two days straight",
        img: require("@/assets/images/run.png"),
        imgGrey: require("@/assets/images/run-grey.png")
    },
    {   
        title: "Unstoppable Force",
        description: "Hit calorie goal for 7 days straight",
        img: require("@/assets/images/muscular.png"),
        imgGrey: require("@/assets/images/muscular-grey.png")
    },
    
]
interface BadgesListProps {
    booleanArray: boolean[];
}
export default function BadgesList({booleanArray}: BadgesListProps) {
    return(
        <FlatList
            style={{width:"100%"}}
            data={badges}
            renderItem={({item, index}) => (
                booleanArray[index] ? <BadgeColoured item={item}/> : <BadgeGrey item={item}/>
            )}  
        />
    )
}
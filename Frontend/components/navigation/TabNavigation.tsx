import HomeScreen from "@/screens/HomeScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import BadgesScreen from "@/screens/BadgesScreen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Scan from "@/screens/Scan";
import Drawer from "@/screens/recipes/Drawer";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/redux/reducer";
import {useState} from "react"
import {AUTH, DATA_BASE}  from "@/firebaseCONFIG";
import {collection, doc,getDoc,addDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";  
//REMEMBER TO REMOVEEEE
//remove after testing
//create redux store
const store = configureStore({ reducer: rootReducer });

const Tab = createBottomTabNavigator();
//remove later

import AddCollectionFunc from "@/contexts/AddCollectionFunc";
import AutoRefresh from "@/contexts/AutoRefresh";
export default function TabNavigation() {
  
  const addCollection = async (value: any) => {
    const docRefUser = doc(DATA_BASE, "Users", ""+ AUTH.currentUser?.uid);
    const docSnap = await getDoc(docRefUser);    
    await updateDoc(docRefUser, {
        collection: arrayUnion(value)
    });
  }
  const [autoRefresh, setRefresh] = useState(false)
  return (
    <AutoRefresh.Provider value= {{autoRefresh, setRefresh}}>
      <AddCollectionFunc.Provider value= {addCollection}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "springgreen",
            tabBarInactiveTintColor: "black",
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Recipes"
            component={Drawer}
            options={{
              tabBarIcon: ({ color }) => (
                <SimpleLineIcons name="compass" size={25} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Food"
            component={Scan}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="scan-sharp" size={27} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Badges"
            component={BadgesScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <FontAwesome6 name="award" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="person-circle-outline" size={33} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </AddCollectionFunc.Provider>
    </AutoRefresh.Provider>
  );
}

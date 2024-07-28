import HomeScreen from "@/screens/Home/Screens/HomeScreen";
import BadgesScreen from "@/screens/Badges/Screens/BadgesScreen";
import ProfileScreen from "@/screens/Profile/Screen/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Scan from "@/screens/Scan";
import Drawer from "@/screens/recipes/Drawer";
import { useState } from "react";
import AutoRefresh from "@/contexts/AutoRefresh";
import CalorieGoal from "@/contexts/CalorieGoal";
import RefreshBadgeContext from "@/contexts/RefreshBadge";
import RefreshCalorieContext from "@/contexts/RefreshCalorie";
import RefreshCommentContext from "@/contexts/RefreshComment";
import RefreshCollectionContext from "@/contexts/RefreshCollection";

export type TabParamList = {
  Home: undefined;
  Recipes: undefined;
  Food: undefined;
  Badges: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigation() {
  const [autoRefresh, setRefresh] = useState(false);
  const [calorie, setCalorie] = useState(0);
  const [refreshBadge, setRefreshBadge] = useState(false);
  const [refreshCalorie, setRefreshCalorie] = useState(false);
  const [refreshComment, setRefreshComment] = useState(false);
  const [refreshCollection, setRefreshCollection] = useState(false);
  return (
    <RefreshCollectionContext.Provider
      value={{ refreshCollection, setRefreshCollection }}
    >
      <RefreshCommentContext.Provider
        value={{ refreshComment, setRefreshComment }}
      >
        <RefreshCalorieContext.Provider
          value={{ refreshCalorie, setRefreshCalorie }}
        >
          <RefreshBadgeContext.Provider
            value={{ refreshBadge, setRefreshBadge }}
          >
            <CalorieGoal.Provider value={{ calorie, setCalorie }}>
              <AutoRefresh.Provider value={{ autoRefresh, setRefresh }}>
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
                        <SimpleLineIcons
                          name="compass"
                          size={25}
                          color={color}
                        />
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
                        <Ionicons
                          name="person-circle-outline"
                          size={33}
                          color={color}
                        />
                      ),
                    }}
                  />
                </Tab.Navigator>
              </AutoRefresh.Provider>
            </CalorieGoal.Provider>
          </RefreshBadgeContext.Provider>
        </RefreshCalorieContext.Provider>
      </RefreshCommentContext.Provider>
    </RefreshCollectionContext.Provider>
  );
}

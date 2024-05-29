import HomeScreen from "@/screens/HomeScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import RecipesScreen from "@/screens/RecipesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import BadgesScreen from "@/screens/BadgesScreen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Scan from "@/screens/Scan";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
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
        component={RecipesScreen}
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
  );
}

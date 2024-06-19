import {
  Dimensions,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import Filter from "./Filter";
import RecipesStack from "../RecipesStack";
import { RecipeProvider } from "../RecipeProvider";

export default function Drawer() {
  const Drawer = createDrawerNavigator();

  const CustomDrawerContentComponent = (props: any) => (
    <SafeAreaView
    // forceInset={{ top: "always", horizontal: "never" }}
    >
      <Filter />
      {/* <DrawerItemList {...props} /> */}
    </SafeAreaView>
  );

  return (
    <RecipeProvider>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            width: Dimensions.get("window").width / 1.25,
          },
          headerShown: false,
        }}
        drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
      >
        <Drawer.Screen name="Home" component={RecipesStack} />
        <Drawer.Screen name="Filter" component={Filter} />
      </Drawer.Navigator>
    </RecipeProvider>
  );
}

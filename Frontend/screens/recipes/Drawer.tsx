import { Dimensions, SafeAreaView } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import Filter from "./list/Filter/Filter";
import { RecipeProvider } from "./RecipeProvider";
import RecipeListScreen from "./list/RecipeListScreen";

export default function Drawer() {
  const Drawer = createDrawerNavigator();

  const CustomDrawerContentComponent = (props: any) => (
    <SafeAreaView>
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
        <Drawer.Screen name="Home" component={RecipeListScreen} />
        <Drawer.Screen name="Filter" component={Filter} />
      </Drawer.Navigator>
    </RecipeProvider>
  );
}

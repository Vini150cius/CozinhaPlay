import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Image, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import InitScreen from "./screens/InitScreen";
import AntDesign from "react-native-vector-icons/AntDesign";
import Teste from "./screens/Teste";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import RecipesScreen from "./screens/RecipesScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerApp() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#b18461",
        drawerInactiveTintColor: "#ccc",
        drawerStyle: {
          backgroundColor: "#1c2024",
          width: 250,
        },
      }}
      drawerContent={(props) => (
        <View style={{ flex: 1 }}>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/icon.png")} style={styles.logo} />
          </View>
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        </View>
      )}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="home"
              size={size}
              color={focused ? "#b18461" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Teste"
        component={Teste}
        options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="test"
              size={size}
              color={focused ? "#b18461" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Receitas"
        component={RecipesScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="test"
              size={size}
              color={focused ? "#b18461" : "#ccc"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="InitScreen"
    >
      <Stack.Screen name="DrawerApp" component={DrawerApp} />
      <Stack.Screen name="InitScreen" component={InitScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

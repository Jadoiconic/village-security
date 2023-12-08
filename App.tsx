import "react-native-gesture-handler";
import GetStarted from "./src/Screens/GetStarted";
import Ionicons from "@expo/vector-icons/Ionicons";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import SiginInScreen from "./src/Screens/login/SiginInScreen";
import HomeScreen from "./src/Screens/home/HomeScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import RegisterScreen from "./src/Screens/register/RegisterScreen";
import { useEffect, useState } from "react";
import { auth } from "./src/services/config";

const Tab = createMaterialBottomTabNavigator();

function HomeBottomTab() {
  return (
    <Tab.Navigator
      activeColor="gray"
      inactiveColor="#fff"
      barStyle={{ backgroundColor: "#6C63FF", height: 70 }}
      screenOptions={{ tabBarLabel: "" }}
    >
      <Tab.Screen
        name="Main"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="add-user" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Visitor"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="users" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="user" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);



  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={GetStarted}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={SiginInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeBottomTab}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

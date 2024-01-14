import "react-native-gesture-handler";
import GetStarted from "./src/Screens/GetStarted";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Octicons } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import SiginInScreen from "./src/Screens/login/SiginInScreen";
import HomeScreen from "./src/Screens/home/HomeScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import RegisterScreen from "./src/Screens/register/RegisterScreen";
import ProfileScreen from "./src/Screens/profile/ProfileScreen";
import UsersScreen from "./src/Screens/users/UsersScreen";
import ListOfVisitors from "./src/Screens/visitors/ListOfVisitors";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "./src/services/config";

const Tab = createMaterialBottomTabNavigator();

function HomeBottomTab() {
  const [users, setUsers] = useState("");
  const userId = auth.currentUser?.email;
  const fetchData = async () => {
    try {
      const q = query(collection(db, "Users"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data: " + error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [userId]);
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
        component={ListOfVisitors}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="checklist" size={26} color={color} />
          ),
        }}
      />

      {/* {Boolean(users.role === "village") && ( */}
        <Tab.Screen
          name="Users"
          component={UsersScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="users" color={color} size={26} />
            ),
          }}
        />
      {/* )} */}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
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

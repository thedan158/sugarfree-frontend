import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/home";
import LoginScreen from "./screens/login";
import Chatroom from "./screens/Chatroom";
import MealScreen from "./screens/MealScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SignupScreen from "./screens/SignupScreen";
import PillScreen from "./screens/PillScreen";
import ReportScreen from "./screens/report";
import OtpScreen from "./screens/OtpScreen";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import SplashScreen from "./screens/SplashScreen";
import Chat from "./screens/Chat";
import EditProfileScreen from "./screens/EditProfileScreen";
import ChangePassword from "./screens/ChangePassword";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatroomForDoctor from "./screens/ChatroomForDoctor";
import { Provider, useSelector } from "react-redux";
import store from "./app/store";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function HomeTabScreen() {
  const userRole = useSelector((state) => state.user.userRole);
  const [isDoctor, setIsDoctor] = useState(false);

  const getData = async () => {
    if (userRole === "doctor") {
      setIsDoctor(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#1C6BA4",
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Meal",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="food-fork-drink"
              color={color}
              size={size}
            />
          ),
        }}
        name="Meal"
        component={MealScreen}
      />
      <Tab.Screen
        options={{
          tabBarBadge: 2,
          headerShown: false,
          tabBarLabel: "Doctor Connect",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="doctor" color={color} size={size} />
          ),
        }}
        name="Chatroom"
        component={isDoctor ? ChatroomForDoctor : Chatroom}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
function Navigation() {
  const state = useSelector((state) => state);
  console.log("current state", state);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="HomeTab"
          options={{ headerShown: false }}
          component={HomeTabScreen}
        />
        <Stack.Screen
          name="Signup"
          options={{ headerShown: false }}
          component={SignupScreen}
        />
        <Stack.Screen
          name="Pill"
          options={{
            headerStyle: {
              backgroundColor: "#009DC7",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={PillScreen}
        />
        <Stack.Screen
          name="Report"
          options={{
            headerStyle: {
              backgroundColor: "#009DC7",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={ReportScreen}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnBoarding"
          component={OnBoardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            headerStyle: {
              backgroundColor: "#1C6BA4",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerStyle: {
              backgroundColor: "#1C6BA4",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

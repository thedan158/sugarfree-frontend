import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import Chatroom from "./screens/Chatroom";
import MealScreen from "./screens/MealScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SignupScreen from "./screens/SignupScreen";
import PillScreen from "./screens/PillScreen";
import ReportScreen from "./screens/ReportScreen";
import OtpScreen from "./screens/OtpScreen";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import SplashScreen from "./screens/SplashScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function HomeTabScreen() {
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
        component={Chatroom}
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
export default function App() {
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
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

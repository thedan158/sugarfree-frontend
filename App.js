import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/home";
import LoginScreen from "./screens/login";
import ListDoctorScreen from "./screens/doctor/ListDoctorScreen";
import MealScreen from "./screens/MealScreen";
import ProfileScreen from "./screens/profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SignupScreen from "./screens/SignupScreen";
import PillScreen from "./screens/pill/pillList";
import OtpScreen from "./screens/OtpScreen";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import SplashScreen from "./screens/SplashScreen";
import Chat from "./screens/doctor/Chatroom";
import EditProfileScreen from "./screens/EditProfileScreen";
import ChangePassword from "./screens/ChangePassword";
import { LogBox } from "react-native";
import ListPatientMessageScreen from "./screens/doctor/ListPatientMessageScreen";
import { Provider, useSelector } from "react-redux";
import store from "./app/store";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ReportHistory from "./screens/report/reportHistory";
import ReportChart from "./screens/report/reportChart";
import NewListDoctorScreen from "./screens/doctor/NewListDoctorScreen";
import PillHistoryScreen from "./screens/pill/pillHistory";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PrescriptionScreen from "./screens/pill/prescriptionScreen";
import NewPrescriptionScreen from "./screens/pill/newPrescriptionScreen";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
function HomeTabScreen() {
  const userRole = useSelector((state) => state.user.role);
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
        component={
          userRole === "doctor" ? ListPatientMessageScreen : NewListDoctorScreen
        }
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
function ReportTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Chart" component={ReportChart} />
      <TopTab.Screen name="History" component={ReportHistory} />
    </TopTab.Navigator>
  );
}
function PillTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Pill List" component={PillScreen} />
      <TopTab.Screen name="Pill History" component={PillHistoryScreen} />
    </TopTab.Navigator>
  );
}
function Navigation() {
  const state = useSelector((state) => state.user);
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
              backgroundColor: "#1C6BA4",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={PillTabs}
        />
        <Stack.Screen
          name="PrescriptionScreen"
          options={{
            title: "Prescription",
            headerStyle: {
              backgroundColor: "#1C6BA4",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={PrescriptionScreen}
        />
        <Stack.Screen
          name="NewPrescriptionScreen"
          options={{
            title: "Prescription",
            headerStyle: {
              backgroundColor: "#1C6BA4",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={NewPrescriptionScreen}
        />
        <Stack.Screen
          name="ReportTab"
          options={{
            headerStyle: {
              backgroundColor: "#009DC7",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            title: "REPORT",
          }}
          component={ReportTabs}
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
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#1C6BA4",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          name="Chat"
          component={Chat}
        />
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

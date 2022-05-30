import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomTextInput from "../components/CustomTextInput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const handleLogin = async() => {
    console.log('Login');
    const data = {
      username: username,
      password: password
    }
    console.log(data);
    // Passing configuration object to axios
    const res = await axios.post(
      `https://d8ab-125-235-210-33.ap.ngrok.io/auth/login`,
      {
        username: username,
        password: password,
      }
    );

    const { success } = res.data;
    console.log(success);
    if (success) {
      await AsyncStorage.setItem("userInfo", JSON.stringify(data));
      navigation.navigate("HomeTab");
    } else {
      Alert.alert("Login failed");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginHeaderContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/logo.png")}
          ></Image>
        </View>
      </View>
      <View style={styles.loginBodyContainer}>
        <Text style={styles.loginHeader}>Welcome to</Text>
        <Text style={styles.loginHeader2}>SugarCare</Text>
      </View>
      <View style={styles.loginFooterContainer}>
        <CustomTextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        <CustomTextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={isSecureEntry}
          icon={
            <TouchableOpacity
              onPress={() => {
                setIsSecureEntry((prev) => !prev);
              }}
            >
              <MaterialCommunityIcons
                name={isSecureEntry ? "eye-off-outline" : "eye-outline"}
                size={25}
                color="#22d5d4"
              />
            </TouchableOpacity>
          }
          iconPosition="right"
        />
        {/* Forgot password  */}
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={()=>navigation.navigate('Signup')}
            style={styles.buttonSignupContainer}
          >
            <Text style={styles.buttonSignupText}>SIGN UP</Text>
            <MaterialCommunityIcons
              name="account-plus-outline"
              size={25}
              color="#22d5d4"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
            <MaterialCommunityIcons name="login" size={25} color="#fff" />
          </TouchableOpacity>

          {/* Sign up section  */}
        </View>
        {/* Login button section  */}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loginHeaderContainer: {
    flex: 4,
    backgroundColor: "#22d5d4",
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomEndRadius: 500,
  },
  loginBodyContainer: {
    flex: 1.5,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  loginFooterContainer: {
    flex: 5.5,
    backgroundColor: "#22d5d4",
    alignItems: "center",
    borderTopLeftRadius: 500,
  },
  logoContainer: {
    width: 150,
    height: 150,
    backgroundColor: "#f0f",
    borderRadius: 100,
  },
  logo: { width: 150, height: 150, borderRadius: 100 },
  loginHeader: {
    margin: 10,
    fontSize: 18,
    fontWeight: "500",
    color: "#9AA0B8",
  },
  loginHeader2: { fontSize: 30, fontWeight: "bold", color: "#22d5d4" },

  forgotPassword: { color: "#fff", fontSize: 15, marginTop: 10 },
  buttonSignupContainer: {
    width: "40%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  buttonSignupText: {
    fontSize: 20,
    color: "#22d5d4",
    fontWeight: "bold",
    marginRight: 10,
  },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
  },
  buttonContainer: {
    width: "40%",
    alignItems: "center",
    backgroundColor: "#4D77FF",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginRight: 10,
  },
});

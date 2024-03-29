import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../components/CustomTextInput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation();
  const handleSignup = async () => {
    console.log("Signup");
    const data = {
      username: username,
      password: password,
      phoneNumber: phoneNumber,
      fullname: fullname,
    };
    const res = await axios.post(
      `http://localhost:3000/otp/sendOtp`,
      { phoneNumber: "+84" + phoneNumber.substring(1) }
    ).catch(err => {
      console.log(err);
      Alert.alert("Signup failed");
    });
    const { success } = res.data;
    console.log(success);
    if (success) {
      await AsyncStorage.setItem("SignupInfo", JSON.stringify(data));
      navigation.navigate("Otp");
  };
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signupHeaderContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
        ></Image>
        <Text style={styles.signupHeader}>SugarCare</Text>
      </View>
      <View style={styles.signupBodyContainer}>
        <Text style={styles.signupHeader2}>SIGN UP</Text>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.inputScrollView}>
            <CustomTextInput
              placeholder="Fullname"
              value={fullname}
              onChangeText={(text) => setFullname(text)}
            />
            <CustomTextInput
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <CustomTextInput
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
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
          </ScrollView>
        </View>
      </View>
      <View style={styles.signupFooterContainer}>
        <TouchableOpacity onPress={handleSignup} style={styles.buttonSignup}>
          <Text style={styles.buttonSignupText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.buttonLogin}
        >
          <Text style={styles.buttonLoginText}>GO BACK TO LOGIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  signupHeaderContainer: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
  },
  signupBodyContainer: {
    flex: 6,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  signupFooterContainer: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: { height: 100, width: 100, borderRadius: 50 },
  signupHeader: { fontSize: 30, fontWeight: "bold", color: "#22d5d4" },
  signupHeader2: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#9AA0B8",
    margin: 10,
  },
  buttonSignup: {
    width: "80%",
    height: 50,
    backgroundColor: "#22d5d4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonSignupText: { fontSize: 20, color: "white", fontWeight: "bold" },
  buttonLogin: {
    width: "80%",
    height: 50,
    backgroundColor: "#9AA0B8",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonLoginText: { fontSize: 20, color: "white", fontWeight: "bold" },
  inputScrollView: { backgroundColor: "#fff", margin: 10 },
});

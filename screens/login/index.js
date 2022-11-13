import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomTextInput from "../../components/CustomTextInput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LoadingOwner from "../../components/LoadingOwner";
import { useDispatch, useSelector } from "react-redux";
import { getAPIActionJSON } from "../../api/ApiActions";
import { styles } from "./styles";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedin = useSelector((state) => state.user.isLoggedin);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const [visibleLoad, setVisibleLoad] = React.useState(false);
  const loadingAndPopup = () => {
    setVisibleLoad(true);
    setTimeout(() => {
      setVisibleLoad(false);
      setVisible(true);
    }, 5000);
  };
  const handleLogin = () => {
    try {
      loadingAndPopup();
      dispatch(
        getAPIActionJSON("login", {
          username: username,
          password: password,
        })
      );
    } catch (error) {
      console.log("catch error", error);
      Alert.alert("Login failed");
    }
  };
  useEffect(() => {
    isLoggedin && navigation.navigate("HomeTab");
  }, [isLoggedin]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginHeaderContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo.png")}
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
            onPress={() => navigation.navigate("Signup")}
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
        {/* Modal loading  */}
        <LoadingOwner visible={visibleLoad}></LoadingOwner>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

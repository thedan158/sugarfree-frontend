import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React, { useEffect, useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const SplashScreen = ({ navigation }) => {
  const isLoggedin = useSelector((state) => state.user.isLoggedin);
  const [isTimePassed, setIsTimePassed] = useState(false);
  const progress = () => {
    setTimeout(function () {
      setIsTimePassed(true);
    }, 3000);
  };
  useEffect(() => {
    progress();
  }, []);

  if (!isTimePassed) {
    return (
      <View style={styles.container}>
        <View style={styles.splashHeaderContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/images/logo.png")}
            />
          </View>
        </View>
        <View style={styles.splashBodyContainer}>
          <Text style={styles.splashHeader}>SUGARCARE</Text>
        </View>
        <View style={styles.splashFooterContainer}>
          <CircularProgress
            value={100}
            inActiveStrokeColor={"#2ecc71"}
            inActiveStrokeOpacity={0.2}
            progressValueColor={"#fff"}
            activeStrokeColor={"#22d5d4"}
            duration={3000}
            size={windowWidth * 0.5}
          />
        </View>
      </View>
    );
  }
  navigation.replace(isLoggedin ? "HomeTab" : "OnBoarding");
  return null;
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  splashHeaderContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  splashBodyContainer: {
    flex: 2,
    alignItems: "center",
  },
  splashFooterContainer: {
    flex: 5,
    alignItems: "center",
  },
  logoContainer: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: windowHeight * 0.1,
  },
  logo: { width: 200, height: 200 },
  splashHeader: { fontSize: 40, fontWeight: "bold", color: "#22d5d4" },
});

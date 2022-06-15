import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { Children } from "react";
import { useNavigation } from "@react-navigation/core";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CustomScreen = ({ icon, title, previousScreen, children }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header  */}

      {/* Order details  */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 9.5,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default CustomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: windowWidth,
    height: windowHeight,
    justifyContent: "center",
  },
  containerHeaderTop: {
    flexDirection: "row",
    marginTop: 20,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 0.5,
  },
  icon: {
    height: 30,
    width: 30,
    top: 5,
  },
  containerTitleInfo: {
    marginTop: 10,
    maxWidth: "80%",

    alignItems: "center",
    alignContent: "center",
  },
  txtHome: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginHorizontal: 5,
  },
});

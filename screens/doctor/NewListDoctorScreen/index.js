import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import DoctorButton from "../../../components/DoctorButton";
import DoctorCard from "../../../components/DoctorCard";
import { useIsFocused } from "@react-navigation/native";

const NewListDoctorScreen = () => {
  const isFocus = useIsFocused();
  const listDoctor = useSelector((state) => state.user.listDoctor);
  const [fontLoaded] = useFonts({
    "NunitoSans-Bold": require("../../../assets/fonts/Nunito_Sans/NunitoSans-Bold.ttf"),
    "NunitoSans-Light": require("../../../assets/fonts/Nunito_Sans/NunitoSans-Light.ttf"),
  });
  const renderUser = Array.from({ length: listDoctor.length }, (_, index) => {
    return <DoctorButton doctorData={listDoctor[index]} />;
  });
  const renderUserView = Array.from(
    { length: listDoctor.length },
    (_, index) => {
      return <DoctorCard doctorData={listDoctor[index]} />;
    }
  );
  if (!fontLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Doctors</Text>
      </View>
      <View style={styles.searchSection}>
        <View style={styles.searchIconSection}>
          <MaterialCommunityIcons name="magnify" size={24} color="#8AA0BC" />
        </View>
        <View style={styles.searchInputSection}>
          <TextInput
            placeholder="Search for doctors..."
            // selectTextOnFocus='true'
          ></TextInput>
        </View>
        <View style={styles.filterIcon}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color="#8AA0BC"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.bodyText}>Live Doctors</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={styles.userScrollView}
      >
        {renderUser}
      </ScrollView>
      <Text style={styles.bodyText}>Popular Doctors</Text>
      <ScrollView contentContainerStyle={styles.userScrollView}>
        {renderUserView}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewListDoctorScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  headerContainer: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontFamily: "NunitoSans-Bold",
  },
  bodyText: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: "NunitoSans-Bold",
  },
  searchSection: {
    height: 50,
    backgroundColor: "#EEF6FC",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    borderRadius: 20,
    flexDirection: "row",
  },
  searchIconSection: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  userScrollView: {
    paddingLeft: 15,
  },
  searchInputSection: { flex: 7, justifyContent: "center" },
  filterIcon: { flex: 1.5, alignItems: "center", justifyContent: "center" },
});

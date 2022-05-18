import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const MealScreen = () => {
  return (
    //Welcome To Meal Screen
    <SafeAreaView style={styles.container}>
      {/* Schedule Section */}
      <View style={styles.scheduleSection}>
        <View style={styles.scheduleHeaderContainer}>
          <Text style={styles.scheduleText}>Schedule</Text>
          <TouchableOpacity style={styles.calendarIcon}>
            <MaterialCommunityIcons
              name="calendar"
              size={25}
              color={"#7B8D9E"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.scheduleFooterContainer}>
          <View style={{ flex: 1 }}>
            <ScrollView
              horizontal="true"
              flexDirection="row"
              contentContainerStyle={styles.calendarScrollView}
            >
              <View style={styles.calendarButton}>
                <TouchableOpacity style={styles.dateContainer}>
                  <Text style={styles.dateInMonthSelected}>12</Text>
                  <Text style={styles.dateInWeekSelected}>Tue</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.calendarButton} backgroundColor="#DCEDF9">
                <TouchableOpacity style={styles.dateContainer}>
                  <Text style={styles.dateInMonth}>13</Text>
                  <Text style={styles.dateInWeek}>Wed</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.calendarButton} backgroundColor="#DCEDF9">
                <TouchableOpacity style={styles.dateContainer}>
                  <Text style={styles.dateInMonth}>14</Text>
                  <Text style={styles.dateInWeek}>Thu</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.calendarButton} backgroundColor="#DCEDF9">
                <TouchableOpacity style={styles.dateContainer}>
                  <Text style={styles.dateInMonth}>15</Text>
                  <Text style={styles.dateInWeek}>Fri</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.calendarButton} backgroundColor="#DCEDF9">
                <TouchableOpacity style={styles.dateContainer}>
                  <Text style={styles.dateInMonth}>16</Text>
                  <Text style={styles.dateInWeek}>Sat</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.calendarButton} backgroundColor="#DCEDF9">
                <TouchableOpacity style={styles.dateContainer}>
                  <Text style={styles.dateInMonth}>17</Text>
                  <Text style={styles.dateInWeek}>Sun</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.calendarButton} backgroundColor="#DCEDF9">
                <TouchableOpacity style={styles.dateContainer}>
                  <Text style={styles.dateInMonth}>18</Text>
                  <Text style={styles.dateInWeek}>Mon</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
      {/* End Section */}

      {/* Breakfast Section */}
      <View style={styles.breakfastSection}>
        <Text style={styles.breakfastText}>Breakfast </Text>
        <View style={styles.breakfastCard}>
          <View style={styles.breakfastCardHeader}>
            <Image
              style={styles.mealImage}
              source={require("../assets/images/breakfast.jpg")}
            ></Image>
          </View>
          <View style={styles.breakfastCardBody}>
            <Text style={styles.CardBodyTextBreakfast1}>7:30 AM</Text>
            <Text style={styles.CardBodyTextBreakfast2}>Fried Eggs</Text>
          </View>
        </View>
      </View>
      {/* End Section */}

      {/* Lunch Section */}
      <View style={styles.lunchSection}>
        <Text style={styles.breakfastText}>Lunch </Text>
        <View style={styles.lunchCard}>
          <View style={styles.breakfastCardHeader}>
            <Image
              style={styles.mealImage}
              source={require("../assets/images/lunch.png")}
            ></Image>
          </View>
          <View style={styles.breakfastCardBody}>
            <Text style={styles.CardBodyText1}>12:00 AM</Text>
            <Text style={styles.CardBodyText2}>Pho</Text>
          </View>
        </View>
      </View>
      {/* End Section */}

      {/* Dinner Section */}
      <View style={styles.dinnerSection}>
        <Text style={styles.breakfastText}>Dinner </Text>
        <View style={styles.dinnerCard}>
          <View style={styles.breakfastCardHeader}>
            <Image
              style={styles.mealImage}
              source={require("../assets/images/dinner.jpeg")}
            ></Image>
          </View>
          <View style={styles.breakfastCardBody}>
            <Text style={styles.CardBodyText1}>7:30 PM</Text>
            <Text style={styles.CardBodyText2}>Seafood Noddles</Text>
          </View>
        </View>
      </View>
      {/* End Section */}
    </SafeAreaView>
  );
};

export default MealScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scheduleSection: {
    flex: 2.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  breakfastSection: { flex: 2.5 },
  lunchSection: { flex: 2.5 },
  dinnerSection: { flex: 2.5 },

  scheduleHeaderContainer: {
    flex: 3,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  scheduleFooterContainer: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  scheduleText: {
    flex: 9,
    alignItems: "flex-start",
    justifyContent: "center",
    fontSize: 25,
    fontWeight: "600",
    color: "#0E1012",
  },
  calendarIcon: { flex: 1, justifyContent: "center", alignItems: "flex-end" },
  calendarButton: {
    width: 55,
    height: 65,
    backgroundColor: "#1C6BA4",
    borderRadius: 17,
    margin: 10,
    shadowOpacity: 0.05,
  },
  calendarScrollView: {
    flex: 1,
    flexDirection: "row",
  },
  dateContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  dateInMonth: { fontSize: 20, fontWeight: "500" },
  dateInWeek: { fontSize: 15, fontWeight: "300", marginTop: 5 },
  dateInMonthSelected: { fontSize: 20, fontWeight: "500", color: "#fff" },
  dateInWeekSelected: {
    fontSize: 15,
    fontWeight: "300",
    marginTop: 5,
    color: "#fff",
  },
  breakfastText: {
    flex: 2,
    fontSize: 15,
    fontWeight: "300",
    color: "#7D96B5",
    marginLeft: 15,
  },
  breakfastCard: {
    flex: 8,
    backgroundColor: "#1C6BA4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
    padding: 10,
    width: "90%",
    margin: 10,
  },
  breakfastCardHeader: {
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    borderRadius: 15,
    margin: 10,
  },
  breakfastCardBody: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  breakfastCardFooter: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mealImage: { width: "100%", height: "100%", borderRadius: 20 },
  CardBodyText1: { color: "#fff", fontSize: 15, fontWeight: "300" },
  CardBodyText2: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 5,
  },
  lunchCard: {
    flex: 8,
    backgroundColor: "#0AA1DD",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
    padding: 10,
    width: "90%",
    margin: 10,
  },
  dinnerCard: {
    flex: 8,
    backgroundColor: "#79DAE8",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
    padding: 10,
    width: "90%",
    margin: 10,
  },
  CardBodyTextBreakfast1: { color: "#fff", fontSize: 15, fontWeight: "300" },
  CardBodyTextBreakfast2: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 5,
  },
});

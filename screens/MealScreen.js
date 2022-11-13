import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MealScreen = () => {
  const currentDate = new Date().getDate();
  const weekday = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  const currentDayinNumber = new Date().getDay();
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [breakfastName, setBreakfastName] = useState("");
  const [lunchName, setLunchName] = useState("");
  const [dinnerName, setDinnerName] = useState("");
  const currentDay = weekday[new Date().getDay()];
  const [isPress, setIsPress] = React.useState(false);
  const touchProps = {
    activeOpacity: 0.85,
    underlayColor: "#1C6BA4",
    onShowUnderlay: () => setIsPress(false),
    style: isPress ? styles.calendarButtonPressed : styles.calendarButton,
  };
  const handleTouch = () => {
    setBreakfastName(breakfast[0].name);
    setLunchName(lunch[0].name);
    setDinnerName(dinner[0].name);
  };
  const handleTouch1 = () => {
    setBreakfastName(breakfast[1].name);
    setLunchName(lunch[1].name);
    setDinnerName(dinner[1].name);
  };
  const handleTouch2 = () => {
    setBreakfastName(breakfast[2].name);
    setLunchName(lunch[2].name);
    setDinnerName(dinner[2].name);
  };
  const handleTouch3 = () => {
    setBreakfastName(breakfast[3].name);
    setLunchName(lunch[3].name);
    setDinnerName(dinner[3].name);
  };
  const handleTouch4 = () => {
    setBreakfastName(breakfast[4].name);
    setLunchName(lunch[4].name);
    setDinnerName(dinner[4].name);
  };

  useEffect(() => {
    console.log("MealScreen");
    const getMeal = async () => {
      const resBreakfast = await axios.get(
        `http://localhost:3000/meal/getMeal/breakfast`
      );
      const { message, success } = resBreakfast.data;
      console.log(message);
      console.log(success);
      setBreakfast(message);
      setBreakfastName(message[0].name);

      const resLunch = await axios.get(
        `http://localhost:3000/meal/getMeal/lunch`
      );
      console.log(resLunch.data);
      setLunch(resLunch.data.message);
      setLunchName(resLunch.data.message[0].name);
      const resDinner = await axios.get(
        `http://localhost:3000/meal/getMeal/dinner`
      );
      console.log(resDinner.data);
      setDinner(resDinner.data.message);
      setDinnerName(resDinner.data.message[0].name);
    };
    getMeal().catch((err) => console.log(err));
  }, [currentDay]);
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
              <TouchableHighlight {...touchProps} onPress={handleTouch}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.dateInMonth}>{currentDate}</Text>
                  <Text style={styles.dateInWeek}>{currentDay}</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight {...touchProps} onPress={handleTouch1}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.dateInMonth}>{currentDate + 1}</Text>
                  <Text style={styles.dateInWeek}>
                    {weekday[currentDayinNumber + 1]}
                  </Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight {...touchProps} onPress={handleTouch2}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.dateInMonth}>{currentDate + 2}</Text>
                  <Text style={styles.dateInWeek}>
                    {weekday[currentDayinNumber + 2]}
                  </Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight {...touchProps} onPress={handleTouch3}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.dateInMonth}>{currentDate + 3}</Text>
                  <Text style={styles.dateInWeek}>
                    {weekday[currentDayinNumber + 3]}
                  </Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight {...touchProps} onPress={handleTouch4}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.dateInMonth}>{currentDate + 4}</Text>
                  <Text style={styles.dateInWeek}>
                    {weekday[currentDayinNumber + 4]}
                  </Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight {...touchProps}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.dateInMonth}>{currentDate + 5}</Text>
                  <Text style={styles.dateInWeek}>
                    {weekday[currentDayinNumber + 5]}
                  </Text>
                </View>
              </TouchableHighlight>
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
            <Text style={styles.CardBodyTextBreakfast2}>{breakfastName}</Text>
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
            <Text style={styles.CardBodyText2}>{lunchName}</Text>
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
            <Text style={styles.CardBodyText2}>{dinnerName}</Text>
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
    backgroundColor: "#DCEDF9",
    borderRadius: 17,
    margin: 10,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    alignItems: "center",
    justifyContent: "center",
  },
  calendarButtonPressed: {
    width: 55,
    height: 65,
    backgroundColor: "#1C6BA4",
    borderRadius: 17,
    margin: 10,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    alignItems: "center",
    justifyContent: "center",
  },
  calendarScrollView: {
    flex: 1,
    flexDirection: "row",
  },
  dateContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  dateInMonth: { fontSize: 20, fontWeight: "500", color: "#0E1012" },
  dateInWeek: {
    fontSize: 15,
    fontWeight: "300",
    marginTop: 5,
    color: "#0E1012",
  },
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

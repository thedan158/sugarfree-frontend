import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import { styles } from "./styles";
import useFetchReport from "../../../hooks/useFetchReports";

const ReportChart = () => {
  const defaultData = [
    { sugarLevel: 0, BMI: 17.96, date: "18/06/2022" },

    { BMI: 20.45, date: "13/11/2022", sugarLevel: 0 },

    { sugarLevel: 0, BMI: 33.33, date: "14/11/2022" },

    { BMI: 21.91, sugarLevel: 0, date: "27/11/2022" },
  ];
  const [latestHistory, setLatestHistory] = useState(defaultData);
  const [latestHistoryBar, setLatestHistoryBar] = useState(defaultData);
  const [selectedTime, setSelectedTime] = useState("7");
  const [selectedTimeBar, setSelectedTimeBar] = useState("7");
  const userHistory = useSelector((state) => state.user.userHistory);
  const reviewing = useSelector((state) => state.user.reviewing);
  const timeContainer = ["Latest week", "Latest 10 days", "Latest 15 days"];

  const labels = latestHistory.map((item) => {
    return item.date.slice(0, 5);
  });
  const data = [
    {
      data: latestHistory.map((item) => {
        return parseInt(item.sugarLevel);
      }),
    },
  ];
  const labelsBar = latestHistoryBar.map((item) => {
    return item.date.slice(0, 5);
  });
  const dataBar = [
    {
      data: latestHistoryBar.map((item) => {
        return item.sugarLevel;
      }),
    },
  ];

  const getLatestHistory = (history) => {
    if (history.length === 0) return;
    if (history.length > selectedTime) {
      setLatestHistory(
        history.splice(history.length - selectedTime, history.length)
      );
      return;
    }
    setLatestHistory(history);
    return;
  };
  const getLatestHistoryBar = (history) => {
    if (history.length === 0) return;
    if (history.length > selectedTimeBar) {
      setLatestHistoryBar(
        history.splice(history.length - selectedTimeBar, history.length)
      );
      return;
    }
    setLatestHistoryBar(history);
    return;
  };
  useEffect(() => {
    getLatestHistory(userHistory);
    getLatestHistoryBar(userHistory);
  }, [userHistory, selectedTime]);
  useFetchReport(reviewing);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LineChart
        data={{
          labels: labels,
          datasets: data ? data : defaultData,
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#009DC7",
          backgroundGradientTo: "#009DC7",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
      />
      <SelectDropdown
        buttonStyle={styles.selectTimeType}
        defaultValueByIndex={0}
        dropdownStyle={styles.dropdownStyle}
        data={timeContainer}
        onSelect={(selectedItem, index) => {
          if (selectedItem === "Latest week") setSelectedTime(7);
          if (selectedItem === "Latest 10 days") setSelectedTime(10);
          if (selectedItem === "Latest 15 days") setSelectedTime(15);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return <Text style={{ color: "white" }}>{selectedItem}</Text>;
        }}
      />
      <BarChart
        data={{
          labels: labelsBar,
          datasets: dataBar ? dataBar : defaultData,
        }}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#009DC7",
          backgroundGradientTo: "#009DC7",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
      <SelectDropdown
        buttonStyle={styles.selectTimeType}
        defaultValueByIndex={0}
        dropdownStyle={styles.dropdownStyle}
        data={timeContainer}
        onSelect={(selectedItem, index) => {
          if (selectedItem === "Latest week") setSelectedTimeBar(7);
          if (selectedItem === "Latest 10 days") setSelectedTimeBar(10);
          if (selectedItem === "Latest 15 days") setSelectedTimeBar(15);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return <Text style={{ color: "white" }}>{selectedItem}</Text>;
        }}
      />
    </ScrollView>
  );
};

export default ReportChart;

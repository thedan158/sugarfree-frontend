import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
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
      margin: 15,
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
    pillDescription: {
      marginLeft: 10,
      marginBottom: 10,
      fontSize: 15,
      fontFamily: "NunitoSans-Light",
    },
    searchInputSection: { flex: 7, justifyContent: "center" },
    filterIcon: { flex: 1.5, alignItems: "center", justifyContent: "center" },
  });
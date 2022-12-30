import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  selectTimeType: {
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 17,
    borderColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 15,
    width: 300,
    height: 50,
    backgroundColor: "#009DC7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    borderWidth: 1,
  },
  dropdownStyle: {
    backgroundColor: "#FFFCFB",
    width: 300,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
  },
});

import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  profileButton: {
    width: 300,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#1C6BA4",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    paddingLeft: 20,
  },
  profileButtonText: {
    marginLeft: 20,
    fontSize: 17,
    fontWeight: "500",
    color: "#fff",
  },
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center" },
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
  reportHeaderContainer: {
    flex: 2.5,
    backgroundColor: "#009DC7",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  reportImage: {
    width: windowWidth * 0.5,
    height: "80%",
    resizeMode: "contain",
  },
  reportHeaderText: {
    fontSize: 30,
    color: "#fff",
    marginLeft: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  body: {
    flex: 7.5,
    justifyContent: "center",
    marginTop: "1.5%",
    backgroundColor: "transparent",
    marginBottom: "0%",
  },
  containerMenuInfo: {
    flex: 3,
    justifyContent: "center",
    marginTop: "1.5%",
    backgroundColor: "transparent",
    marginBottom: "0%",
  },
  containerItemFlatList: {
    width: windowWidth - 40,
    height: "100%",
    paddingHorizontal: "5%",
    backgroundColor: "#FFFFFF",
    marginVertical: "2%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 15,
    paddingBottom: "1.5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flex: 1,
    flexDirection: "row",
  },
  containerImageItem: {
    flex: 2.5,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    padding: "2%",
  },
  containerInfoItem: {
    flex: 7.5,
    marginLeft: "10%",
  },
  containersugarlvItem: {
    flex: 2,
    marginBottom: "3%",
  },
  containerSearchView: {
    flexDirection: "row",
    width: windowWidth - 80,
    justifyContent: "flex-start",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "3%",
    maxWidth: windowWidth - 80,
    borderRadius: 45,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    flex: 1,
    elevation: 7,
  },
  txtsugarlvItem: {
    color: "#000",
  },
  txtdateItem: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  icSearch: {
    height: 20,
    width: 20,
    marginRight: "5%",
    marginLeft: 15,
  },
  imgSourceItem: {
    margin: "2%",
    borderRadius: 15,
    height: 100,
    width: 100,
    alignSelf: "center",
    flex: 1,
    padding: "2%",
  },
});

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const ReportScreen = () => {
  const [dataFromState, setNewData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const userInfo = await AsyncStorage.getItem("userInfo");
      const user = JSON.parse(userInfo);
      console.log(user.username);
      const res = await axios.post(
        "https://d8ab-125-235-210-33.ap.ngrok.io/report/getAllReport",
        {
          username: user.username,
        }
      );
      const { success, message } = res.data;
      console.log(message);
      console.log(success);
      setNewData(message);
    };
    getData().catch((err) => console.log(err));
  }, []);

  const [search, setSearch] = useState("");
  const [masterData, setMasterData] = useState([]);
  useEffect(() => {
    setMasterData(dataFromState);
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterData.filter(function (item) {
        const itemData = item.date ? item.date.toLowerCase() : "".toUpperCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setNewData(newData);
      setSearch(text);
    } else {
      setNewData(masterData);
      setSearch(text);
    }
  };
  const FlatListItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.containerItemFlatList}>
        <View style={styles.containerImageItem}>
          <Image
            source={
              item.sugarLevel < 140 && item.sugarLevel > 70
                ? require("../assets/images/good.png")
                : require("../assets/images/warning.png")
            }
            style={styles.imgSourceItem}
          ></Image>
        </View>

        <View style={styles.containerInfoItem}>
          <Text style={styles.txtdateItem}>{item.date}</Text>
          <View style={styles.containersugarlvItem}>
            <Text style={styles.txtsugarlvItem}>
              Sugar Levels: {item.sugarLevel}
            </Text>
            <Text>BMI: {item.BMI}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.reportHeaderContainer}>
        <Image
          source={require("../assets/images/clipboard.png")}
          style={styles.reportImage}
        ></Image>
        <Text style={styles.reportHeaderText}>{"Health\n Reports"}</Text>
      </View>
      <View style={styles.containerSearchView}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="magnify"
            size={30}
            color="black"
            style={styles.icSearch}
          ></MaterialCommunityIcons>
        </TouchableOpacity>
        <TextInput
          placeholder="Search Doctors..."
          value={search}
          onChangeText={(text) => searchFilterFunction(text)}
          underlineColorAndroid="transparent"
          style={{ maxWidth: windowWidth - 120 }}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.containerMenuInfo}>
          <FlatList
            data={dataFromState}
            renderItem={({ item, index }) => {
              return <FlatListItem item={item} index={index} />;
            }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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

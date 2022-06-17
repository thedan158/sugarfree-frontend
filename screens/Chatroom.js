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
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chatroom = ({navigation}) => {
  
  const [dataFromState, setNewData] = useState([]);
  const [search, setSearch] = useState("");
  const [masterData, setMasterData] = useState([]);
  const [username, setUsername] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        "https://9a46-171-253-177-116.ap.ngrok.io/auth/getAllDoctors"
      );
      const { success, message } = res.data;
      console.log(message);
      if (!success) {
        console.log("error");
      }
      setNewData(message);
      setMasterData(message);
      const userInfo = await AsyncStorage.getItem("userInfo");
      const user = JSON.parse(userInfo);
      setUsername(user.username);
    };
    getData().catch((err) => console.log(err));
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterData.filter(function (item) {
        const itemData = item.doctorName
          ? item.doctorName.toLowerCase()
          : "".toUpperCase();
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
      <TouchableOpacity
        onPress={()=> navigation.navigate("Chat", {item, username, isDoctor})}
        style={styles.containerItemFlatList}
      >
        <View style={styles.containerImageItem}>
          <Image source={{uri: item.imagePath}} style={styles.imgSourceItem} />
        </View>

        <View style={styles.containerInfoItem}>
          <Text style={styles.txtdoctorNameItem}>Dr. {item.fullname}</Text>
          <View style={styles.containeremailItem}>
            <Text style={styles.txthospitalItemInfo2}>{item.hospital}</Text>

            <Text style={styles.txtemailItem}>{item.email}</Text>
            <Text>(+84){item.phoneNumber}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.doctorHeaderContainer}>
        <Image
          source={require("../assets/images/doctor.png")}
          style={styles.doctorImage}
        ></Image>
        <Text style={styles.doctorHeaderText}>
          {"Connect to\n our doctors"}
        </Text>
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
      <View style={styles.doctorContainer}>
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

export default Chatroom;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  doctorHeaderContainer: {
    flex: 2.5,
    backgroundColor: "#009DC7",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  doctorContainer: { flex: 6.5, backgroundColor: "#fff" },
  doctorImage: {
    width: windowWidth * 0.5,
    height: "80%",
    resizeMode: "contain",
  },
  doctorHeaderText: {
    fontSize: 30,
    color: "#fff",
    marginLeft: 10,
    textAlign: "center",
    fontWeight: "bold",
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
  containeremailItem: {
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
  txtemailItem: {
    color: "#000",
  },
  txthospitalItemInfo2: {
    color: "#000",
  },
  txtdoctorNameItem: {
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

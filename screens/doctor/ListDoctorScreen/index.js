import {
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
import { styles } from "./styles";
import { getStatelessAPI } from "../../../api/ApiActions";

const ListDoctorScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const [dataFromState, setNewData] = useState([]);
  const [search, setSearch] = useState("");
  const [masterData, setMasterData] = useState([]);

  const getData = async () => {
    try {
      const res = await getStatelessAPI("getAllDoctor", null);
      const { message } = res;
      setNewData(message);
      setMasterData(message);
    } catch (error) {
      console.log(error);
    }
  };
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
        onPress={() => navigation.navigate("Chat", { item })}
        style={styles.containerItemFlatList}
      >
        <View style={styles.containerImageItem}>
          <Image
            source={{ uri: item.imagePath }}
            style={styles.imgSourceItem}
          />
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.doctorHeaderContainer}>
        <Image
          source={require("../../../assets/images/doctor.png")}
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

export default ListDoctorScreen;

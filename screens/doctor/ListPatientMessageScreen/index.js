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
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import { getStatelessAPI } from "../../../api/ApiActions";

const ListPatientMessageScreen = ({ navigation }) => {
  const isFocus = useIsFocused();
  const windowWidth = Dimensions.get("window").width;
  const username = useSelector((state) => state.user.username);
  const [dataFromState, setNewData] = useState([]);
  const [search, setSearch] = useState("");
  const [masterData, setMasterData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getData = async () => {
    const res = await getStatelessAPI(
      "getPatientMessage",
      null,
      null,
      null,
      `/${username}`
    );
    const { message } = res;
    setNewData(message);
    setMasterData(message);
    setRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, [refreshing, isFocus]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterData.filter(function (item) {
        const itemData = item.username
          ? item.username.toLowerCase()
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
          <Text style={styles.txtdoctorNameItem}>{item.username}</Text>
          <Text style={styles.txtMessage}>{item.lastestMessage}</Text>
          <Text style={styles.txtTime}>{item.lastsend}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.doctorHeaderContainer}>
        <Image
          source={require("../../../assets/images/doctor.png")}
          style={styles.doctorImage}
        ></Image>
        <Text style={styles.doctorHeaderText}>
          {"Connect to\n your patients"}
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
          placeholder="Search Patient..."
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
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ListPatientMessageScreen;

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
import { styles } from "../../report/reportHistory/styles";
import { useDispatch, useSelector } from "react-redux";
import useFetchReport from "../../../hooks/useFetchReports";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getStatelessAPI } from "../../../api/ApiActions";

const PillHistoryScreen = () => {
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const [masterData, setMasterData] = useState([]);
  const reviewing = useSelector((state) => state.user.reviewing);
  const username = useSelector((state) => state.user.username);
  const [dataFromState, setNewData] = useState();
  const handleGetPatientData = async (person) => {
    try {
      const res = await getStatelessAPI(
        "getAllPrescription",
        null,
        null,
        null,
        `/${person}`
      );
      setNewData(res.message);
    } catch (error) {
      console.log(error);
    }
  };
  if (reviewing === "") {
    useFetchReport();
    useEffect(() => {
      dispatch({
        type: "changeCurrentPrescription",
        data: [],
      });
      handleGetPatientData(username);
    }, [isFocus]);
  } else {
    useEffect(() => {
      dispatch({
        type: "changeCurrentPrescription",
        data: [],
      });
      handleGetPatientData(reviewing);
    }, [isFocus]);
  }
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
      <TouchableOpacity
        onPress={() => navigation.navigate("PrescriptionScreen", { item })}
        style={styles.containerItemFlatList}
      >
        <Image
          source={
            item.status === "Finished"
              ? require("../../../assets/images/good.png")
              : require("../../../assets/images/warning.png")
          }
          style={{
            height: 80,
            width: 80,
            borderRadius: 20,
            marginHorizontal: 10,
          }}
        />
        <View style={styles.containerInfoItem}>
          <Text style={styles.txtdateItem}>{item.date}</Text>
          <View style={styles.containersugarlvItem}>
            <Text style={styles.txtsugarlvItem}>Doctor: {item.doctorName}</Text>
            <Text>Duration: {item.duration}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <View style={styles.searchIconSection}>
          <MaterialCommunityIcons name="magnify" size={24} color="#8AA0BC" />
        </View>
        <View style={styles.searchInputSection}>
          <TextInput
            placeholder="Search for medicine..."
            // selectTextOnFocus='true'
          ></TextInput>
        </View>
        <View style={styles.filterIcon}>
          <TouchableOpacity onPress={() => console.log(masterData)}>
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color="#8AA0BC"
            />
          </TouchableOpacity>
        </View>
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
      {reviewing !== "" && (
        <TouchableOpacity
          onPress={() => navigation.navigate("NewPrescriptionScreen")}
          style={styles.profileButton}
        >
          <MaterialCommunityIcons name="plus" size={25} color={"#fff"} />
          <Text style={styles.profileButtonText}>Create new prescriptions</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default PillHistoryScreen;

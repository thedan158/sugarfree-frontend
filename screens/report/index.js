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
import { useSelector } from "react-redux";
import { getStatelessAPI } from "../../api/ApiActions";
const windowWidth = Dimensions.get("window").width;

const ReportScreen = () => {
  const [dataFromState, setNewData] = useState([]);
  const [search, setSearch] = useState("");
  const [masterData, setMasterData] = useState([]);
  const username = useSelector((state) => state.user.username);

  const getData = async () => {
    try {
      const res = await getStatelessAPI("getAllReport", { username: username });
      const { message } = res;
      setNewData(message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
                ? require("../../assets/images/good.png")
                : require("../../assets/images/warning.png")
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
          source={require("../../assets/images/clipboard.png")}
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

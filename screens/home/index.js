import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import IconBadge from "react-native-icon-badge";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAPIActionJSON } from "../../api/ApiActions";
import { styles } from "./styles";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const username = useSelector((state) => state.user.username);
  const fullname = useSelector((state) => state.user.fullname);
  const userImagePath = useSelector((state) => state.user.userImagePath);
  const todaySugarLevel = useSelector((state) => state.user.todaySugarLevel);
  const todayBMI = useSelector((state) => state.user.todayBMI);
  const [BMIComment, setBMIComment] = useState("");
  const [SugarComment, setSugarComment] = useState("");
  const [hasGoodStatus, setHasGoodStatus] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sugarlevel, setSugarlevel] = useState(todaySugarLevel);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBMIVisible, setModalBMIVisible] = useState(false);

  const handleData = () => {
    if (todayBMI < 18.5) {
      setBMIComment("Underweight");
    }
    if (todayBMI >= 18.5 && todayBMI <= 24.9) {
      setBMIComment("Normal");
    }
    if (todayBMI >= 25) {
      setBMIComment("Overweight");
    }
    if (todaySugarLevel < 140 && todaySugarLevel > 70) {
      setHasGoodStatus(true);
      setSugarComment("Normal");
    } else {
      setHasGoodStatus(false);
      setSugarComment("Bad");
    }
  };
  //*Region Handle Sugar Levels
  const handleSugarate = async () => {
    dispatch(
      getAPIActionJSON("saveTodaySugarLevel", {
        username: username,
        sugarLevel: sugarlevel,
      })
    );
    if (sugarlevel < 140 && sugarlevel > 70) {
      setHasGoodStatus(true);
      setSugarComment("Normal");
    } else {
      setHasGoodStatus(false);
      setSugarComment("Bad");
    }
    setModalVisible(!modalVisible);
  };
  //*End Region Handle Sugar Levels

  //*Region Handle BMI
  const handleBMI = async () => {
    const newBMI = Math.round((weight / (height / 100) ** 2) * 100) / 100;
    if (newBMI < 18.5) {
      setBMIComment("Underweight");
    }
    if (newBMI >= 18.5 && newBMI <= 24.9) {
      setBMIComment("Normal");
    }
    if (newBMI >= 25) {
      setBMIComment("Overweight");
    }
    dispatch(
      getAPIActionJSON("saveTodayBMI", {
        username: username,
        BMI: newBMI,
      })
    );
    setModalBMIVisible(!modalBMIVisible);
  };
  //*End Region Handle BMI


  //*Region Handle Data
  useEffect(() => {
    dispatch(getAPIActionJSON("getTodayReport", { username: username }));
  }, [username]);
  useEffect(() => {
    handleData();
  }, [todaySugarLevel, todayBMI]);
  useEffect(() => {
    dispatch(getAPIActionJSON("getUser", null, null, username));
  }, [isFocus]);
  //*End Region Handle Data

  return (
    //   Welcome to SugarFree!
    <SafeAreaView style={styles.container}>
      {/* Header Section */}

      <View style={styles.headerSection}>
        <View style={styles.headerTextSection}>
          <Text style={styles.headerText}>👋 Hello!</Text>
          <Text style={styles.headerUsername}>{fullname}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.headerUserSection}
        >
          <IconBadge
            MainElement={
              <Image
                style={styles.headerUserImage}
                source={{
                  uri:
                    userImagePath !== ""
                      ? userImagePath
                      : "https://firebasestorage.googleapis.com/v0/b/le-repas.appspot.com/o/images%2Fgood.png?alt=media&token=de139437-3a20-4eb3-ba56-f6a591779d15",
                }}
              />
            }
            IconBadgeStyle={{
              width: 10,
              height: 18,
              backgroundColor: "#009DC7",
            }}
          />
        </TouchableOpacity>
      </View>
      {/* End Section */}

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchIconSection}>
          <MaterialCommunityIcons name="magnify" size={24} color="#8AA0BC" />
        </View>
        <View style={styles.searchInputSection}>
          <TextInput
            placeholder="Search for medical..."
            // selectTextOnFocus='true'
          ></TextInput>
        </View>
        <View style={styles.filterIcon}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color="#8AA0BC"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* End Section */}

      {/* Service Section */}
      <View style={styles.serviceSection}>
        <View style={styles.serviceHeaderTextContainer}>
          <Text style={styles.serviceHeaderText}>Services</Text>
        </View>
        <View style={styles.serviceButtonContainer}>
          <View style={styles.serviceButton} backgroundColor="#DCEDF9">
            <TouchableOpacity
              onPress={() => navigation.navigate("Chatroom")}
              style={styles.serviceButton}
            >
              <View style={styles.buttonIcon}>
                <MaterialCommunityIcons
                  name="doctor"
                  size={40}
                  color="#1C6BA4"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.serviceButton} backgroundColor="#FAF0DB">
            <TouchableOpacity
              onPress={() => navigation.navigate("Pill")}
              style={styles.serviceButton}
            >
              <View style={styles.buttonIcon}>
                <MaterialCommunityIcons name="pill" size={40} color="#E09F1F" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.serviceButton} backgroundColor="#D6F6FF">
            <TouchableOpacity
              onPress={() => navigation.navigate("Report")}
              style={styles.serviceButton}
            >
              <View style={styles.buttonIcon}>
                <MaterialCommunityIcons
                  name="clipboard-pulse-outline"
                  size={40}
                  color="#009DC7"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.serviceButton} backgroundColor="#F2E3E9">
            <TouchableOpacity
              onPress={() => navigation.navigate("Meal")}
              style={styles.serviceButton}
            >
              <View style={styles.buttonIcon}>
                <MaterialCommunityIcons
                  name="food-apple-outline"
                  size={40}
                  color="#9D4C6C"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* End Section */}

      {/* Blood Sugar Section */}
      <View style={styles.cardSection}>
        <View
          style={
            !hasGoodStatus
              ? styles.sugarRateContainerWarning
              : styles.sugarRateContainer
          }
        >
          <MaterialCommunityIcons
            name={!hasGoodStatus ? "alpha-x-circle" : "check-bold"}
            color="#fff"
            size={50}
          ></MaterialCommunityIcons>
        </View>
        <View style={styles.sugarButtonContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.sugarButton}
          >
            <MaterialCommunityIcons
              name="calendar-plus"
              color={"white"}
              size={20}
            />
            <Text style={styles.sugarButtonText}>TODAY SUGARATE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sugarButton}
            onPress={() => setModalBMIVisible(!modalBMIVisible)}
          >
            <MaterialCommunityIcons
              name="weight-lifter"
              color={"white"}
              size={20}
            />
            <Text style={styles.sugarButtonText}>BMI CALCULATOR</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* End Section */}

      {/* Status Section */}
      <View style={styles.statusSection}>
        <View style={styles.statusHeaderTextContainer}>
          <Text style={styles.statusText}>Status</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.BMISection}>
            <MaterialCommunityIcons
              style={styles.BMIIcon}
              name="weight-lifter"
              size={15}
              color={"#9D4C6C"}
            />
            <Text style={styles.BMIText}>{todayBMI}</Text>
          </View>
          <View style={styles.CommentSection}>
            <MaterialCommunityIcons
              style={styles.commentIcon}
              name="comment-outline"
              size={15}
              color={"#1C6BA4"}
            />
            <View style={styles.commentTextContainer}>
              <Text style={styles.commentText}>{BMIComment} BMI</Text>
              <Text style={styles.commentText}>{SugarComment} Sugar Rate</Text>
            </View>
          </View>
        </View>
      </View>
      {/* End Section */}

      {/* Modal Section */}

      {/* Modal Input Sugarate */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>INPUT TODAY SUGARATE</Text>
            <TextInput
              style={styles.sugarateInput}
              keyboardType="numeric"
              placeholder="Enter sugarate..."
              onChangeText={(text) => setSugarlevel(text)}
              value={sugarlevel}
              maxLength={5} //setting limit of input
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalButtonTextCancel}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={() => handleSugarate()}
              >
                <Text style={styles.modalButtonTextConfirm}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* End Modal */}

      {/* Modal BMI CALCULATION */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalBMIVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalBMIVisible(!modalBMIVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>INPUT MEASUREMENTS</Text>
            <View style={styles.modalInputContainer}>
              <TextInput
                style={styles.measureInput}
                keyboardType="numeric"
                placeholder="Enter Weight..."
                onChangeText={(text) => setWeight(text)}
                value={weight}
                maxLength={3} //setting limit of input
              />
              <TextInput
                style={[styles.measureInput, { marginLeft: 15 }]}
                keyboardType="numeric"
                placeholder="Enter Height..."
                onChangeText={(text) => setHeight(text)}
                value={height}
                maxLength={3} //setting limit of input
              />
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setModalBMIVisible(!modalBMIVisible)}
              >
                <Text style={styles.modalButtonTextCancel}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={() => handleBMI()}
              >
                <Text style={styles.modalButtonTextConfirm}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* End Modal */}
      {/* End Section */}
    </SafeAreaView>
  );
};

export default HomeScreen;

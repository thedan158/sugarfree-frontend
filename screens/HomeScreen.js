import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBMIVisible, setModalBMIVisible] = useState(false);
  const handleSugarate = () => {
    setModalVisible(!modalVisible);
  };
  const handleBMI = () => {
    setModalBMIVisible(!modalBMIVisible);
  };
  return (
    //   Welcome to SugarFree!
    <SafeAreaView style={styles.container}>
      {/* Header Section */}

      <View style={styles.headerSection}>
        <View style={styles.headerTextSection}>
          <Text style={styles.headerText}>👋 Hello!</Text>
          <Text style={styles.headerUsername}>Dan Nguyen</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.headerUserSection}
        >
          <Image
            style={styles.headerUserImage}
            source={require("../assets/images/user.jpg")}
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
            <TouchableOpacity style={styles.serviceButton}>
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
            <TouchableOpacity style={styles.serviceButton}>
              <View style={styles.buttonIcon}>
                <MaterialCommunityIcons name="pill" size={40} color="#E09F1F" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.serviceButton} backgroundColor="#D6F6FF">
            <TouchableOpacity style={styles.serviceButton}>
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
        <View style={styles.sugarRateContainer}>
          <MaterialCommunityIcons
            name="check-bold"
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
            <Text style={styles.BMIText}>19</Text>
          </View>
          <View style={styles.CommentSection}>
            <MaterialCommunityIcons
              style={styles.commentIcon}
              name="comment-outline"
              size={15}
              color={"#1C6BA4"}
            />
            <View style={styles.commentTextContainer}>
              <Text style={styles.commentText}>Good BMI</Text>
              <Text style={styles.commentText}>Good Sugar Rate</Text>
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
              // onChangeText={(text) => this.onChanged(text)}
              // value={this.state.myNumber}
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
                // onChangeText={(text) => this.onChanged(text)}
                // value={this.state.myNumber}
                maxLength={3} //setting limit of input
              />
              <TextInput
                style={[styles.measureInput, { marginLeft: 15 }]}
                keyboardType="numeric"
                placeholder="Enter Height..."
                // onChangeText={(text) => this.onChanged(text)}
                // value={this.state.myNumber}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerSection: {
    flex: 1.5,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  searchSection: {
    flex: 1,
    width: "90%",
    height: "80%",
    backgroundColor: "#EEF6FC",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    borderRadius: 20,
    flexDirection: "row",
  },
  serviceSection: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  cardSection: {
    flex: 3,
    width: "90%",
    backgroundColor: "#D6F6FF",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    borderRadius: 20,
    flexDirection: "row",
    shadowOpacity: 0.05,
  },
  statusSection: {
    flex: 2.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  headerText: { fontSize: 15, color: "#000", fontWeight: "400" },
  headerTextSection: {
    flex: 7,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerUsername: {
    fontSize: 25,
    fontWeight: "600",
    color: "#000",
    marginTop: 10,
  },
  headerUserSection: {
    flex: 3,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headerUserImage: { width: 50, height: 50, borderRadius: 20, marginTop: 5 },
  serviceHeaderText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    alignContent: "center",
  },
  serviceButtonContainer: {
    flex: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  serviceButton: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    shadowOpacity: 0.05,
  },
  serviceHeaderTextContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  buttonIcon: { margin: 10 },
  searchIconSection: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInputSection: { flex: 7, justifyContent: "center" },
  filterIcon: { flex: 1.5, alignItems: "center", justifyContent: "center" },
  sugarRateContainer: {
    flex: 4,
    width: "40%",
    height: "80%",
    backgroundColor: "#6BCB77",
    borderRadius: 20,
    elevation: 10,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  sugarButtonContainer: {
    flex: 6,
    width: "80%",
    height: "80%",
    alignItems: "center",
  },
  sugarButton: {
    backgroundColor: "#009DC7",
    borderRadius: 10,
    flex: 5,
    margin: 5,
    width: "80%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    flexDirection: "row",
  },
  sugarButtonText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
    marginLeft: 5,
  },
  BMISection: {
    flex: 4,
    backgroundColor: "#F5E1E9",
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    width: "40%",
    borderRadius: 20,
    elevation: 10,
    margin: 10,
    shadowOpacity: 0.05,
  },
  CommentSection: {
    flex: 6,
    backgroundColor: "#DCEDF9",
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    width: "40%",
    borderRadius: 20,
    elevation: 10,
    margin: 10,
    shadowOpacity: 0.05,
  },
  statusHeaderTextContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
  },
  statusText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    alignContent: "center",
  },
  statusContainer: {
    flex: 9,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  BMIIcon: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 10,
    width: "70%",
  },
  BMIText: {
    flex: 6,
    fontSize: 25,
    color: "black",
    fontWeight: "600",
  },
  BMITextContainer: {},
  commentIcon: {
    flex: 2,
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 10,
    width: "70%",
    elevation: 10,
  },
  commentText: {
    fontSize: 15,
    color: "black",
    fontWeight: "600",
    textAlign: "center",
  },
  commentTextContainer: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    width: "80%",
    height: 200,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: { fontSize: 20, fontWeight: "bold", color: "#9AA0B8" },
  sugarateInput: {
    height: "40%",
    borderColor: "#9AA0B8",
    borderWidth: 1,
    width: "80%",
    marginTop: 10,
    borderRadius: 10,
    width: "50%",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  modalButtonContainer: {
    width: "80%",
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-around",
    alignItems: "center",
  },
  modalButtonCancel: {
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#9AA0B8",
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonConfirm: {
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#009DC7",
    marginLeft: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonTextCancel: { fontSize: 15, color: "white", fontWeight: "bold" },
  modalButtonTextConfirm: { fontSize: 15, color: "white", fontWeight: "bold" },
  modalInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    height: "40%",
  },
  measureInput: {
    height: "80%",
    borderColor: "#9AA0B8",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
    width: "40%",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

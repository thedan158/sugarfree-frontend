import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getStatelessAPI } from "../../../api/ApiActions";

const PrescriptionScreen = ({ route }) => {
  const { item } = route.params;
  console.log(item);
  const [isFinished, setIsFinished] = useState(item.status === "Finished");
  const reviewing = useSelector((state) => state.user.reviewing);
  const listDoctor = useSelector((state) => state.user.listDoctor);
  const doctorPosition = listDoctor.findIndex(
    (doctor) => item.doctorName === doctor.fullname
  );
  const handleFinish = () => {
    setIsFinished(true);
    const res = getStatelessAPI(
      "createPrescription",
      { ...item, status: "Finished" },
      null,
      null,
      `/${item.patientUsername}`
    );
  };
  const [fontLoaded] = useFonts({
    "NunitoSans-Bold": require("../../../assets/fonts/Nunito_Sans/NunitoSans-Bold.ttf"),
    "NunitoSans-Light": require("../../../assets/fonts/Nunito_Sans/NunitoSans-Light.ttf"),
  });
  const renderMedicine = Array.from(
    { length: item.medicineList.length },
    (_, index) => {
      return (
        <View style={styles.medicineTableContainer}>
          <View style={{ flex: 7, padding: 10 }}>
            <Text style={styles.medicineName}>
              {item.medicineList[index].name}
            </Text>
            <Text style={styles.medicineDes}>
              {item.medicineList[index].des}
            </Text>
          </View>
          <View style={{ flex: 1.5, padding: 10 }}>
            <Text style={styles.medicineName}>
              {item.medicineList[index].quantity}
            </Text>
          </View>
          <View style={{ flex: 1.5, padding: 10 }}>
            <Text style={styles.medicineName}>
              {item.medicineList[index].unit}
            </Text>
          </View>
        </View>
      );
    }
  );
  if (!fontLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={styles.headerCardBG}>
        <View style={styles.doctorContainer}>
          <Image
            source={{
              uri: listDoctor[doctorPosition].imagePath
                ? listDoctor[doctorPosition].imagePath
                : "https://firebasestorage.googleapis.com/v0/b/sugarcare-9f6bd.appspot.com/o/images%2Fpills%2Fshare-cach-su-dung-apidra-solostar-dieu-tri-benh-tieu-duong-1608549082.png?alt=media&token=31d4b43a-2dac-49f7-a0c4-0a42dd224299",
            }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 20,
              marginHorizontal: 20,
            }}
          />
          <View>
            <Text style={styles.doctorBoxBoldText}>
              {listDoctor[doctorPosition].fullname}
            </Text>
            <Text style={styles.infoBoxLightText}>
              {listDoctor[doctorPosition].description}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.dateContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxLightText}>Status</Text>
          <Text style={styles.infoBoxBoldText}>
            {isFinished ? "Finished" : "Unfinished"}
          </Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxLightText}>Duration</Text>
          <Text style={styles.infoBoxBoldText}>{item.duration}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxLightText}>Start Date</Text>
          <Text style={styles.infoBoxBoldText}>{item.date}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ margin: 15 }}>
        <View style={{ height: 1000 }}>
          <Text style={styles.bodyText}>Diagnostic</Text>
          <Text style={styles.pillDescription}>{item.diagnostic}</Text>
          <Text style={styles.bodyText}>Medicine Prescription</Text>
          {renderMedicine}
          {reviewing === "" && (
            <View style={{ alignItems: "center" }}>
              {!isFinished ? (
                <TouchableOpacity
                  onPress={handleFinish}
                  style={styles.profileButton}
                >
                  <MaterialCommunityIcons
                    name="check"
                    size={25}
                    color={"#fff"}
                  />
                  <Text style={styles.profileButtonText}>
                    I have finished this
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  disabled={true}
                  onPress={handleFinish}
                  style={styles.profileButtonFinish}
                >
                  <MaterialCommunityIcons
                    name="check"
                    size={25}
                    color={"black"}
                  />
                  <Text style={styles.profileButtonTextFinish}>FINISHED</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrescriptionScreen;

const styles = StyleSheet.create({
  headerCardBG: {
    backgroundColor: "#1C6BA4",
    height: 200,
    borderBottomEndRadius: 250,
    borderBottomStartRadius: 250,
  },
  medicineTableContainer: {
    flexDirection: "row",
  },
  bodyText: {
    margin: 15,
    fontSize: 18,
    fontFamily: "NunitoSans-Bold",
  },
  medicineName: {
    fontSize: 15,
    fontFamily: "NunitoSans-Bold",
  },
  medicineDes: {
    fontFamily: "NunitoSans-Light",
    fontSize: 15,
  },
  dateContainer: {
    flexDirection: "row",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    padding: 15,
    fontFamily: "NunitoSans-Light",
    fontSize: 20,
  },
  pillDescription: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 15,
    fontFamily: "NunitoSans-Light",
  },
  infoBox: {
    width: 95,
    height: 95,
    margin: 10,
    backgroundColor: "#E5E5E5",
    borderRadius: 25,
    justifyContent: "center",
  },
  infoBoxBoldText: {
    marginHorizontal: 10,
    fontSize: 13,
    fontFamily: "NunitoSans-Bold",
  },
  doctorBoxBoldText: {
    marginHorizontal: 10,
    fontSize: 18,
    fontFamily: "NunitoSans-Bold",
  },
  infoBoxLightText: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 15,
    fontFamily: "NunitoSans-Light",
  },
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
  profileButtonFinish: {
    width: 300,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#E5E5E5",
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
  profileButtonTextFinish: {
    marginLeft: 20,
    fontSize: 17,
    fontWeight: "500",
    color: "black",
  },
  doctorContainer: {
    alignItems: "center",
    flexDirection: "row",
    margin: 30,
    marginTop: 100,
    backgroundColor: "white",
    height: 120,
    borderRadius: 30,
    shadowOpacity: 0.5,
  },
});

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from "react";
import CustomMedicineForm from "../../../components/CustomMedicineForm";
import { useDispatch, useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import moment from "moment";
import { getStatelessAPI } from "../../../api/ApiActions";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const NewPrescriptionScreen = () => {
  const navigation = useNavigation();
  var currentPrescription = useSelector(
    (state) => state.user.currentPrescription
  );
  const reviewing = useSelector((state) => state.user.reviewing);
  const [imagePath, setImagePath] = useState(null);
  const [patientName, setPatientName] = useState("");
  const isFocus = useIsFocused();
  const getPatientData = async () => {
    try {
      const res = await getStatelessAPI(
        "getUser",
        null,
        null,
        null,
        `/${reviewing}`
      );
      console.log(res.data);
      setImagePath(res.data.imagePath ? res.data.imagePath : "");
      setPatientName(res.data.fullname ? res.data.fullname : "");
    } catch (error) {
      console.log(error);
    }
  };
  const doctorName = useSelector((state) => state.user.fullname);
  const dispatch = useDispatch();
  const [diagnostic, setDiagnostic] = useState("");
  const [numberOfMedicine, setNumberOfMedicine] = useState(0);
  const [duration, setDuration] = useState("0 days");
  const [fontLoaded] = useFonts({
    "NunitoSans-Bold": require("../../../assets/fonts/Nunito_Sans/NunitoSans-Bold.ttf"),
    "NunitoSans-Light": require("../../../assets/fonts/Nunito_Sans/NunitoSans-Light.ttf"),
  });
  const timeOptions = [
    "1 days",
    "2 days",
    "3 days",
    "4 days",
    "5 days",
    "6 days",
    "7 days",
  ];
  const onCallBack = (name, des, quantity, unit) => {
    var medicine = {
      name: name,
      des: des,
      quantity: quantity,
      unit: unit,
    };
    if (
      medicine.name !== "" &&
      medicine.des !== "" &&
      medicine.quantity !== "" &&
      medicine.unit !== ""
    ) {
      currentPrescription = currentPrescription.filter(
        (item) => item.name !== medicine.name
      );
      currentPrescription.push(medicine);
      dispatch({
        type: "changeCurrentPrescription",
        data: currentPrescription,
      });
    }
  };
  const renderMedicine = Array.from(
    { length: numberOfMedicine },
    (_, index) => {
      return (
        <CustomMedicineForm
          onCallBack={onCallBack}
          onPressClear={() => setNumberOfMedicine(numberOfMedicine - 1)}
        />
      );
    }
  );
  const handleSubmit = async () => {
    try {
      let yourDate = new Date();
      yourDate = moment().format("YYYY-MM-DD");
      const res = await getStatelessAPI(
        "createPrescription",
        {
          doctorName: doctorName,
          date: yourDate,
          diagnostic: diagnostic,
          duration: duration,
          medicineList: currentPrescription,
        },
        null,
        null,
        `/${reviewing}`
      );
      const { message, success } = res;
      if (success) {
        navigation.goBack();
      } else {
        Alert.alert("Something went wrong. Please try Again !");
      }
    } catch (error) {}
  };
  useEffect(() => {
    getPatientData();
  }, [isFocus]);
  if (!fontLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <Text style={styles.doctorBoxBoldText}>Patient</Text>
      <View style={{ flexDirection: "row", padding: 20 }}>
        <Image
          source={{
            uri: imagePath
              ? imagePath
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
          <Text style={styles.doctorBoxBoldText}>{patientName}</Text>
          <Text style={styles.infoBoxLightText}>Patient</Text>
        </View>
      </View>
      <Text style={styles.doctorBoxBoldText}>Diagnostic</Text>
      <TextInput
        placeholder="Enter your diagnostic..."
        borderRadius={20}
        multiline={true}
        style={styles.input}
        onChangeText={(value) => setDiagnostic(value)}
        value={diagnostic}
      />
      <Text style={styles.doctorBoxBoldText}>Medicine Prescription</Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => setNumberOfMedicine(numberOfMedicine + 1)}
          style={styles.profileButton}
        >
          <MaterialCommunityIcons name="plus" size={25} color={"#fff"} />
          <Text style={styles.profileButtonText}>Add pill</Text>
        </TouchableOpacity>
        <SelectDropdown
          defaultValueByIndex={0}
          buttonStyle={styles.selectTimeType}
          dropdownStyle={styles.dropdownStyle}
          data={timeOptions}
          onSelect={(selectedItem, index) => {
            setDuration(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View style={styles.profileButton}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={25}
                  color={"#fff"}
                />
                <Text style={styles.profileButtonText}>{selectedItem}</Text>
              </View>
            );
          }}
        />
      </View>

      {numberOfMedicine !== 0 && (
        <View style={styles.medicineTableContainer}>
          <View style={{ flex: 6, padding: 10, alignItems: "center" }}>
            <Text style={styles.medicineBoxBoldText}>Medicine Name</Text>
          </View>
          <View style={{ flex: 2, padding: 10 }}>
            <Text style={styles.medicineBoxBoldText}>Quantity</Text>
          </View>
          <View style={{ flex: 1.5, padding: 10 }}>
            <Text style={styles.medicineBoxBoldText}>Unit</Text>
          </View>
          <View style={{ flex: 0.5, padding: 10 }}></View>
        </View>
      )}
      <ScrollView>
        {renderMedicine}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={handleSubmit} style={styles.profileButton}>
            <MaterialCommunityIcons name="check" size={25} color={"#fff"} />
            <Text style={styles.profileButtonText}>DONE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPrescriptionScreen;

const styles = StyleSheet.create({
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#B2B2B2",
    fontFamily: "NunitoSans-Light",
  },
  headerCardBG: {
    backgroundColor: "#1C6BA4",
    height: 200,
    borderBottomEndRadius: 250,
    borderBottomStartRadius: 250,
  },
  medicineTableContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  bodyText: {
    margin: 15,
    fontSize: 18,
    fontFamily: "NunitoSans-Bold",
  },
  medicineName: {
    padding: 5,
    borderRadius: 10,
    height: 40,
    borderWidth: 1,
    fontSize: 15,
    fontFamily: "NunitoSans-Bold",
  },
  medicineDes: {
    padding: 5,
    fontFamily: "NunitoSans-Light",
    marginVertical: 10,
    borderRadius: 10,
    height: 60,
    borderWidth: 1,
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
  medicineBoxBoldText: {
    fontSize: 15,
    fontFamily: "NunitoSans-Bold",
  },
  infoBoxLightText: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 15,
    fontFamily: "NunitoSans-Light",
  },
  profileButton: {
    width: 150,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#1C6BA4",
    alignItems: "center",
    margin: 10,
    flexDirection: "row",
    paddingLeft: 20,
  },
  profileButtonText: {
    marginLeft: 20,
    fontSize: 17,
    fontWeight: "500",
    color: "#fff",
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
  selectTimeType: {
    margin: 10,
    borderColor: "white",
    elevation: 15,
    width: 150,
    height: 50,
    backgroundColor: "#1C6BA4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    borderWidth: 1,
  },
  dropdownStyle: {
    backgroundColor: "#FFFCFB",
    width: 150,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
  },
});

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import SelectDropdown from "react-native-select-dropdown";

const CustomMedicineForm = (props) => {
  const { onPressClear, onCallBack } = props;
  const [medicineName, setMedicineName] = useState("");
  const [medicineDes, setMedicineDes] = useState("");
  const [medicineQuantity, setMedicineQuantity] = useState("");
  const [medicineUnit, setMedicineUnit] = useState("");
  const [fontLoaded] = useFonts({
    "NunitoSans-Bold": require("../assets/fonts/Nunito_Sans/NunitoSans-Bold.ttf"),
    "NunitoSans-Light": require("../assets/fonts/Nunito_Sans/NunitoSans-Light.ttf"),
  });
  const unitData = ["Shot", "Pill", "Mg"];
  const handleSetValue = (value, type) => {
    if (type === "name") {
      setMedicineName(value);
      onCallBack(value, medicineDes, medicineQuantity, medicineUnit);
    }
    if (type === "des") {
      setMedicineDes(value);
      onCallBack(medicineName, value, medicineQuantity, medicineUnit);
    }
    if (type === "quantity") {
      setMedicineQuantity(value);
      onCallBack(medicineName, medicineDes, value, medicineUnit);
    }
    if (type === "unit") {
      setMedicineUnit(value);
      onCallBack(medicineName, medicineDes, medicineQuantity, value);
    }
  };
  if (!fontLoaded) return null;
  return (
    <View style={styles.medicineTableContainer}>
      <View style={{ flex: 6, padding: 10 }}>
        <TextInput
          placeholder="Enter medicine name..."
          style={styles.medicineName}
          value={medicineName}
          onChangeText={(value) => handleSetValue(value, "name")}
        ></TextInput>
        <TextInput
          placeholder="Enter medicine description..."
          multiline={true}
          style={styles.medicineDes}
          value={medicineDes}
          onChangeText={(value) => handleSetValue(value, "des")}
        ></TextInput>
      </View>
      <View style={{ flex: 1.5, padding: 10 }}>
        <TextInput
          style={styles.medicineName}
          value={medicineQuantity}
          onChangeText={(value) => handleSetValue(value, "quantity")}
        ></TextInput>
      </View>
      <SelectDropdown
        buttonStyle={styles.selectTimeType}
        dropdownStyle={styles.dropdownStyle}
        data={unitData}
        onSelect={(selectedItem, index) => {
          handleSetValue(selectedItem, "unit");
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return <Text>{selectedItem}</Text>;
        }}
      />
      <TouchableOpacity onPress={onPressClear} style={{ flex: 1, padding: 10 }}>
        <Image
          source={require("../assets/images/cross.png")}
          style={{
            height: 20,
            width: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomMedicineForm;

const styles = StyleSheet.create({
  medicineTableContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  medicineName: {
    borderColor: "#B2B2B2",
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
    borderColor: "#B2B2B2",
  },
  selectTimeType: {
    borderColor: "#B2B2B2",
    elevation: 15,
    width: 50,
    height: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
  },
  dropdownStyle: {
    backgroundColor: "#FFFCFB",
    width: 80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});

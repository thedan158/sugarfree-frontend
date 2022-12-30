import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import MedicineButton from "../../../components/MedicineButton";
import CustomModal from "../../../components/CustomModal";

const defautPillData = {
  description: "fast insulin",
  imagePath:
    "https://firebasestorage.googleapis.com/v0/b/sugarcare-9f6bd.appspot.com/o/images%2Fpills%2Fshare-cach-su-dung-apidra-solostar-dieu-tri-benh-tieu-duong-1608549082.png?alt=media&token=31d4b43a-2dac-49f7-a0c4-0a42dd224299",
  name: "Apidra",
  type: "insulin",
  unit: "pill",
};

const PillScreen = () => {
  const listPillInsulin = useSelector((state) => state.user.listPillInsulin);
  const listPillType2 = useSelector((state) => state.user.listPillType2);
  const listPillAmylinomimetic = useSelector(
    (state) => state.user.listPillAmylinomimetic
  );
  const [pillModalData, setPillModalData] = useState(defautPillData);
  const [visible, setVisible] = useState(false);
  const [openInsulin, setOpenInsulin] = useState(false);
  const [openAmyli, setOpenAmili] = useState(false);
  const [openType2, setOpenType2] = useState(false);
  const [fontLoaded] = useFonts({
    "NunitoSans-Bold": require("../../../assets/fonts/Nunito_Sans/NunitoSans-Bold.ttf"),
    "NunitoSans-Light": require("../../../assets/fonts/Nunito_Sans/NunitoSans-Light.ttf"),
  });

  const handleModal = (data) => {
    setPillModalData(data);
    setVisible(true);
  };
  const renderInsulinView = Array.from(
    { length: listPillInsulin.length },
    (_, index) => {
      return (
        <MedicineButton
          onPress={() => handleModal(listPillInsulin[index])}
          display={openInsulin}
          pillData={listPillInsulin[index]}
        />
      );
    }
  );
  const renderAmyliView = Array.from(
    { length: listPillAmylinomimetic.length },
    (_, index) => {
      return (
        <MedicineButton
          onPress={() => handleModal(listPillAmylinomimetic[index])}
          display={openAmyli}
          pillData={listPillAmylinomimetic[index]}
        />
      );
    }
  );
  const renderType2View = Array.from(
    { length: listPillType2.length },
    (_, index) => {
      return (
        <MedicineButton
          onPress={() => handleModal(listPillType2[index])}
          display={openType2}
          pillData={listPillType2[index]}
        />
      );
    }
  );
  if (!fontLoaded) {
    return null;
  }
  return (
    <ScrollView style={styles.container}>
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
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color="#8AA0BC"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text
        onPress={() => setOpenInsulin(!openInsulin)}
        style={styles.bodyText}
      >
        Insulin
      </Text>

      <ScrollView contentContainerStyle={styles.userScrollView}>
        {renderInsulinView}
      </ScrollView>

      <Text onPress={() => setOpenAmili(!openAmyli)} style={styles.bodyText}>
        Amylinomimetic
      </Text>

      <ScrollView contentContainerStyle={styles.userScrollView}>
        {renderAmyliView}
      </ScrollView>

      <Text onPress={() => setOpenType2(!openType2)} style={styles.bodyText}>
        Type 2
      </Text>

      <ScrollView contentContainerStyle={styles.userScrollView}>
        {renderType2View}
      </ScrollView>
      <CustomModal visible={visible}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: pillModalData.imagePath
                ? pillModalData.imagePath
                : "https://firebasestorage.googleapis.com/v0/b/sugarcare-9f6bd.appspot.com/o/images%2Fpills%2Fshare-cach-su-dung-apidra-solostar-dieu-tri-benh-tieu-duong-1608549082.png?alt=media&token=31d4b43a-2dac-49f7-a0c4-0a42dd224299",
            }}
            style={{
              height: 150,
              width: 200,
              marginTop: 30,
            }}
          />
          <Text style={styles.bodyText}>
            {pillModalData.name ? pillModalData.name : ""}
          </Text>
          <ScrollView>
            <Text style={styles.pillDescription}>
              {pillModalData.description ? pillModalData.description : ""}
            </Text>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#1C6BA4",
            width: "100%",
            padding: 15,
            borderRadius: 20,
            elevation: 1,
            alignItems: "center",
          }}
          onPress={() => {
            setVisible(false);
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            OK
          </Text>
        </TouchableOpacity>
      </CustomModal>
    </ScrollView>
  );
};

export default PillScreen;

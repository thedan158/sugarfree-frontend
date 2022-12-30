import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MedicineButton = (props) => {
  const { pillData, display, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.userView, { display: display ? "" : "none" }]}
    >
      <Image
        style={styles.userImage}
        source={{
          uri:
            pillData.imagePath !== undefined
              ? pillData.imagePath
              : "https://firebasestorage.googleapis.com/v0/b/le-repas.appspot.com/o/images%2Fgood.png?alt=media&token=de139437-3a20-4eb3-ba56-f6a591779d15",
        }}
      />
        <Text style={styles.doctorName}>{pillData.name}</Text>
    </TouchableOpacity>
  );
};

export default MedicineButton;

const styles = StyleSheet.create({
  userView: {
    height: 80,
    flexDirection: "row",
    margin: 5,
  },
  doctorName: {
    fontFamily: "NunitoSans-Bold",
    fontSize: 20,
    margin: 5,
    marginLeft: 15,
  },
  doctorDescription: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 15,
    fontFamily: "NunitoSans-Light",
  },
  doctorRating: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: "NunitoSans-Light",
  },
  userImage: { width: 70, height: 70, borderRadius: 15, marginTop: 5 },
});

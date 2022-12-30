import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DoctorCard = (props) => {
  const navigation = useNavigation();
  const { doctorData } = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Chat", { item: doctorData })}
      style={styles.userView}
    >
      <Image
        style={styles.userImage}
        source={{
          uri:
            doctorData.imagePath !== ""
              ? doctorData.imagePath
              : "https://firebasestorage.googleapis.com/v0/b/le-repas.appspot.com/o/images%2Fgood.png?alt=media&token=de139437-3a20-4eb3-ba56-f6a591779d15",
        }}
      />
      <View>
        <Text style={styles.doctorName}>{doctorData.fullname}</Text>
        <Text style={styles.doctorDescription}>{doctorData.description}</Text>
        <View style={{ marginLeft: 10, flexDirection: "row" }}>
          <AntDesign name="star" size={18} color="orange" />
          <Text
            style={styles.doctorRating}
          >{`${doctorData.rating} (${doctorData.votes} reviews)`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  userView: {
    flexDirection: "row",
    margin: 5,
  },
  doctorName: {
    fontFamily: "NunitoSans-Bold",
    fontSize: 20,
    margin: 10,
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
  userImage: { width: 90, height: 90, borderRadius: 25, marginTop: 5 },
});

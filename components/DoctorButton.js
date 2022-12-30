import { StyleSheet, TouchableOpacity, Image } from "react-native";
import IconBadge from "react-native-icon-badge";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DoctorButton = (props) => {
  const navigation = useNavigation();

  const { doctorData } = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Chat", { item: doctorData })}
      style={styles.user}
    >
      <IconBadge
        MainElement={
          <Image
            style={styles.userImage}
            source={{
              uri:
                doctorData.imagePath !== ""
                  ? doctorData.imagePath
                  : "https://firebasestorage.googleapis.com/v0/b/le-repas.appspot.com/o/images%2Fgood.png?alt=media&token=de139437-3a20-4eb3-ba56-f6a591779d15",
            }}
          />
        }
        IconBadgeStyle={{
          width: 10,
          height: 18,
          backgroundColor: "#008A5E",
          margin: 5,
        }}
      />
    </TouchableOpacity>
  );
};

export default DoctorButton;

const styles = StyleSheet.create({
  user: {
    width: 100,
    height: 100,
    margin: 5,
  },
  userImage: { width: 90, height: 90, borderRadius: 25, marginTop: 5 },
});

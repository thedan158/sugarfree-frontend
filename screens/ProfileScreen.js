import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [fullname, setFullname] = React.useState("");
  const [role, setRole] = React.useState("");
  const [image, setImage] = React.useState("");
  useFocusEffect(() => {
    const getData = async () => {
      const user = await AsyncStorage.getItem("userInfo");
      const userInfo = JSON.parse(user);
      console.log(userInfo.username);
      const response = await axios.get(
        `https://30e6-42-116-226-110.ap.ngrok.io/auth/getUser/${userInfo.username}`
      );
      const { success } = response.data;
      const { data } = response.data;
      console.log(data);
      console.log(success);
      if (!success) {
        Alert.alert("Account not found");
        return;
      }

      setFullname(data.fullname ? data.fullname : userInfo.username);
      setRole(data.role ? data.role : userInfo.role);
      setImage(
        data.imagePath
          ? data.imagePath
          : "https://firebasestorage.googleapis.com/v0/b/le-repas.appspot.com/o/images%2Fgood.png?alt=media&token=de139437-3a20-4eb3-ba56-f6a591779d15"
      );
    };
    getData().catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profileHeader}>
          <Image style={styles.profileImage} source={{ uri: image }} />
        </View>
        <Text style={styles.profileName}>{fullname}</Text>
        <Text style={styles.profileRole}>{role}</Text>
      </View>
      <View style={styles.profileBodyContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.profileButton}
        >
          <MaterialCommunityIcons
            name="account-edit-outline"
            size={25}
            color={"#fff"}
          />
          <Text style={styles.profileButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <MaterialCommunityIcons
            name="information-variant"
            size={25}
            color={"#fff"}
          />
          <Text style={styles.profileButtonText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Report")}
          style={styles.profileButton}
        >
          <MaterialCommunityIcons
            name="clipboard-pulse-outline"
            size={25}
            color={"#fff"}
          />
          <Text style={styles.profileButtonText}>Health Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChangePassword")}
          style={styles.profileButton}
        >
          <MaterialCommunityIcons name="cog-outline" size={25} color={"#fff"} />
          <Text style={styles.profileButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileFooterContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color={"#1C6BA4"}
          ></MaterialCommunityIcons>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  profileHeaderContainer: {
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profileBodyContainer: {
    flex: 6,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  profileFooterContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  profileHeader: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderRadius: 25,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "black",
  },
  profileRole: { fontSize: 17, marginTop: 10, color: "black" },
  profileImage: { width: 70, height: 70, borderRadius: 25 },
  profileButton: {
    width: "90%",
    height: "20%",
    borderRadius: 12,
    backgroundColor: "#1C6BA4",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    flexDirection: "row",
    paddingLeft: 20,
  },
  logoutButton: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1C6BA4",
    marginLeft: 5,
  },
  profileButtonText: {
    marginLeft: 20,
    fontSize: 17,
    fontWeight: "500",
    color: "#fff",
  },
});

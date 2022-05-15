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

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profileHeader}>
          <Image
            style={styles.profileImage}
            source={require("../assets/images/user.jpg")}
          />
        </View>
        <Text style={styles.profileName}>Nguyen The Dan</Text>
        <Text style={styles.profileRole}>Patient</Text>
      </View>
      <View style={styles.profileBodyContainer}>
        <TouchableOpacity style={styles.profileButton}>
          <MaterialCommunityIcons
            name="account-edit-outline"
            size={25}
            color={"#fff"}
          />
          <Text style={styles.profileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
        <MaterialCommunityIcons
            name="cog-outline"
            size={25}
            color={"#fff"}
          />
          <Text style={styles.profileButtonText}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
        <MaterialCommunityIcons
            name="information-variant"
            size={25}
            color={"#fff"}
          />
          <Text style={styles.profileButtonText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
        <MaterialCommunityIcons
            name="clipboard-pulse-outline"
            size={25}
            color={"#fff"}
          />
          <Text style={styles.profileButtonText}>Health Report</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileFooterContainer}>
        <TouchableOpacity style={styles.logoutButton}>
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
    color: 'black',
  },
  profileRole: { fontSize: 15, marginTop: 10, color: "black" },
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
  profileButtonText: {marginLeft:20, fontSize: 17, fontWeight: "500", color: "#fff"},
});

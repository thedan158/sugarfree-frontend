import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import ModalPrivacy from "../components/ModalPrivacy";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [fullname, setFullname] = React.useState("");
  const [role, setRole] = React.useState("");
  const [image, setImage] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userInfo");
    await AsyncStorage.removeItem("role");
    await AsyncStorage.removeItem("_id");
    navigation.navigate("Login");
  };
  useFocusEffect(() => {
    const getData = async () => {
      const user = await AsyncStorage.getItem("userInfo");
      const userInfo = JSON.parse(user);
      console.log(userInfo.username);
      const response = await axios.get(
        `https://9a46-171-253-177-116.ap.ngrok.io/auth/getUser/${userInfo.username}`
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

        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.profileButton}
        >
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
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color={"#1C6BA4"}
          ></MaterialCommunityIcons>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <ModalPrivacy visible={visible}>
        <View>
          <View style={{ marginBottom: "10%" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Policy and privacy
            </Text>
          </View>
          <ScrollView
            style={{
              marginLeft: "5%",
              height: "80%",
              marginBottom: "7%",
            }}
          >
            <Text style={styles.details}>
              Privacy Policy The Dan built the SugarCare app as a Free app. This
              SERVICE is provided by The Dan at no cost and is intended for use
              as is. This page is used to inform visitors regarding my policies
              with the collection, use, and disclosure of Personal Information
              if anyone decided to use my Service. If you choose to use my
              Service, then you agree to the collection and use of information
              in relation to this policy. The Personal Information that I
              collect is used for providing and improving the Service. I will
              not use or share your information with anyone except as described
              in this Privacy Policy. The terms used in this Privacy Policy have
              the same meanings as in our Terms and Conditions, which are
              accessible at SugarCare unless otherwise defined in this Privacy
              Policy. Information Collection and Use For a better experience,
              while using our Service, I may require you to provide us with
              certain personally identifiable information, including but not
              limited to Images. The information that I request will be retained
              on your device and is not collected by me in any way. The app does
              use third-party services that may collect information used to
              identify you. Link to the privacy policy of third-party service
              providers used by the app Google Play Services Google Analytics
              for Firebase Firebase Crashlytics Expo Log Data I want to inform
              you that whenever you use my Service, in a case of an error in the
              app I collect data and information (through third-party products)
              on your phone called Log Data. This Log Data may include
              information such as your device Internet Protocol (“IP”) address,
              device name, operating system version, the configuration of the
              app when utilizing my Service, the time and date of your use of
              the Service, and other statistics. Cookies Cookies are files with
              a small amount of data that are commonly used as anonymous unique
              identifiers. These are sent to your browser from the websites that
              you visit and are stored on your device's internal memory. This
              Service does not use these “cookies” explicitly. However, the app
              may use third-party code and libraries that use “cookies” to
              collect information and improve their services. You have the
              option to either accept or refuse these cookies and know when a
              cookie is being sent to your device. If you choose to refuse our
              cookies, you may not be able to use some portions of this Service.
              Service Providers I may employ third-party companies and
              individuals due to the following reasons: To facilitate our
              Service; To provide the Service on our behalf; To perform
              Service-related services; or To assist us in analyzing how our
              Service is used. I want to inform users of this Service that these
              third parties have access to their Personal Information. The
              reason is to perform the tasks assigned to them on our behalf.
              However, they are obligated not to disclose or use the information
              for any other purpose. Security I value your trust in providing us
              your Personal Information, thus we are striving to use
              commercially acceptable means of protecting it. But remember that
              no method of transmission over the internet, or method of
              electronic storage is 100% secure and reliable, and I cannot
              guarantee its absolute security. Links to Other Sites This Service
              may contain links to other sites. If you click on a third-party
              link, you will be directed to that site. Note that these external
              sites are not operated by me. Therefore, I strongly advise you to
              review the Privacy Policy of these websites. I have no control
              over and assume no responsibility for the content, privacy
              policies, or practices of any third-party sites or services.
              Children’s Privacy These Services do not address anyone under the
              age of 13. I do not knowingly collect personally identifiable
              information from children under 13 years of age. In the case I
              discover that a child under 13 has provided me with personal
              information, I immediately delete this from our servers. If you
              are a parent or guardian and you are aware that your child has
              provided us with personal information, please contact me so that I
              will be able to do the necessary actions. Changes to This Privacy
              Policy I may update our Privacy Policy from time to time. Thus,
              you are advised to review this page periodically for any changes.
              I will notify you of any changes by posting the new Privacy Policy
              on this page. This policy is effective as of 2022-06-17 Contact Us
              If you have any questions or suggestions about my Privacy Policy,
              do not hesitate to contact me at thedan671@gmail.com.
            </Text>
          </ScrollView>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={styles.button3}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.buttonText1}>Agree</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPrivacy>
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
  button3: {
    backgroundColor: "#1C6BA4",
    width: "35%",
    padding: 15,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    margin: 5,
    flexDirection: "row",
  },
  buttonText1: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  details: {
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,
    color: "#898888",
  },
});

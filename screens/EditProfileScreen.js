import {
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import CustomTextInput from "../components/CustomTextInput.js";
import gallery from "../assets/icons/picture.png";
import * as ImagePicker from "expo-image-picker";
import CustomModal from "../components/CustomModal.js";
import PatientInfoScreen from "../components/PatientInfoScreen.js";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "../firebase";
import * as firebase from "firebase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const EditProfileScreen = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const [image, setImage] = useState("null");
  const [visible, setVisible] = React.useState(false);
  const [url, setUrl] = useState("");

  useEffect(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission denied!");
    }
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
      setAddress(data.address ? data.address : "");
      setEmail(data.email ? data.email : "");
      setFullname(data.fullname ? data.fullname : "");
      setPhoneNumber(data.phoneNumber ? data.phoneNumber : "");
      setImage(
        data.imagePath
          ? data.imagePath
          : "https://firebasestorage.googleapis.com/v0/b/le-repas.appspot.com/o/images%2Fgood.png?alt=media&token=de139437-3a20-4eb3-ba56-f6a591779d15"
      );
    };
    getData().catch((err) => console.log(err));
  }, []);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const handleUpdateProfile = async () => {
    //*Get user data from AsyncStorage
    const user = await AsyncStorage.getItem("userInfo");
    const userData = JSON.parse(user);

    //*Create blob from image
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    //*Upload blob to firebase
    const ref = firebase
      .storage()
      .ref()
      .child(`images/profile/${userData.username}.jpg`);
    const snapshot = ref.put(blob);
    await snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        console.log("uploading");
      },
      (error) => {
        console.log(error);
        blob.close();
        return;
      },
      async () => {
        await ref.getDownloadURL().then(async (url) => {
          console.log("download url: " + url);
          setUrl(url);
          blob.close();
          console.log(userData);
          console.log("platform: " + Platform.OS);
          console.log("blob:" + blob);
          console.log("url:" + url);
          const res = await axios.post(
            `https://30e6-42-116-226-110.ap.ngrok.io/auth/updateUser/${userData.username}`,
            {
              fullname: fullname,
              address: address,
              phoneNumber: phoneNumber,
              email: email,
              imagePath: url,
            }
          );
          const { success } = res.data;
          console.log(success);
          if (!success) {
            Alert.alert("Update failed");
            return;
          }
          setVisible(true);
        });
      }
    );
  }
  const handleSignup = async () => {
    navigation.goBack();
  }


  return (
    <PatientInfoScreen>
      <ScrollView>
        <View style={styles.container}>
          {/* Pick image  */}
          <View style={styles.view2}>
            <TouchableOpacity onPress={PickImage}>
              <View style={styles.pickLogo}>
                <ImageBackground
                  style={styles.ImageBackground}
                  source={gallery}
                />

                {image && (
                  <Image source={{ uri: image }} style={styles.pick}></Image>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={PickImage} style={styles.button1}>
              <Text style={styles.buttonText}>Change Your Avatar</Text>
            </TouchableOpacity>
          </View>

          {/* Input section  */}
          <View style={styles.view3}>
            {/* Full name input */}

            <CustomTextInput
              blurColor="#009DC7"
              value={fullname}
              onChangeText={(text) => setFullname(text)}
              placeholder="Full Name"
            />

            {/* Address input */}

            <CustomTextInput
              blurColor="#009DC7"
              value={address}
              onChangeText={(text) => setAddress(text)}
              placeholder="Address"
            />

            {/* Hotline */}

            <CustomTextInput
              blurColor="#009DC7"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              placeholder="Phone Number"
              keyboardType="decimal-pad"
            />

            <CustomTextInput
              blurColor="#009DC7"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
            />
          </View>

          <View style={styles.view4}>
            {/* Button */}
            <TouchableOpacity
              onPress={handleUpdateProfile}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Modal  */}
          <CustomModal visible={visible}>
            <View style={{ alignItems: "center" }}>
              {/* <Image
                source={require("../assets/icons/save-orange.png")}
                style={{ height: 150, width: 150, marginVertical: 30 }}
              /> */}
            </View>

            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
            >
              Update profile successfully
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleSignup();
                setVisible(false);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </CustomModal>
        </View>
      </ScrollView>
    </PatientInfoScreen>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#1C6BA4",
    width: "100%",
    padding: 15,
    borderRadius: 20,
    elevation: 1,
    alignItems: "center",
  },
  button1: {
    backgroundColor: "#1C6BA4",
    width: "60%",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  view2: {
    flex: 3,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  view3: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 5,
  },
  view4: {
    flex: 2,
    justifyContent: "flex-start",
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },

  textView: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  loginBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top: 30,
    left: 10,
  },

  loginText: {
    color: "#FA4A0C",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    position: "absolute",
    alignSelf: "center",
  },

  ownerText: {
    color: "black",
    fontSize: 16,
    fontWeight: "normal",
  },

  signupBox: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    right: 15,
  },

  rectangle: {
    width: 130,
    height: 3,
    backgroundColor: "#FA4A0C",
    position: "relative",
    bottom: -9,
  },

  signupText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  registerText: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },

  fullNameBox: {
    width: 300,
    height: 55,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 13,
  },

  fullNameText: {
    fontSize: 15,
    marginLeft: 30,
  },

  passwordBox: {
    width: 300,
    height: 55,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    marginTop: 25,
  },

  gallery: {
    height: 65,
    width: 65,
    alignSelf: "center",
  },

  textSignupButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  pickLogo: {
    width: 140,
    height: 140,
    backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: "dashed",
  },
  pick: {
    width: 140,
    height: 140,
    borderColor: "black",
  },

  ImageBackground: {
    height: 50,
    width: 50,
    position: "absolute",
    alignSelf: "center",
  },
});
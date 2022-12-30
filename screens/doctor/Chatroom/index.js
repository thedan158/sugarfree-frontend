import React, { useCallback, useState, useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Bubble,
  GiftedChat,
  SystemMessage,
  IMessage,
  Send,
  SendProps,
} from "react-native-gifted-chat";
import { firebaseConfig } from "../../../firebase";
import * as firebase from "firebase";
import "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity, Image } from "react-native";
import CustomModal from "../../../components/CustomModal";

const Chat = ({ route, navigation }) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const dispatch = useDispatch();
  const { item } = route.params;
  const role = useSelector((state) => state.user.role);
  const username = useSelector((state) => state.user.username);
  const userID = useSelector((state) => state.user.id);
  const imagePath = useSelector((state) => state.user.userImagePath);
  const [visible, setVisible] = useState(false);
  const db = firebase.firestore();
  const [messages, setMessages] = useState([]);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        // wrapperStyle={{
        //   left: {
        //     backgroundColor: 'white',
        //   },
        // }}
      />
    );
  };
  const handleMakePrescriptions = () => {
    setVisible(false);
    if (role === "doctor") {
      dispatch({ type: "changeReviewing", data: item.username });
      navigation.navigate("Pill");
    }
  };
  const handleReviewProfile = () => {
    setVisible(false);
    if (role === "doctor") {
      dispatch({ type: "changeReviewing", data: item.username });
      navigation.navigate("ReportTab", { name: "hello" });
    }
  };
  const chatRef = db
    .collection("Users")
    .doc(role === "patient" ? username : item.username)
    .collection("chats")
    .doc(role === "patient" ? item.username : username)
    .collection("messages");

  const doctorRef = db
    .collection("Users")
    .doc(role === "patient" ? item.username : username)
    .collection("chats");
  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  const handeSend = async (messages) => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    const writes = messages.map((m) => chatRef.add(m));
    (role === "patient" &&
      doctorRef.doc(username).set({
        username: username,
        imagePath: imagePath,
        lastestMessage: messages[0].text,
        lastsend: time,
      })) ||
      (await Promise.all(writes));
  };

  useEffect(async () => {
    const unsubscribe = chatRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          //createdAt is firebase.firestore.Timestamp instance
          //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={handeSend}
        user={{ _id: userID, name: username, avatar: imagePath }}
        renderBubble={renderBubble}
        timeTextStyle={{ left: { color: "red" }, right: { color: "yellow" } }}
        renderAvatarOnTop={true}
        messagesContainerStyle={{ backgroundColor: "white", elevation: 10 }}
        onPressAvatar={() => setVisible(true)}
      />
      <CustomModal visible={visible}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: item.imagePath }}
            style={{
              height: 150,
              width: 150,
              marginVertical: 30,
              borderRadius: 100,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={handleReviewProfile}
          style={{
            backgroundColor: "#1C6BA4",
            width: "100%",
            padding: 15,
            borderRadius: 20,
            elevation: 1,
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            View profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleMakePrescriptions}
          style={{
            backgroundColor: "#1C6BA4",
            width: "100%",
            padding: 15,
            borderRadius: 20,
            elevation: 1,
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Make prescriptions
          </Text>
        </TouchableOpacity>
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
    </>
  );
};

export default Chat;

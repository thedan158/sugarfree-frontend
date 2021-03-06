import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "../firebase";
import * as firebase from "firebase";
import "firebase/firestore";

const Chat = ({ route }) => {
  const { item, username, isDoctor } = route.params;
  console.log(item.username);
  console.log(username);
  console.log(isDoctor);
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();
  const _id = Math.random().toString(36).substring(7);
  const userData = { _id, name: "", avatar: item.imagePath };
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(userData);

  const chatRef = db
    .collection("Users")
    .doc(!isDoctor ? username : item.username)
    .collection("chats")
    .doc(!isDoctor ? item.username : username)
    .collection("messages");

  const doctorRef = db
    .collection("Users")
    .doc(!isDoctor ? item.username : username)
    .collection("chats");
  useEffect(async () => {
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem("userInfo");
      const user = JSON.parse(userData);
      const user_id = await AsyncStorage.getItem("_id");
      const imagePath = await AsyncStorage.getItem("imagePath");
      console.log(user_id);
      setUser({ _id: user_id, name: user.username, avatar: imagePath });

      // setUsername(user.username);
    };
    await getUserData().catch((err) => console.log(err));
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
    (!isDoctor && doctorRef.doc(username).set({username: username, imagePath: user.avatar, lastestMessage: messages[0].text, lastsend: time})) ||
    await Promise.all(writes);
  };

  return <GiftedChat messages={messages} onSend={handeSend} user={user} />;
};

export default Chat;

const styles = StyleSheet.create({});

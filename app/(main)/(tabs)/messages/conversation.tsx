import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import ReceivedMessage from "@/components/atoms/receivedMessage";
import MessageSent from "@/components/atoms/messageSent";
import ButtomMessage from "@/components/atoms/ButtomMessage";

import { ref, onValue, off } from "firebase/database";
import { database } from "@/constants/firebaseConfig";

// 🔸 Tipo para los mensajes
type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
};

// 🔸 IDs simulados (podrías obtenerlos desde tu backend o contexto)
const currentUserId = "1";
const otherUserId = "2";

// 🔸 ID de chat único entre dos usuarios
const chatId =
  currentUserId < otherUserId
    ? `${currentUserId}_${otherUserId}`
    : `${otherUserId}_${currentUserId}`;

const Conversation = () => {
  const [messages, setMessages] = useState<Message[]>([]); // ✅ Tipado

  useEffect(() => {
    const messagesRef = ref(database, `chats/${chatId}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const msgs: Message[] = Object.entries(data).map(([key, value]: any) => ({
        id: key,
        senderId: value.senderId,
        text: value.text,
        timestamp: value.timestamp,
      }));
      msgs.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(msgs);
    });

    return () => off(messagesRef, "value", unsubscribe);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {messages.map((msg) =>
            msg.senderId === currentUserId ? (
              <MessageSent
                key={msg.id}
                time={new Date(msg.timestamp).toLocaleTimeString()}
                textMessage={msg.text}
              />
            ) : (
              <ReceivedMessage
                key={msg.id}
                profileImageSource={require("@/constants/imagePath").plumbing}
                time={new Date(msg.timestamp).toLocaleTimeString()}
                textMessage={msg.text}
              />
            ),
          )}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <ButtomMessage chatId={chatId} senderId={currentUserId} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E3549",
  },
  container2: {
    backgroundColor: "rgba(217, 217, 217, 0.5)",
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30,
    width: "100%",
    flex: 1,
  },
  buttonContainer: {
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
});

export default Conversation;

import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { ref, push, set } from "firebase/database";
import { database } from "@/constants/firebaseConfig";

type Props = {
  chatId: string;
  senderId: string;
};

const ButtomMessage = ({ chatId, senderId }: Props) => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message.trim() === "") return;

    try {
      const messagesRef = ref(database, `chats/${chatId}/messages`);
      const newMessageRef = push(messagesRef);
      await set(newMessageRef, {
        senderId,
        text: message.trim(),
        timestamp: Date.now(),
      });

      setMessage("");
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TextInput
          style={styles.textInput}
          placeholder="Escribe un mensaje"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Feather name="send" size={25} color="#0E3549" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(217, 217, 217, 1)",
    borderRadius: 30,
  },
  container2: {
    backgroundColor: "rgba(217, 217, 217, 0.5)",
    flexDirection: "row",
    margin: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "rgba(161, 160, 160, 0.3)",
    borderRadius: 30,
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default ButtomMessage;

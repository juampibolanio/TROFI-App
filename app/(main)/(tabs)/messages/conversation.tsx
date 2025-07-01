import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet, Text, Image, Pressable, ActivityIndicator } from "react-native";
import ReceivedMessage from "@/components/atoms/receivedMessage";
import MessageSent from "@/components/atoms/messageSent";
import ButtomMessage from "@/components/atoms/ChatButton";
import { Ionicons } from '@expo/vector-icons';

import { ref, onValue, off } from "firebase/database";
import { database } from "@/constants/firebaseConfig";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLocalSearchParams, router } from "expo-router";
import imagePath from "@/constants/imagePath";
import MessageInput from "@/components/atoms/MessageInput";

type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
};

// Componente Loader
const Loader = () => {
  return (
    <View style={loaderStyles.container}>
      <ActivityIndicator size="large" color={"#ffffff"} />
    </View>
  )
}

const loaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Conversation = () => {
  const { chatId, otherUserId, otherUserName, otherUserImage } = useLocalSearchParams<{
    chatId: string;
    otherUserId: string;
    otherUserName: string;
    otherUserImage: string;
  }>();

  const currentUserId = useSelector((state: RootState) => state.user.id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  const goBack = () => {
    router.back();
  };

  // Función para navegar al perfil del usuario
  const navigateToUserProfile = () => {
    if (otherUserId) {
      router.push({
        pathname: "/(main)/(tabs)/search/[id]",
        params: { id: otherUserId }
      });
    }
  };

  //configuración del chat
  useEffect(() => {
    if (!chatId) return;

    const messagesRef = ref(database, `chats/${chatId}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const msgs: Message[] = Object.entries(data).map(([key, value]: any) => ({
        id: key,
        senderId: String(value.senderId || ''),
        text: String(value.text || ''),
        timestamp: Number(value.timestamp || 0),
      }));
      msgs.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(msgs);
      setIsLoading(false);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    return () => off(messagesRef, "value", unsubscribe);
  }, [chatId]);

  const currentUserIdString = currentUserId ? String(currentUserId) : '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>

        <View style={styles.header}>
          <Pressable onPress={goBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0E3549" />
          </Pressable>

          <Image
            source={{ uri: otherUserImage || '' }}
            style={styles.headerImage}
            defaultSource={imagePath.defaultUserImage}
          />

          {/* Hacer el nombre clickeable */}
          <Pressable onPress={navigateToUserProfile} style={styles.nameContainer}>
            <Text style={styles.headerName}>{otherUserName || 'Usuario'}</Text>
          </Pressable>
        </View>

        {/* Mostrar loader mientras cargan los mensajes */}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* Mensajes */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesScrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.messagesContainer}
            >
              {messages.length === 0 && (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No hay mensajes aún</Text>
                  <Text style={styles.emptySubtext}>Inicia la conversación</Text>
                </View>
              )}

              {messages.map((msg) => {
                if (!msg.id || !msg.text) return null;

                return msg.senderId === currentUserIdString ? (
                  <MessageSent
                    key={msg.id}
                    time={msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    textMessage={msg.text}
                  />
                ) : (
                  <ReceivedMessage
                    key={msg.id}
                    profileImageSource={{ uri: otherUserImage || '' }}
                    time={msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    textMessage={msg.text}
                  />
                );
              })}
            </ScrollView>

            {/* Input para escribir mensajes */}
            <View style={styles.inputContainer}>
              <MessageInput
                chatId={chatId || ''}
                senderId={currentUserIdString}
                otherUserId={Number(otherUserId) || 0}
              />
            </View>
          </>
        )}
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
    flex: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(217,217,217,0.9)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    minHeight: 70,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  headerImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  nameContainer: {
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0E3549",
  },
  messagesScrollView: {
    flex: 1,
  },
  messagesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
  inputContainer: {
    backgroundColor: "rgba(217,217,217,0.9)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
});

export default Conversation;
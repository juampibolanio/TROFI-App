import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
  RefreshControl
} from "react-native";
import ReceivedMessage from "@/components/atoms/receivedMessage";
import MessageSent from "@/components/atoms/messageSent";
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLocalSearchParams, router } from "expo-router";
import imagePath from "@/constants/imagePath";
import MessageInput from "@/components/atoms/MessageInput";
import { getMessages, markAsRead } from "@/services/messageService";

type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
};

// Componente Loader
const Loader = () => {
  return (
    <View style={loaderStyles.container}>
      <ActivityIndicator size="large" color={"#ffffff"} />
    </View>
  );
};

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

  const currentUserUid = useSelector((state: RootState) => state.user.uid);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const goBack = () => {
    router.back();
  };

  // Función para navegar al perfil del usuario
  const navigateToUserProfile = () => {
    if (otherUserId) {
      router.push({
        pathname: "/(main)/(tabs)/search/[uid]",
        params: { uid: otherUserId }
      });
    }
  };

  /**
   * Carga los mensajes del chat desde el backend
   */
  const loadMessages = useCallback(async () => {
    if (!chatId) return;

    try {
      const response = await getMessages(chatId, 50);
      const msgs: Message[] = response.data.messages.map((msg: any) => ({
        id: msg.id,
        senderId: msg.senderId,
        content: msg.content,
        timestamp: msg.timestamp,
      }));

      setMessages(msgs);

      // Marcar mensajes como leídos si el usuario no es el remitente del último mensaje
      if (currentUserUid && msgs.length > 0) {
        const lastMessage = msgs[msgs.length - 1];
        if (lastMessage.senderId !== currentUserUid) {
          await markAsRead(chatId, currentUserUid).catch(err => 
            console.log('Error al marcar como leído:', err)
          );
        }
      }

      // Scroll automático al final
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error: any) {
      console.error("Error al cargar mensajes:", error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'No se pudieron cargar los mensajes'
      );
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [chatId, currentUserUid]);

  // Cargar mensajes al montar el componente
  useEffect(() => {
    loadMessages();

    // Polling cada 3 segundos para actualizar mensajes (puedes usar WebSockets en el futuro)
    const interval = setInterval(() => {
      loadMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [loadMessages]);

  // Función para refrescar mensajes
  const onRefresh = () => {
    setRefreshing(true);
    loadMessages();
  };

  /**
   * Callback cuando se envía un mensaje nuevo
   * Se llama desde MessageInput después de enviar
   */
  const handleNewMessage = (newMessage: Message) => {
    setMessages(prev => [...prev, newMessage]);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  if (!currentUserUid) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: Usuario no autenticado</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>

        {/* HEADER */}
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
            {/* MENSAJES */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesScrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.messagesContainer}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#0E3549"
                  colors={["#0E3549"]}
                />
              }
            >
              {messages.length === 0 && (
                <View style={styles.emptyContainer}>
                  <Ionicons name="chatbubbles-outline" size={60} color="rgba(0,0,0,0.3)" />
                  <Text style={styles.emptyText}>No hay mensajes aún</Text>
                  <Text style={styles.emptySubtext}>Inicia la conversación</Text>
                </View>
              )}

              {messages.map((msg) => {
                if (!msg.id || !msg.content) return null;

                const messageTime = msg.timestamp 
                  ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : '';

                return msg.senderId === currentUserUid ? (
                  <MessageSent
                    key={msg.id}
                    time={messageTime}
                    textMessage={msg.content}
                  />
                ) : (
                  <ReceivedMessage
                    key={msg.id}
                    profileImageSource={{ uri: otherUserImage || '' }}
                    time={messageTime}
                    textMessage={msg.content}
                  />
                );
              })}
            </ScrollView>

            {/* INPUT PARA ESCRIBIR MENSAJES */}
            <View style={styles.inputContainer}>
              <MessageInput
                chatId={chatId || ''}
                senderId={currentUserUid}
                onMessageSent={handleNewMessage}
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
    marginTop: 15,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Conversation;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from "react-native";
import SearchBar from "@/components/searchBar";
import imagePath from "@/constants/imagePath";
import { moderateScale } from "react-native-size-matters";
import { Ionicons } from '@expo/vector-icons';

import { ref, onValue, query, orderByChild, limitToLast } from "firebase/database";
import { database } from "@/constants/firebaseConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getUserById } from "@/services/userService";
import ChatButton from "@/components/atoms/ChatButton";

type Chat = {
  chatId: string;
  namePerson: string;
  profileImageSource: { uri: string };
  otherUserId: number;
  lastMessage?: string;
  lastMessageTime?: number;
  lastMessageSender?: string;
  isRead?: boolean;
};

const Loader = () => {
  return (
    <View style={loaderStyles.container}>
      <ActivityIndicator size="large" color={"#ffffff"} />
      <Text style={loaderStyles.loadingText}>Cargando chats...</Text>
    </View>
  )
}

const loaderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: moderateScale(14),
    opacity: 0.8,
  }
});

const EmptyState = ({ searchText, onClearSearch }: { searchText: string, onClearSearch: () => void }) => {
  const isSearching = searchText.trim() !== "";

  return (
    <View style={styles.emptyStateContainer}>
      <Ionicons
        name={isSearching ? "search-outline" : "chatbubbles-outline"}
        size={moderateScale(60)}
        color="rgba(0,0,0,0.3)"
      />
      <Text style={styles.emptyStateTitle}>
        {isSearching ? "Sin resultados" : "Sin chats"}
      </Text>
      <Text style={styles.emptyStateSubtitle}>
        {isSearching
          ? `No se encontraron chats con "${searchText}"`
          : "Aún no tienes conversaciones. ¡Comienza a chatear con otros usuarios!"
        }
      </Text>
      {isSearching && (
        <Pressable style={styles.clearSearchButton} onPress={onClearSearch}>
          <Text style={styles.clearSearchText}>Limpiar búsqueda</Text>
        </Pressable>
      )}
    </View>
  );
};

const Messages = () => {
  const currentUserId = useSelector((state: RootState) => state.user.id);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

  // Función para obtener el último mensaje de un chat
  const getLastMessage = (chatId: string): Promise<{ lastMessage: string; lastMessageTime: number; lastMessageSender: string; isRead: boolean } | null> => {
    return new Promise((resolve) => {
      const messagesRef = ref(database, `chats/${chatId}/messages`);
      const lastMessageQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(1));

      onValue(lastMessageQuery, (snapshot) => {
        const messages = snapshot.val();
        if (messages) {
          const messageKey = Object.keys(messages)[0];
          const message = messages[messageKey];
          resolve({
            lastMessage: message.text || "📷 Imagen",
            lastMessageTime: message.timestamp,
            lastMessageSender: message.senderId,
            isRead: currentUserId != null ? message.readBy?.[currentUserId.toString()] || false : false
          });
        } else {
          resolve(null);
        }
      }, { onlyOnce: true });
    });
  };

  // Función para formatear el tiempo
  const formatTime = (timestamp: number) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (diffInHours < 168) { // menos de una semana
      return messageDate.toLocaleDateString('es-ES', {
        weekday: 'short'
      });
    } else {
      return messageDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit'
      });
    }
  };

  const loadChats = async () => {
    if (!currentUserId) return;

    const chatsRef = ref(database, "chats");

    const unsubscribe = onValue(chatsRef, async (snapshot) => {
      try {
        const chatsData = snapshot.val() || {};
        const chatEntries = Object.keys(chatsData);
        const userChats: Chat[] = [];

        const promises = chatEntries.map(async (chatId) => {
          if (chatId.includes(currentUserId.toString())) {
            const [id1, id2] = chatId.split("_");
            const otherUserId = id1 === currentUserId.toString() ? parseInt(id2) : parseInt(id1);

            try {
              const otherUser = await getUserById(otherUserId);
              const lastMessageData = await getLastMessage(chatId);

              userChats.push({
                chatId,
                namePerson: otherUser.fullname,
                profileImageSource: { uri: otherUser.imageProfile || imagePath.logo },
                otherUserId: otherUser.id,
                lastMessage: lastMessageData?.lastMessage,
                lastMessageTime: lastMessageData?.lastMessageTime,
                lastMessageSender: lastMessageData?.lastMessageSender,
                isRead: lastMessageData?.isRead
              });
            } catch (error) {
              console.log("Error al obtener usuario por ID:", error);
            }
          }
        });

        await Promise.all(promises);

        // Ordenar chats por último mensaje (más reciente primero)
        userChats.sort((a, b) => (b.lastMessageTime || 0) - (a.lastMessageTime || 0));

        setChats(userChats);
        setFilteredChats(userChats);
      } catch (error) {
        console.error("Error al cargar chats:", error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    loadChats();
  }, [currentUserId]);

  // Función para refrescar
  const onRefresh = () => {
    setRefreshing(true);
    loadChats();
  };

  // Función para filtrar chats
  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter(chat =>
        chat.namePerson.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  };

  // Función para limpiar búsqueda
  const clearSearch = () => {
    setSearchText("");
    setFilteredChats(chats);
  };

  // Actualizar filteredChats cuando chats cambie
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter(chat =>
        chat.namePerson.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [chats, searchText]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={imagePath.backgroundFeatured}
        resizeMode="contain"
        style={styles.backgroundImage}
      >
        <View style={styles.container2}>
          {/* Header con título */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Mensajes</Text>
            {chats.length > 0 && (
              <Text style={styles.headerSubtitle}>
                {chats.length} {chats.length === 1 ? 'conversación' : 'conversaciones'}
              </Text>
            )}
          </View>

          {/* Barra de búsqueda */}
          <View style={styles.search}>
            <SearchBar
              placeHolder="Buscar conversaciones..."
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>

          {/* Lista de chats con RefreshControl */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#0E3549"
                colors={["#0E3549"]}
              />
            }
            contentContainerStyle={styles.scrollContent}
          >
            {filteredChats.length === 0 ? (
              <EmptyState searchText={searchText} onClearSearch={clearSearch} />
            ) : (
              <View style={styles.chatsContainer}>
                {filteredChats.map(({
                  chatId,
                  namePerson,
                  profileImageSource,
                  otherUserId,
                  lastMessage,
                  lastMessageTime,
                  lastMessageSender,
                  isRead
                }) => (
                  <View key={chatId} style={styles.chatItemContainer}>
                    <ChatButton
                      chatId={chatId}
                      namePerson={namePerson}
                      profileImageSource={profileImageSource}
                      otherUserId={otherUserId}
                      senderId={currentUserId?.toString() ?? ""}
                    />
                    {/* Previsualización del último mensaje */}
                    {lastMessage && lastMessageTime && (
                      <View style={styles.lastMessageContainer}>
                        <View style={styles.messageContent}>
                          <View style={styles.messageRow}>
                            {/* Indicador de quién envió el mensaje */}
                            <Text style={styles.senderIndicator}>
                              {lastMessageSender === currentUserId?.toString() ? "Tú: " : ""}
                            </Text>
                            <Text
                              style={[
                                styles.lastMessageText,
                                !isRead && lastMessageSender !== currentUserId?.toString() && styles.unreadMessage
                              ]}
                              numberOfLines={1}
                            >
                              {lastMessage}
                            </Text>
                          </View>
                          <View style={styles.timeContainer}>
                            <Text style={styles.lastMessageTime}>
                              {formatTime(lastMessageTime)}
                            </Text>
                            {/* Indicador de mensaje no leído */}
                            {!isRead && lastMessageSender !== currentUserId?.toString() && (
                              <View style={styles.unreadIndicator} />
                            )}
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E3549",
  },
  backgroundImage: {
    flex: 1,
  },
  container2: {
    backgroundColor: "rgba(217, 217, 217, 0.5)",
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30,
    flex: 1,
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: "#0E3549",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: moderateScale(14),
    color: "rgba(14, 53, 73, 0.7)",
  },
  search: {
    marginHorizontal: 30,
    marginBottom: 15,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  chatsContainer: {
    paddingHorizontal: 15,
  },
  chatItemContainer: {
    marginBottom: 8,
  },
  lastMessageContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginTop: -5,
    borderTopWidth: 1,
    borderTopColor: 'rgba(14, 53, 73, 0.1)',
  },
  messageContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  senderIndicator: {
    fontSize: moderateScale(11),
    color: "#0E3549",
    fontWeight: '600',
  },
  lastMessageText: {
    flex: 1,
    fontSize: moderateScale(11),
    color: "#666",
    marginRight: 8,
  },
  unreadMessage: {
    fontWeight: '600',
    color: "#0E3549",
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lastMessageTime: {
    fontSize: moderateScale(9),
    color: "#0E3549",
    fontWeight: '500',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B6B",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: "#0E3549",
    marginTop: 15,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: moderateScale(14),
    color: "rgba(14, 53, 73, 0.7)",
    textAlign: 'center',
    lineHeight: 20,
  },
  clearSearchButton: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#0E3549",
    borderRadius: 20,
  },
  clearSearchText: {
    color: '#ffffff',
    fontSize: moderateScale(12),
    fontWeight: '500',
  },
});

export default Messages;
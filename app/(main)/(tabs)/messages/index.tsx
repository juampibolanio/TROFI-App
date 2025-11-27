import React, { useEffect, useState, useCallback } from "react";
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
  Image,
  Alert,
} from "react-native";
import SearchBar from "@/components/searchBar";
import imagePath from "@/constants/imagePath";
import { moderateScale } from "react-native-size-matters";
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getUserByUid } from "@/services/userService";
import { getUserChats, deleteChat } from "@/services/messageService";
import { router, useFocusEffect } from "expo-router";

type Chat = {
  id: string;
  participants: string[];
  lastMessage: string;
  timestamp: number;
  readBy: { [uid: string]: boolean };
  isUnread: boolean;
  otherUserUid: string;
  otherUserName: string;
  otherUserImage: string;
};

const Loader = () => {
  return (
    <View style={loaderStyles.container}>
      <ActivityIndicator size="large" color={"#ffffff"} />
      <Text style={loaderStyles.loadingText}>Cargando chats...</Text>
    </View>
  );
};

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
  const currentUserUid = useSelector((state: RootState) => state.user.uid);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

  /**
   * Carga los chats del usuario desde el backend
   */
  const loadChats = async () => {
    if (!currentUserUid) return;

    try {
      const response = await getUserChats(currentUserUid);
      const chatsData = response.data.chats;

      // Enriquecer cada chat con información del otro usuario
      const enrichedChats = await Promise.all(
        chatsData.map(async (chat: any) => {
          try {
            // Encontrar el UID del otro participante
            const otherUserUid = chat.participants.find((uid: string) => uid !== currentUserUid);

            if (!otherUserUid) return null;

            // Obtener información del otro usuario
            const otherUserResponse = await getUserByUid(otherUserUid);
            const otherUser = otherUserResponse.data;

            // readBy es un objeto { uid: true }, no un array
            const readByObj = chat.readBy || {};
            const isUnread = !readByObj[currentUserUid || ''];

            return {
              id: chat.id,
              participants: chat.participants,
              lastMessage: chat.lastMessage || '',
              timestamp: chat.timestamp || Date.now(),
              readBy: readByObj,
              isUnread,
              otherUserUid,
              otherUserName: otherUser.name || 'Usuario',
              otherUserImage: otherUser.imageProfile || '',
            };
          } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            return null;
          }
        })
      );

      // Filtrar chats nulos y ordenar por timestamp
      const validChats = enrichedChats
        .filter((chat): chat is Chat => chat !== null)
        .sort((a, b) => b.timestamp - a.timestamp);

      setChats(validChats);
      setFilteredChats(validChats);
    } catch (error: any) {
      console.error("Error al cargar chats:", error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'No se pudieron cargar los chats'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Cargar chats al montar y cuando vuelva el foco
  useFocusEffect(
    useCallback(() => {
      loadChats();
    }, [currentUserUid])
  );

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
        chat.otherUserName.toLowerCase().includes(text.toLowerCase())
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
        chat.otherUserName.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [chats, searchText]);

  /**
   * Navega a la conversación
   */
  const navigateToChat = (chat: Chat) => {
    router.push({
      pathname: "/(main)/(tabs)/messages/conversation",
      params: {
        chatId: chat.id,
        otherUserId: chat.otherUserUid,
        otherUserName: chat.otherUserName,
        otherUserImage: chat.otherUserImage,
      }
    });
  };

  /**
   * Elimina un chat (soft delete)
   */
  const handleDeleteChat = (chatId: string) => {
    Alert.alert(
      'Eliminar chat',
      '¿Estás seguro que deseas eliminar esta conversación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              if (!currentUserUid) return;
              await deleteChat(chatId, currentUserUid);
              loadChats(); // Recargar chats
            } catch (error: any) {
              console.error('Error al eliminar chat:', error);
              Alert.alert('Error', 'No se pudo eliminar el chat');
            }
          }
        }
      ]
    );
  };

  /**
   * Formatea el timestamp
   */
  const formatTime = (timestamp: number) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (diffInHours < 168) {
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
                {filteredChats.map((chat) => (
                  <Pressable
                    key={chat.id}
                    style={({ pressed }) => [
                      styles.chatItem,
                      pressed && { opacity: 0.7 }
                    ]}
                    onPress={() => navigateToChat(chat)}
                    onLongPress={() => handleDeleteChat(chat.id)}
                  >
                    {/* Imagen de perfil */}
                    <Image
                      source={{ uri: chat.otherUserImage || '' }}
                      style={styles.profileImage}
                      defaultSource={imagePath.defaultUserImage}
                    />

                    {/* Información del chat */}
                    <View style={styles.chatInfo}>
                      <View style={styles.chatHeader}>
                        <Text style={styles.chatName}>{chat.otherUserName}</Text>
                        <Text style={styles.chatTime}>{formatTime(chat.timestamp)}</Text>
                      </View>

                      <View style={styles.messageRow}>
                        <Text
                          style={[
                            styles.lastMessage,
                            chat.isUnread && styles.unreadMessage
                          ]}
                          numberOfLines={1}
                        >
                          {chat.lastMessage || 'Sin mensajes'}
                        </Text>
                        {chat.isUnread && <View style={styles.unreadIndicator} />}
                      </View>
                    </View>
                  </Pressable>
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
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: moderateScale(12),
    borderRadius: moderateScale(15),
    marginBottom: moderateScale(10),
  },
  profileImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    marginRight: moderateScale(12),
    backgroundColor: '#f0f0f0',
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(4),
  },
  chatName: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#0E3549',
  },
  chatTime: {
    fontSize: moderateScale(11),
    color: '#666',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    flex: 1,
    fontSize: moderateScale(13),
    color: '#666',
    marginRight: moderateScale(8),
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#0E3549',
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
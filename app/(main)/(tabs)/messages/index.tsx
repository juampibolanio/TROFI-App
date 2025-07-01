import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import SearchBar from "@/components/searchBar";
import imagePath from "@/constants/imagePath";
import { moderateScale } from "react-native-size-matters";

import { ref, onValue } from "firebase/database";
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
};

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

const Messages = () => {
  const currentUserId = useSelector((state: RootState) => state.user.id);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (!currentUserId) return;

    const chatsRef = ref(database, "chats");

    const unsubscribe = onValue(chatsRef, async (snapshot) => {
      const chatsData = snapshot.val() || {};
      const chatEntries = Object.keys(chatsData);
      const userChats: Chat[] = [];

      const promises = chatEntries.map(async (chatId) => {
        if (chatId.includes(currentUserId.toString())) {
          const [id1, id2] = chatId.split("_");
          const otherUserId = id1 === currentUserId.toString() ? parseInt(id2) : parseInt(id1);

          try {
            const otherUser = await getUserById(otherUserId);

            userChats.push({
              chatId,
              namePerson: otherUser.fullname,
              profileImageSource: { uri: otherUser.imageProfile || imagePath.logo },
              otherUserId: otherUser.id,
            });
          } catch (error) {
            console.log("Error al obtener usuario por ID:", error);
          }
        }
      });

      await Promise.all(promises);
      setChats(userChats);
      setFilteredChats(userChats);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUserId]);

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

  // esto actualiza filteredChats cuando chats cambie
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={imagePath.backgroundFeatured}
          resizeMode="contain"
          style={styles.backgroundImage}
        >
          <View style={styles.container2}>
            <View style={styles.search}>
              <SearchBar 
                placeHolder="Buscar" 
                value={searchText}
                onChangeText={handleSearch}
              />
            </View>

            {filteredChats.length === 0 && searchText.trim() !== "" && (
              <Text style={[styles.text, { textAlign: "center" }]}>
                No se encontraron chats con "{searchText}".
              </Text>
            )}

            {filteredChats.length === 0 && searchText.trim() === "" && (
              <Text style={[styles.text, { textAlign: "center" }]}>
                No tenés chats todavía.
              </Text>
            )}

            {filteredChats.map(({ chatId, namePerson, profileImageSource, otherUserId }) => (
              <ChatButton
                key={chatId}
                chatId={chatId}
                namePerson={namePerson}
                profileImageSource={profileImageSource}
                otherUserId={otherUserId}
                senderId={currentUserId?.toString() ?? ""}
              />
            ))}
          </View>
        </ImageBackground>
      </ScrollView>
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
  },
  search: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
  },
  text: {
    marginLeft: 15,
    marginBottom: 5,
    fontSize: moderateScale(13),
    color: "#090909",
  },
});

export default Messages;
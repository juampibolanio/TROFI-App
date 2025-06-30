import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import ChatButton from "@/components/chatButton";
import SearchBar from "@/components/searchBar";
import imagePath from "@/constants/imagePath";
import { moderateScale } from "react-native-size-matters";

import { ref, onValue } from "firebase/database";
import { database } from "@/constants/firebaseConfig";

type Chat = {
  chatId: string;
  namePerson: string;
  profileImageSource: any; // ajusta según tu tipado de imagen
};

const currentUserId = "2"; // cambiar por el usuario real

const Messages = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const chatsRef = ref(database, "chats");
    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const chatsData = snapshot.val() || {};
      const chatArray: Chat[] = [];

      Object.keys(chatsData).forEach((chatId) => {
        // Por ejemplo, si el id es '1_2' y currentUserId = '2', chequeamos si contiene '2'
        if (chatId.includes(currentUserId)) {
          chatArray.push({
            chatId,
            namePerson: "Id 2", // Podrías armar el nombre con lógica propia
            profileImageSource: imagePath.logo, // o lógica para la imagen
          });
        }
      });

      setChats(chatArray);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>
          Cargando chats...
        </Text>
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
              <SearchBar placeHolder="Buscar" />
            </View>

            {chats.length === 0 && (
              <Text style={[styles.text, { textAlign: "center" }]}>
                No tenés chats todavía.
              </Text>
            )}

            {chats.map(({ chatId, namePerson, profileImageSource }) => (
              <ChatButton
                key={chatId}
                profileImageSource={profileImageSource}
                namePerson={namePerson}
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

import imagePath from "@/constants/imagePath";
import React from "react";
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
import { ScreenStackHeaderCenterView } from "react-native-screens";
import { moderateScale } from "react-native-size-matters";

const Messages = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={imagePath.backgroundFeatured}
            resizeMode="contain"
            style={styles.backgroundImage}
          >
            <View style={styles.container2}>
              <View style={styles.search}>
              <SearchBar placeHolder="Buscar"/>
              </View>
              <ChatButton
                profileImageSource={imagePath.elderlyCare}
                namePerson="Maria"
              />
              <ChatButton
                profileImageSource={imagePath.electricity}
                namePerson="Dario"
              />
              <ChatButton 
                profileImageSource={imagePath.carpentry}
                namePerson="Pedro Ramirez"
              />
              <View style = {styles.container3}>
              <Text style={styles.text}>Todos los chats</Text>
                <ChatButton 
                  profileImageSource={imagePath.logo}
                  namePerson="Lucas Sanchez"
                />
                <ChatButton 
                  profileImageSource={imagePath.masonry}
                  namePerson="Memo Fierro"
                />
                <ChatButton 
                  profileImageSource={imagePath.plumbing}
                  namePerson="Sofia"
                />
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </>
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
  search:{
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10
  },
  container3:{
    backgroundColor: "rgba(217, 217, 217, 0.5)",
    borderRadius: 30,
    paddingTop: 10,
    marginTop: 5
  },
  text:{
    marginLeft: 15,
    marginBottom: 5,
    fontSize: moderateScale(13)
  }
});

export default Messages;

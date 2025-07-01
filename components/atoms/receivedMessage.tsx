import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import React from "react";
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

type Props = {
  profileImageSource: ImageSourcePropType;
  time: string;
  textMessage: string;
  //recent: string;
};

const ReceivedMessage: React.FC<Props> = ({
  profileImageSource,
  time,
  textMessage,
}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={profileImageSource} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}> {textMessage} </Text>
        </View>
        <View>
          <Text style={styles.time}> {time} </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(217, 217, 217, 1)",
    flexDirection: "row", // disposición horizontal
    alignSelf: "flex-start", // se ajusta al ancho del contenido
    padding: 10, // espacio interno
    marginVertical: 5, // separación entre mensajes
    maxWidth: "80%", // para evitar que se vuelva gigante
    marginLeft: 15,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20
  },
  text: {
    color: "#090909",
    fontSize: moderateScale(13),
  },
  imageContainer: {
    marginRight: scale(10),
  },
  image: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(20),
  },
  time: {
    color: "#090909",
    fontSize: moderateScale(9),
  },
  textContainer: {
    justifyContent: "center",
    flex: 1,
    marginLeft: 10,
  },
});

export default ReceivedMessage;

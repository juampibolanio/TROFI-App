import { Roboto_300Light, Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import React from 'react';
import { Dimensions, View, Text, Image, StyleSheet, ImageSourcePropType, Pressable } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

type Props = {
  profileImageSource: ImageSourcePropType;
  namePerson: string;
  //recent: string;
}

const ChatButton: React.FC<Props> = ({ profileImageSource, namePerson, recent }) => {
  return (
    <Pressable style={({ pressed }) => [
      {
        transform: [{ scale: pressed ? 0.98 : 1 }],
      },
      styles.button,
    ]} >
      {/*fondo que cambia si es reciente o no*/}
      {/*if (recent === 'true'){
        <View style={styles.recentBackground}/>
      } else {
        <View style={styles.allBackground}/>
      }*/}
      {/* foto de perfil */}
      <View style={styles.imageContainer}>
        <Image source={profileImageSource} style={styles.image} />
      </View>

      {/* nombre del chat */}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{namePerson}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: scale(280),
    height: verticalScale(50),
    borderRadius: scale(40),
    backgroundColor: 'rgba(240, 240, 240, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    position: 'relative',
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10
  },
  recentBackground: {},
  allBackground: {},
  imageContainer: {
    marginRight: scale(10),
  },
  image: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(20),
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10
  },
  name: {
    color: '#090909',
    fontSize: moderateScale(13),

  },
})

export default ChatButton;
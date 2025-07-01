import React from 'react';
import { Dimensions, View, Text, Image, StyleSheet, ImageSourcePropType, Pressable } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

type Props = {
  profileImageSource: ImageSourcePropType;
  namePerson: string;
  chatId: string;
  senderId: string;
  otherUserId: number;
};

const ChatButton: React.FC<Props> = ({
  profileImageSource,
  namePerson,
  chatId,
  otherUserId,
}) => {
  const handlePress = () => {
    router.push({
      pathname: "/(main)/(tabs)/messages/conversation",
      params: {
        chatId,
        otherUserId: otherUserId.toString(),
        otherUserName: namePerson,
        otherUserImage:
          typeof profileImageSource === 'object' && 'uri' in profileImageSource
            ? profileImageSource.uri
            : '',
      },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        styles.button,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={profileImageSource} style={styles.image} />
      </View>

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
    marginBottom: 10,
  },
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
    marginLeft: 10,
  },
  name: {
    color: '#090909',
    fontSize: moderateScale(13),
  },
});

export default ChatButton;
import imagePath from '@/constants/imagePath'
import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const Featureds = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={imagePath.backgroundFeatured}
          resizeMode='contain'
          style={styles.overlay}
        >



        </ImageBackground>
      </SafeAreaView>
    </>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E3549"
  },
  overlay: {
    flex: 1,
  }
})

export default Featureds;
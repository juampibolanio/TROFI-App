import imagePath from '@/constants/imagePath'
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, ScrollView } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import ServiceCard from '@/components/serviceCard'

const Featureds = () => {
  return (
    <>
      
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
        <ImageBackground
          source={imagePath.backgroundFeatured}
          resizeMode='contain'
          style={styles.overlay}
        >

        <View style={styles.cardConteiner}>

          <ServiceCard imageSource={imagePath.plumbing} title='Plomería' />

          <ServiceCard imageSource={imagePath.smithy} title='Herrería' />

          <ServiceCard imageSource={imagePath.masonry} title='Albañilería' />

          <ServiceCard imageSource={imagePath.electricity} title='Electricidad' />

          <ServiceCard imageSource={imagePath.elderlyCare} title='Cuidados' />

          <ServiceCard imageSource={imagePath.carpentry} title='Carpintería' />

        </View>
        </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E3549",
  },
  overlay: {
    flex: 1,
  },
  cardConteiner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: verticalScale(10)
  }
})

export default Featureds;
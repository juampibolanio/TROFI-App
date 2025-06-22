import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Perfil = () => {

  const handleEditProfile = () => {
    router.push('/profile/userSettings');
  };

  const handleMyReviews = () => {
    router.push('/profile/reviews');
  };

  const handleMyPhotos = () => {
    router.push('/profile/myGallery');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.profileImage}
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.userName}>Lucas iondo</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={16} color="white" />
                <Text style={styles.location}>Resistencia, Chaco</Text>
              </View>
              <Text style={styles.jobDescription}>Mi descripción laboral</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="pencil-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentSectionsContainer}>
          <View style={styles.descriptionCard}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.
            </Text>
          </View>

          <View style={styles.scoreCard}>
            <Text style={styles.sectionTitle}>Puntuación</Text>
            <View style={styles.scoreContent}>
              <Text style={styles.scoreValue}>9.9</Text>
              <Ionicons name="star-outline" size={24} color="#607D8B" />
            </View>
          </View>
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleMyReviews}>
            <Text style={styles.actionButtonText}>Mis reseñas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleMyPhotos}>
            <Text style={styles.actionButtonText}>Mis fotos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.reviewSection}>
          <View style={styles.reviewCard}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.reviewerImage}
            />
            <View style={styles.reviewTextContainer}>
              <Text style={styles.reviewerName}>Claudia Lopez</Text>
              <Text style={styles.reviewComment}>Muy buen trabajo</Text>
            </View>
            <Text style={styles.reviewScore}>9.0</Text>
          </View>
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0E3549",
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#24475E',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    marginRight: 15,
  },
  profileTextContainer: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: 'white',
    marginLeft: 5,
  },
  jobDescription: {
    fontSize: 16,
    color: 'white',
  },
  editButton: {
    position: 'absolute',
    top: -15,
    right: 15,
    backgroundColor: '#607D8B',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contentSectionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  descriptionCard: {
    backgroundColor: '#24475E',
    borderRadius: 15,
    padding: 15,
    flex: 2,
    marginRight: 10,
  },
  scoreCard: {
    backgroundColor: '#24475E',
    borderRadius: 15,
    padding: 15,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#CFD8DC',
    lineHeight: 20,
  },
  scoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 5,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#607D8B',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  reviewSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  reviewCard: {
    backgroundColor: '#24475E',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  reviewTextContainer: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  reviewComment: {
    fontSize: 14,
    color: '#CFD8DC',
  },
  reviewScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Perfil;
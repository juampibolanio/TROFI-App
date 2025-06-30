import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { moderateScale } from 'react-native-size-matters';
import imagePath from '@/constants/imagePath';

const Perfil = () => {
  const user = useSelector((state: RootState) => state.user);

  const navigateToEditProfile = () => {
    router.push('/profile/editProfile');
  };

  const navigateToMyReviews = () => {
    router.push('/profile/reviews');
  };

  const navigateToMyPhotos = () => {
    router.push('/profile/myGallery');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={imagePath.backgroundUDetails} style={styles.overlay} resizeMode='cover'>

        {/* HEADER */}
        <View style={styles.header}>
          <Image source={{ uri: user.imageProfile ?? 'https://via.placeholder.com/100' }} style={styles.imagen} />
          <View style={styles.infoContainer}>
            <Text style={styles.username}>{user.name || 'Sin nombre'}</Text>

            {user.isProfileComplete ? (
              <>
                {user.location && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="location-outline" size={14} color="white" style={{ marginRight: 4 }} />
                    <Text style={styles.ubication}>{user.location}</Text>
                  </View>
                )}
                <Text style={styles.jobDescription}>{user.jobDescripction || 'Sin descripción laboral'}</Text>
              </>
            ) : (
              <Text style={styles.incompleteText}>
                Tu perfil no está completo. Termina de completarlo aquí.
              </Text>
            )}

            <Pressable style={styles.sendMessageBottom} onPress={navigateToEditProfile}>
              <Ionicons name='pencil' size={15} color={'#0E3549'} />
              <Text style={styles.sendText}>
                {user.isProfileComplete ? 'Editar' : 'Completar perfil'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* BODY */}
        <View style={styles.body}>
          <View style={styles.descriptionOverlay}>
            <View style={styles.description}>
              <Text style={styles.descriptionTitle}>Descripción</Text>
              <Text style={styles.descriptionText}>
                {user.userDescription || 'Sin descripción'}
              </Text>
            </View>
          </View>

          <View style={styles.scoreOverlay}>
            <View style={styles.score}>
              <Text style={styles.scoreTitle}>Puntuación</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreNumber}>
                  {user.score && user.score > 0 ? user.score : 'N/D'}
                </Text>
                <Ionicons name="star-outline" size={30} color="#0E3549" />
              </View>
            </View>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.profileBottomsContainer}>
            <Pressable
              style={({ pressed }) => [styles.workGalery, pressed && { opacity: 0.5 }]}
              onPress={navigateToMyReviews}
            >
              <Text style={styles.textBottom}>Reseñas para mí</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.workGalery, pressed && { opacity: 0.5 }]}
              onPress={navigateToMyPhotos}
            >
              <Text style={styles.textBottom}>Mi galería de fotos</Text>
            </Pressable>
          </View>
        </View>

        {/* Condición para perfil laboral incompleto */}
        {user.isProfileComplete && user.isWorkerProfileComplete == false && (
          <View style={styles.workerProfileSection}>
            <View style={styles.workerProfileCard}>
              <Text style={styles.workerProfileText}>
                ¿Querés aparecer como trabajador? Completá tu perfil laboral.
              </Text>
              <Pressable style={styles.workerProfileButton} onPress={navigateToEditProfile}>
                <Text style={styles.workerProfileButtonText}>Completar perfil laboral</Text>
              </Pressable>
            </View>
          </View>
        )}

        <View style={{ height: 50 }} />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E3549',
  },

  overlay: {
    flex: 1,
  },

  /* ----------------------------------- HEADER -----------------------------------*/

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: moderateScale(20),
  },

  imagen: {
    width: moderateScale(115),
    height: moderateScale(115),
    borderRadius: moderateScale(60),
    borderColor: '#FFFFFF',
    borderWidth: moderateScale(2)
  },

  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: moderateScale(5),
    marginLeft: moderateScale(15),
  },

  username: {
    fontSize: moderateScale(22),
    color: '#FFFFFF',
    fontFamily: 'RobotoRegular'
  },

  ubication: {
    fontSize: moderateScale(14),
    color: '#FFFFFF',
    fontFamily: 'RobotoRegular'
  },

  jobDescription: {
    fontSize: moderateScale(12),
    color: '#FFFFFF',
    fontFamily: 'RobotoRegular'
  },

  incompleteText: {
    fontSize: moderateScale(12),
    color: '#FFCDD2',
    fontFamily: 'RobotoRegular'
  },

  sendMessageBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(13),
    borderRadius: moderateScale(15),
    marginTop: moderateScale(5),
    alignSelf: 'flex-end',
    gap: moderateScale(6)
  },

  sendText: {
    color: '#000000',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    fontFamily: 'RobotoRegular'
  },

  /* ----------------------------------- BODY -----------------------------------*/
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(10),
  },

  descriptionOverlay: {
    backgroundColor: '#696969',
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(5),
    borderRadius: moderateScale(15)
  },

  scoreOverlay: {
    backgroundColor: '#696969',
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(5),
    borderRadius: moderateScale(10)
  },

  description: {
    width: moderateScale(200),
    height: moderateScale(250),
    backgroundColor: '#D9D9D9',
    padding: moderateScale(10),
    borderRadius: moderateScale(10)
  },

  descriptionTitle: {
    borderRadius: moderateScale(10),
    padding: moderateScale(3),
    fontSize: moderateScale(20),
    fontWeight: 'bold'
  },

  descriptionText: {
    backgroundColor: 'transparent',
    fontFamily: 'RobotoLight',
    fontSize: moderateScale(14),
    textAlign: 'justify'
  },

  score: {
    width: moderateScale(115),
    height: moderateScale(250),
    backgroundColor: '#D9D9D9',
    padding: moderateScale(10),
    borderRadius: moderateScale(10)
  },

  scoreTitle: {
    borderRadius: moderateScale(10),
    padding: moderateScale(3),
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    textAlign: 'center'
  },

  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  scoreNumber: {
    fontSize: moderateScale(32),
    fontFamily: 'RobotoLight'
  },

  /* ----------------------------------- FOOTER -----------------------------------*/

  footer: {
    justifyContent: 'center',
  },

  profileBottomsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(15)
  },

  workGalery: {
    padding: moderateScale(12),
    backgroundColor: '#D9D9D9',
    borderRadius: moderateScale(12)
  },

  textBottom: {
    color: '#000000',
    fontSize: moderateScale(12),
    fontFamily: 'RobotoRegular',
    fontWeight: 'bold'
  },

  /* ----------------------------------- WORKER PROFILE SECTION -----------------------------------*/

  workerProfileSection: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20)
  },

  workerProfileCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },

  workerProfileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(12),
    gap: moderateScale(8)
  },

  workerProfileTitle: {
    color: '#0E3549',
    fontSize: moderateScale(16),
    fontFamily: 'RobotoRegular',
    fontWeight: 'bold'
  },

  workerProfileText: {
    color: '#333333',
    fontSize: moderateScale(13),
    fontFamily: 'RobotoRegular',
    textAlign: 'center',
    lineHeight: moderateScale(18),
    marginBottom: moderateScale(15)
  },

  workerProfileButton: {
    backgroundColor: '#0E3549',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(25),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0E3549',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },

  workerProfileButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: moderateScale(13),
    fontFamily: 'RobotoRegular'
  },
});

export default Perfil;
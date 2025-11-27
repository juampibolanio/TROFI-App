import Loader from '@/components/atoms/Loader';
import UserReviewDetail from '@/components/userReviewDetail';
import fonts from '@/constants/fonts';
import imagePath from '@/constants/imagePath';
import { getUserReviews } from '@/services/reviewService';
import { useFonts } from '@expo-google-fonts/roboto';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Pressable,
  Text,
  RefreshControl,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type Reviewer = {
  uid: string;
  name?: string;
  imageProfile?: string;
};

type Review = {
  id: string;
  reviewer?: Reviewer;
  description: string;
  score: number;
  created_at: string;
};

const ReviewDetail = () => {
  const { uid, name, imageProfile } = useLocalSearchParams();
  const [fontsLoaded] = useFonts(fonts);
  const currentUserUid = useSelector((state: RootState) => state.user.uid);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReviews = useCallback(async () => {
    if (!uid) return;

    try {
      const data = await getUserReviews(uid as string);
      setReviews(data || []);
    } catch (e) {
      console.error('Error al obtener las reseñas:', e);
      Alert.alert('Error', 'No se pudieron cargar las reseñas');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [uid]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchReviews();
    }, [fetchReviews])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchReviews();
  };

  const handleNavigateToReviewForm = () => {
    // Validar que no sea el mismo usuario
    if (currentUserUid === uid) {
      Alert.alert('Aviso', 'No puedes reseñarte a ti mismo');
      return;
    }

    // Verificar si ya existe una reseña del usuario actual
    const alreadyReviewed = reviews.some(
      (review) => review.reviewer?.uid === currentUserUid
    );

    if (alreadyReviewed) {
      Alert.alert(
        'Ya reseñaste a este usuario',
        'Solo puedes hacer una reseña por usuario. Si deseas modificarla, contacta al soporte.'
      );
      return;
    }

    router.push({
      pathname: '/(main)/(tabs)/search/[uid]/reviewForm',
      params: { uid: uid as string, name, imageProfile }
    });
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.overlay}
        source={imagePath.backgroundRDetails}
        resizeMode="cover"
      >
        <View style={styles.headerContainer}>
          <Pressable style={styles.backBottom} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </Pressable>
          <Text style={styles.title}>Reseñas de {name}</Text>
        </View>

        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#FFFFFF"
                colors={["#FFFFFF"]}
              />
            }
          >
            <View style={styles.reviewContainer}>
              {reviews.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Ionicons name="star-outline" size={60} color="rgba(255,255,255,0.5)" />
                  <Text style={styles.emptyText}>
                    Este usuario aún no tiene reseñas.
                  </Text>
                  <Text style={styles.emptySubtext}>
                    ¡Sé el primero en reseñarlo!
                  </Text>
                </View>
              ) : (
                reviews.map((r) => (
                  <UserReviewDetail
                    key={r.id}
                    profileImage={
                      r.reviewer?.imageProfile
                        ? { uri: r.reviewer.imageProfile }
                        : imagePath.defaultUserImage
                    }
                    username={r.reviewer?.name || 'Usuario anónimo'}
                    description={r.description}
                    score={r.score}
                  />
                ))
              )}
            </View>
          </ScrollView>
        )}

        <View style={styles.footerContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.sendReviewButton,
              pressed && { opacity: 0.5 }
            ]}
            onPress={handleNavigateToReviewForm}
          >
            <Text style={styles.sendReviewButtonText}>Reseña a este usuario</Text>
            <Ionicons name="star-outline" size={24} color="#000" style={{ marginLeft: 8 }} />
          </Pressable>
        </View>
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
    flex: 1
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(15),
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    minHeight: moderateScale(40),
    alignSelf: 'center',
  },
  backBottom: {
    padding: moderateScale(8),
    marginRight: moderateScale(6),
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    fontFamily: 'RobotoLight',
    color: '#000',
  },
  reviewContainer: {
    flex: 1,
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(10),
    marginHorizontal: moderateScale(10),
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15),
    gap: moderateScale(10),
    marginTop: moderateScale(60),
    marginBottom: moderateScale(80), // Espacio para el botón flotante
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(60),
    gap: moderateScale(12),
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontFamily: 'RobotoRegular',
    textAlign: 'center',
    fontWeight: '500',
  },
  emptySubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: moderateScale(13),
    fontFamily: 'RobotoLight',
    textAlign: 'center',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(14, 53, 73, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  sendReviewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    backgroundColor: '#D9D9D9'
  },
  sendReviewButtonText: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    fontFamily: 'RobotoLight',
    color: '#000',
  }
});

export default ReviewDetail;
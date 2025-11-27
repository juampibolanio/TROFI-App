import Loader from '@/components/atoms/Loader';
import UserReviewDetail from '@/components/userReviewDetail';
import imagePath from '@/constants/imagePath';
import { getUserReviews } from '@/services/reviewService';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Pressable,
  Text,
  RefreshControl,
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

const MyReviews = () => {
  const userUid = useSelector((state: RootState) => state.user.uid);
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReviews = async () => {
    if (!userUid) return;

    try {
      const data = await getUserReviews(userUid);
      setReviewsData(data || []);
    } catch (error) {
      console.error('Error al obtener reseñas:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Cargar reseñas al enfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      fetchReviews();
    }, [userUid])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchReviews();
  };

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
          <Text style={styles.title}>Reseñas para tí</Text>
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
              {reviewsData.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Ionicons name="star-outline" size={60} color="rgba(255,255,255,0.5)" />
                  <Text style={styles.emptyText}>
                    Aún no tenés reseñas.
                  </Text>
                  <Text style={styles.emptySubtext}>
                    Las reseñas de otros usuarios aparecerán aquí
                  </Text>
                </View>
              ) : (
                reviewsData.map((r) => (
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
});

export default MyReviews;
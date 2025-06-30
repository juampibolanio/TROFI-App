import Loader from '@/components/atoms/Loader';
import UserReviewDetail from '@/components/userReviewDetail';
import imagePath from '@/constants/imagePath';
import { getUserReviews } from '@/services/reviewService';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Pressable,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type Reviewer = {
  name?: string;
  imageProfile?: string;
};

type Review = {
  reviewer?: Reviewer;
  description: string;
  score: number;
};

const MyReviews = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const username = useSelector((state: RootState) => state.user.name);
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getUserReviews(Number(userId));
        setReviewsData(data || []);
      } catch (error) {
        console.error('Error al obtener reseñas:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchReviews();
    }
  }, [userId]);

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
          <ScrollView>
            <View style={styles.reviewContainer}>
              {reviewsData.length === 0 ? (
                <Text style={{ color: '#fff', textAlign: 'center' }}>
                  Aún no tenés reseñas.
                </Text>
              ) : (
                reviewsData.map((r, index) => (
                  <UserReviewDetail
                    key={index}
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
});

export default MyReviews;
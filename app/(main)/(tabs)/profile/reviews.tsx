import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';

const reviews = () => {
  const reviewsData = [
    {
      id: '1',
      initials: 'LL',
      name: 'Lucas López',
      comment: 'Muy buen cliente, respetuoso, y atento.',
      score: 8.0,
    },
    {
      id: '2',
      initials: 'HB',
      name: 'Hernan Bermudez',
      comment: 'Gran cliente y puntual.',
      score: 8.7,
    },
    {
      id: '3',
      initials: 'MG',
      name: 'Martina García',
      comment: 'Comunicación excelente y trato amable.',
      score: 9.5,
    },
    {
      id: '4',
      initials: 'JP',
      name: 'Juan Perez',
      comment: 'Todo perfecto, 100% recomendable.',
      score: 9.9,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0E3549" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Mis reseñas</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {reviewsData.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.initialsContainer}>
              <Text style={styles.initialsText}>{review.initials}</Text>
            </View>
            
            <View style={styles.contentContainer}>
              <Text style={styles.nameText}>{review.name}</Text>
              <Text style={styles.commentText}>{review.comment}</Text>
            </View>
            
            <Text style={styles.scoreText}>{review.score.toFixed(1)}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0E3549",
  },
  header: {
    backgroundColor: '#24475E',
    paddingTop: Platform.OS === 'ios' ? 50 : 20, 
    paddingBottom: 16,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 70,
  },
  reviewCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  initialsContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4682B4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initialsText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#666',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 10,
  },
});

export default reviews;
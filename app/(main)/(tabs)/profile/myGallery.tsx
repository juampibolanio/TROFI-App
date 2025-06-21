import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockPhotos = [
  { id: '1', uri: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Foto1' },
  { id: '2', uri: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Foto2' },
  { id: '3', uri: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Foto3' },
  { id: '4', uri: 'https://via.placeholder.com/150/F0FF33/FFFFFF?text=Foto4' },
  { id: '5', uri: 'https://via.placeholder.com/150/8D33FF/FFFFFF?text=Foto5' },
  { id: '6', uri: 'https://via.placeholder.com/150/FF338D/FFFFFF?text=Foto6' },
];

const MyGallery = () => {
  const handleAddPhoto = () => console.log('Agregar foto');
  const handleDeletePhoto = () => console.log('Eliminar foto');
  const handleFilterByDate = () => console.log('Filtrar por fecha');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Filtro por fecha */}
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterByDate}>
          <Text style={styles.filterButtonText}>Filtrar por fecha</Text>
          <Ionicons name="calendar-outline" size={20} color="#333" />
        </TouchableOpacity>

        {/* Grid de imágenes */}
        <View style={styles.imageGrid}>
          {mockPhotos.map((photo) => (
            <TouchableOpacity key={photo.id} style={styles.imageWrapper}>
              <Image source={{ uri: photo.uri }} style={styles.image} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Botones de acción */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleAddPhoto}>
            <Text style={styles.actionButtonText}>Agregar foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleDeletePhoto}>
            <Text style={styles.actionButtonText}>Eliminar foto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#24475E",
  },
  scrollContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#607D8B',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterButtonText: {
    fontSize: 16,
    color: 'white',
    marginRight: 10,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageWrapper: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#607D8B',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    width: '48%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default MyGallery;
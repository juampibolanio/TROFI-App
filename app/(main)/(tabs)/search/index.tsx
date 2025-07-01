import Loader from '@/components/atoms/Loader';
import fonts from '@/constants/fonts';
import imagePath from '@/constants/imagePath';
import { fetchJobCategories } from '@/services/jobService';
import { searchWorkers } from '@/services/userService';
import { useFonts } from '@expo-google-fonts/roboto';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

// Tipado de datos para el perfil
type Perfil = {
  id: number;
  fullname: string;
  score: number;
  jobCategory: string;
  imageProfile: any;
};

// ProfileCard component
const ProfileCard: React.FC<{ item: Perfil; onPress: () => void }> = ({ item, onPress }) => (
  <Pressable
    style={({ pressed }) => [styles.profileCard, pressed && { opacity: 0.5 }]}
    onPress={onPress}
  >
    <Image source={item.imageProfile} style={styles.profileCardImg} />
    <View style={styles.nameAndStartConteiner}>
      <Text style={styles.profileCardName} numberOfLines={1}>
        {item.fullname}
      </Text>
      <View style={styles.starPointsContainer}>
        <Text style={styles.profileCardStar}>{item.score > 0 ? item.score : 'N/D'}</Text>
        <Ionicons name="star-outline" size={20} color="#0E3549" />
      </View>
    </View>
  </Pressable>
);

const Search = () => {
  const [fontsLoaded] = useFonts(fonts);
  const params = useLocalSearchParams();
  const categoriaParam = Array.isArray(params.categoria) ? params.categoria[0] : params.categoria ?? 'Todos';
  
  const [searchText, setSearchText] = useState('');
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(false);
  const [jobCategories, setJobCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  // Función para encontrar el ID de la categoría por nombre
  const findCategoryIdByName = (categoryName: string) => {
    if (categoryName === 'Todos') return null;
    const category = jobCategories.find(cat => cat.name === categoryName);
    return category ? category.id : null;
  };

  // Cargar las categorías desde el backend 
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobs = await fetchJobCategories();
        setJobCategories([{ id: 0, name: 'Todos' }, ...jobs]);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    loadJobs();
  }, []);

  // Establecer la categoría seleccionada cuando llegue el parámetro y las categorías estén cargadas
  useEffect(() => {
    if (jobCategories.length > 0 && categoriaParam) {
      const categoryId = findCategoryIdByName(categoriaParam);
      setSelectedJobId(categoryId);
    }
  }, [categoriaParam, jobCategories]);

  // Cargar datos desde el backend
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);

      try {
        const data = await searchWorkers({
          searchText,
          selectedJobId,
        });

        // Mapear los perfiles para que tomen el formato que espera el front
        const perfilesTransformados = data.map((item: any) => ({
          id: item.id,
          fullname: item.fullname,
          score: item.score,
          jobCategory: item.jobCategory || '',
          imageProfile: item.imageProfile,
        }));

        setPerfiles(perfilesTransformados);
      } catch (error) {
        console.error("Error al cargar perfiles:", error);
        setPerfiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [searchText, selectedJobId]);

  const handleCategoryPress = (categoryId: number) => {
    setSelectedJobId(categoryId === 0 ? null : categoryId);
  };

  const isCategorySelected = (categoryId: number) => {
    return selectedJobId === categoryId || (categoryId === 0 && selectedJobId === null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.overlay} source={imagePath.backgroundFDetails} resizeMode="cover">
        <View style={{ flex: 1, padding: 16 }}>

          {/* HEADER: barra búsqueda y categorías */}
          <View style={styles.header}>
            <View style={styles.searchBar}>
              <TextInput
                placeholder="Buscar perfiles..."
                placeholderTextColor="#888"
                style={styles.searchBarInput}
                value={searchText}
                onChangeText={setSearchText}
              />
              <Ionicons name="search" size={25} color="#0E3549" />
            </View>

            <View style={styles.categoryFeatured}>
              <Text style={styles.categoryFeaturedText}>Categorías destacadas</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryTabs}>
              {jobCategories.map(cat => (
                <Pressable
                  key={cat.id}
                  onPress={() => handleCategoryPress(cat.id)}
                  style={{
                    backgroundColor: isCategorySelected(cat.id) ? '#fff' : '#ffffff22',
                    paddingHorizontal: scale(35),
                    paddingVertical: scale(4),
                    borderRadius: 20,
                    marginRight: 8,
                  }}
                >
                  <Text style={{ 
                    color: isCategorySelected(cat.id) ? '#000' : '#fff',
                    fontWeight: isCategorySelected(cat.id) ? 'bold' : 'normal'
                  }}>
                    {cat.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* LISTA DE PERFILES */}
          {loading ? (
            <Loader />
          ) : perfiles.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                No se encontraron perfiles con los filtros seleccionados.
              </Text>
              <Text style={styles.noResultsSubtext}>
                Intenta cambiar la categoría o el término de búsqueda.
              </Text>
            </View>
          ) : (
            <FlatList
              data={perfiles}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ProfileCard
                  item={{
                    id: item.id,
                    fullname: item.fullname,
                    score: item.score,
                    jobCategory: item.jobCategory,
                    imageProfile: { uri: item.imageProfile },
                  }}
                  onPress={() =>
                    router.push({
                      pathname: "/(main)/(tabs)/search/[id]",
                      params: { id: String(item.id) },
                    })
                  }
                />
              )}
            />
          )}
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
    flex: 1,
  },
  header: {
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: moderateScale(25),
    paddingHorizontal: moderateScale(10),
  },
  searchBarInput: {
    flex: 1,
    padding: 13,
    fontSize: moderateScale(14),
  },
  categoryFeatured: {
    marginTop: moderateScale(16),
    backgroundColor: '#D9D9D9',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    alignSelf: 'flex-start',
    borderRadius: moderateScale(20),
  },
  categoryFeaturedText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  categoryTabs: {
    marginTop: 16,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#86868686',
    borderRadius: moderateScale(30),
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  profileCardImg: {
    width: moderateScale(75),
    height: moderateScale(75),
    borderRadius: moderateScale(35),
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginRight: 12,
  },
  nameAndStartConteiner: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: moderateScale(35),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(20),
  },
  profileCardName: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  starPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCardStar: {
    color: '#000',
    fontWeight: 'bold',
    marginRight: moderateScale(5),
    fontSize: moderateScale(14),
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noResultsText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noResultsSubtext: {
    color: '#ccc',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Search;
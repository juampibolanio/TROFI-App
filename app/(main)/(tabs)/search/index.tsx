import Loader from '@/components/atoms/Loader';
import fonts from '@/constants/fonts';
import imagePath from '@/constants/imagePath';
import { fetchJobCategories } from '@/services/jobService';
import { searchWorkers } from '@/services/userService';
import { useFonts } from '@expo-google-fonts/roboto';
import { Ionicons } from '@expo/vector-icons';
import { router} from 'expo-router';
import { useLocalSearchParams} from 'expo-router/build/hooks';
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

// esto hay q mover a componente
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
  const categoriaParam = Array.isArray(params.categoria) ? params.categoria[0] : params.categoria ?? 'Todos'; // esto nos asegura que sea string
  const [searchText, setSearchText] = useState('');
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(false);
  const [jobCategories, setJobCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  // cargo las categorías (trabajos) desde el backend 
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobs = await fetchJobCategories();
        setJobCategories([{ id: 0, name: 'Todos' }, ...jobs]);
      } catch (error) {
        console.error("Error al cargar categorías");
      }
    };

    loadJobs();
  }, []);

  //cargar datos desde el backend
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);

      const data = await searchWorkers({
        searchText,
        selectedJobId,
      });

      //aca mapeo los perfiles para que tomen el formato q espera el front
      const perfilesTransformados = data.map((item: any) => ({
        id: item.id,
        fullname: item.fullname,
        score: item.score,
        jobCategory: item.jobCategory || '',
        imageProfile: item.imageProfile,
      }));

      setPerfiles(perfilesTransformados);
      setLoading(false);
    };

    fetchProfiles();
  }, [searchText, selectedJobId]);

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
                  onPress={() => setSelectedJobId(cat.id === 0 ? null : cat.id)}
                  style={{
                    backgroundColor: selectedJobId === cat.id || (cat.id === 0 && selectedJobId === null) ? '#fff' : '#ffffff22',
                    paddingHorizontal: scale(35),
                    paddingVertical: scale(4),
                    borderRadius: 20,
                    marginRight: 8,
                  }}
                >
                  <Text style={{ color: selectedJobId === cat.id || (cat.id === 0 && selectedJobId === null) ? '#000' : '#fff' }}>{cat.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* LISTA DE PERFILES */}
          {loading ? (
            <Loader />
          ) : perfiles.length === 0 ? (
            <Text style={{ color: '#fff', textAlign: 'center', marginTop: 30, fontSize: 16 }}>
              No se encontraron perfiles con los filtros seleccionados.
            </Text>
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
});

export default Search;
import fonts from '@/constants/fonts';
import imagePath from '@/constants/imagePath';
import { useFonts } from '@expo-google-fonts/roboto';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import React, { useState } from 'react';
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
  nombre: string;
  puntaje: number;
  categoria: string;
  imagen: any;
};

// esto hay q mover a componente
const ProfileCard: React.FC<{ item: Perfil; onPress: () => void }> = ({ item, onPress }) => (
  <Pressable
    style={({ pressed }) => [styles.profileCard, pressed && { opacity: 0.5 }]}
    onPress={onPress}
  >
    <Image source={item.imagen} style={styles.profileCardImg} />
    <View style={styles.nameAndStartConteiner}>
      <Text style={styles.profileCardName} numberOfLines={1}>
        {item.nombre}
      </Text>
      <View style={styles.starPointsContainer}>
        <Text style={styles.profileCardStar}>{item.puntaje}</Text>
        <Ionicons name="star-outline" size={20} color="#0E3549" />
      </View>
    </View>
  </Pressable>
);

const Search = () => {
  const [fontsLoaded] = useFonts(fonts); // carga de fuentes
  const router = useRouter();

  const params = useSearchParams();
  const categoriaParam = params.get('categoria') ?? 'Todos';

  // Estado inicial con la categoría q traiga el parámetro o 'Todos'
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaParam);

  // Estado para texto de búsqueda
  const [searchText, setSearchText] = useState('');

  /* Array de categorías posibles */
  const categorias = ['Todos', 'Plomería', 'Electrónica', 'Cuidado de personas', 'Otros'];

  /* Datos de perfiles simulados */
  const perfiles = [
    {
      id: 1,
      nombre: 'Facundo Pereyra',
      puntaje: 7.6,
      categoria: 'Plomería',
      ubicacion: 'Resistencia',
      descripcionLaboral: 'Especialista en instalaciones sanitarias y reparación de cañerías.',
      descripcion: 'Soy una persona con años de experiencia.. .. ..',
      imagen: require('@/assets/images/searchImg/usersImg/facPereyra.png')
    },
    {
      id: 2,
      nombre: 'Tomás Álvarez',
      puntaje: 8.2,
      categoria: 'Plomería',
      ubicacion: 'Fontana',
      descripcionLaboral: 'Plomero con más de 10 años de experiencia en mantenimiento de domicilios.',
      descripcion: 'Soy una persona con años de experiencia.. .. ..',
      imagen: require('@/assets/images/searchImg/usersImg/tomasAlvarez.png')
    },
    {
      id: 3,
      nombre: 'Joaquín Sosa',
      puntaje: 9.0,
      categoria: 'Herrero',
      ubicacion: 'Resistencia',
      descripcionLaboral: 'Diseño y fabricación de estructuras metálicas a medida.',
      descripcion: 'Soy una persona con años de experiencia.. .. ..',
      imagen: require('@/assets/images/searchImg/usersImg/joaSosa.png')
    },
    {
      id: 4,
      nombre: 'Nicolás Benítez',
      puntaje: 8.4,
      categoria: 'Electrónica',
      ubicacion: 'Barranqueras',
      descripcionLaboral: 'Reparación de dispositivos electrónicos y placas.',
      descripcion: 'Soy una persona con años de experiencia.. .. ..',
      imagen: require('@/assets/images/searchImg/usersImg/nicoBenitez.png')
    },
    {
      id: 5,
      nombre: 'Leandro Giménez',
      puntaje: 8.4,
      categoria: 'Cuidado de personas',
      ubicacion: 'Puerto vilelas',
      descripcionLaboral: 'Cuidador con experiencia en adultos mayores, atención y acompañamiento.',
      descripcion: 'Soy una persona con años de experiencia.. .. ..',
      imagen: require('@/assets/images/searchImg/usersImg/leaGimenez.png')
    },
    {
      id: 6,
      nombre: 'Lucas López',
      puntaje: 8,
      categoria: 'Herrería',
      ubicacion: 'Resistencia',
      descripcionLaboral: 'Herrero con experiencia ... ... ....',
      descripcion: 'Soy una persona con años de experiencia.. .. ..',
      imagen: require('@/assets/images/searchImg/usersImg/luLopez.png')
    },
    {
      id: 7,
      nombre: 'Hernán Bermudez',
      puntaje: 8,
      categoria: 'Plomería',
      ubicacion: 'Resistencia',
      descripcionLaboral: 'Plomero con experiencia ... ... ....',
      descripcion: 'Soy una persona con años de experiencia.. .. ..',
      imagen: require('@/assets/images/searchImg/usersImg/herBermudez.png')
    },
  ];

  /* Filtrado de perfiles según categoría y texto de búsqueda */
  const perfilesFiltrados = perfiles.filter(p => {
    const matchCategoria =
      categoriaSeleccionada === 'Todos'
        ? true
        : categoriaSeleccionada === 'Otros'
          ? !['Plomería', 'Electrónica', 'Cuidado de personas'].includes(p.categoria)
          : p.categoria === categoriaSeleccionada;

    const matchNombre = p.nombre.toLowerCase().includes(searchText.toLowerCase());

    return matchCategoria && matchNombre;
  });

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
              {categorias.map(cat => (
                <Pressable
                  key={cat}
                  onPress={() => setCategoriaSeleccionada(cat)}
                  style={{
                    backgroundColor: categoriaSeleccionada === cat ? '#fff' : '#ffffff22',
                    paddingHorizontal: scale(35),
                    paddingVertical: scale(4),
                    borderRadius: 20,
                    marginRight: 8,
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: categoriaSeleccionada === cat }}
                >
                  <Text style={{ color: categoriaSeleccionada === cat ? '#000' : '#fff' }}>{cat}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* LISTA DE PERFILES */}
          <FlatList
            data={perfilesFiltrados}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProfileCard
                item={item}
                onPress={() => router.push(`/(main)/(tabs)/search/userDetail/${item.id}`)}
              />
            )}
          />
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
    borderRadius: 10,
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

// En el archivo: TROFI-APP/app/(main)/(tabs)/profile Perfil.tsx

import React from 'react'; // Importa la biblioteca React para construir componentes UI
import {
  StyleSheet, // Para crear y gestionar estilos de los componentes
  View,       // Un contenedor fundamental para el diseño, similar a un <div>
  Text,       // Para mostrar texto
  TouchableOpacity, // Un envoltorio que hace que su hijo responda a los toques (para botones)
  Image,      // Para mostrar imágenes
  ScrollView, // Un contenedor desplazable (permite que el contenido exceda la pantalla)
} from 'react-native'; // Importa componentes de React Native
import { Ionicons } from '@expo/vector-icons'; // Importa iconos de Ionicons desde la biblioteca @expo/vector-icons
import { useRouter } from 'expo-router'; // ¡NUEVO! Importa useRouter para la navegación

// Definición del componente funcional Perfil
const Perfil = () => { // Declara un componente funcional llamado Perfil
  const router = useRouter(); // ¡NUEVO! Inicializa el hook useRouter para acceder a la navegación

  // ¡NUEVO! Función para navegar a la pantalla de edición de perfil
  const handleEditProfile = () => {
    // La ruta es '/profile/userSettings' porque tu archivo userSettings.tsx está dentro de la carpeta profile
    router.push('/profile/userSettings');
  };

  // ¡NUEVO! Función para navegar a la pantalla de "Mis reseñas"
  const handleMyReviews = () => {
    // La ruta '/profile/reviews' asume que tienes un archivo index.tsx dentro de una carpeta 'reviews'
    // que a su vez está dentro de la carpeta 'profile'.
    // Asegúrate de crear este archivo: app/(main)/(tabs)/profile/reviews/index.tsx
    router.push('/profile/reviews');
  };

  // ¡NUEVO! Función para navegar a la pantalla de "Mis fotos"
  const handleMyPhotos = () => {
    // La ruta es '/profile/myGallery' porque tu archivo myGallery.tsx está dentro de la carpeta profile
    router.push('/profile/myGallery');
  };

  return (
    // ScrollView: Permite que el contenido dentro de él sea desplazable si excede el tamaño de la pantalla.
    // Es útil para asegurar que todo el contenido del perfil sea accesible.
    <ScrollView style={styles.scrollViewContent}>

      {/* Profile Card (Tarjeta de perfil del usuario) */}
      <View style={styles.profileCard}>
        {/* Contenedor para la imagen y la información del perfil */}
        <View style={styles.profileInfo}>
          {/* Imagen de perfil del usuario */}
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} // Define la fuente de la imagen (URL de ejemplo)
            style={styles.profileImage} // Aplica estilos para la imagen
          />
          {/* Contenedor para el nombre, ubicación y descripción laboral */}
          <View style={styles.profileTextContainer}>
            {/* Nombre del usuario */}
            <Text style={styles.userName}>Lucas iondo</Text>
            {/* Contenedor para el icono y texto de ubicación */}
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="white" /> {/* Icono de ubicación, color cambiado a blanco */}
              <Text style={styles.location}>Resistencia, Chaco</Text> {/* Texto de ubicación */}
            </View>
            {/* Descripción laboral del usuario */}
            <Text style={styles.jobDescription}>Mi descripción laboral</Text>
          </View>
        </View>
        {/* Botón de edición del perfil (icono de lápiz) */}
        {/* ¡MODIFICADO! Añadido el prop onPress para la navegación */}
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Ionicons name="pencil-outline" size={20} color="white" /> {/* Icono de lápiz */}
        </TouchableOpacity>
      </View>

      {/* Description and Score Sections (Secciones de descripción y puntuación) */}
      <View style={styles.contentSectionsContainer}>
        {/* Tarjeta de descripción del perfil */}
        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Descripción</Text> {/* Título de la sección */}
          <Text style={styles.descriptionText}> {/* Texto de la descripción */}
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus..
          </Text>
        </View>

        {/* Tarjeta de puntuación del perfil */}
        <View style={styles.scoreCard}>
          <Text style={styles.sectionTitle}>Puntuación</Text> {/* Título de la sección */}
          <View style={styles.scoreContent}>
            <Text style={styles.scoreValue}>9.9</Text> {/* Valor de la puntuación */}
            <Ionicons name="star-outline" size={24} color="#607D8B" /> {/* Icono de estrella para la puntuación */}
          </View>
        </View>
      </View>

      {/* Review and Photos Buttons (Botones de reseñas y fotos) */}
      <View style={styles.actionButtonsContainer}>
        {/* Botón para "Mis reseñas" */}
        {/* ¡MODIFICADO! Añadido el prop onPress para la navegación */}
        <TouchableOpacity style={styles.actionButton} onPress={handleMyReviews}>
          <Text style={styles.actionButtonText}>Mis reseñas</Text>
        </TouchableOpacity>
        {/* Botón para "Mis fotos" */}
        {/* ¡MODIFICADO! Añadido el prop onPress para la navegación */}
        <TouchableOpacity style={styles.actionButton} onPress={handleMyPhotos}>
          <Text style={styles.actionButtonText}>Mis fotos</Text>
        </TouchableOpacity>
      </View>

      {/* Review Section (Sección de reseñas) */}
      <View style={styles.reviewSection}>
        {/* Tarjeta de reseña individual */}
        <View style={styles.reviewCard}>
          {/* Imagen del reseñador */}
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }} // Fuente de la imagen del reseñador (URL de ejemplo)
            style={styles.reviewerImage} // Estilos para la imagen del reseñador
          />
          {/* Contenedor para el nombre y comentario del reseñador */}
          <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewerName}>Claudia Lopez</Text> {/* Nombre del reseñador */}
            <Text style={styles.reviewComment}>Muy buen trabajo</Text> {/* Comentario de la reseña */}
          </View>
          <Text style={styles.reviewScore}>9.0</Text> {/* Puntuación de la reseña */}
        </View>
      </View>
      {/* Espacio en blanco al final del ScrollView para asegurar que el contenido inferior sea visible */}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

// Objeto StyleSheet para definir los estilos de los componentes
const styles = StyleSheet.create({
  // Estilo para el contenedor principal de ScrollView
  scrollViewContent: {
    flex: 1, // Ocupa todo el espacio disponible
    backgroundColor: "#0E3549", // Color de fondo principal oscuro (según tu código proporcionado)
  },
  // Estilos para la tarjeta de perfil
  profileCard: {
    backgroundColor: '#24475E', // Color de fondo azul oscuro
    borderRadius: 20, // Bordes redondeados
    marginHorizontal: 20, // Margen horizontal
    marginTop: 20, // Margen superior
    padding: 20, // Relleno interno
    flexDirection: 'row', // Distribución de elementos en fila
    alignItems: 'center', // Alineación vertical al centro
    justifyContent: 'space-between', // Espacio equitativo entre elementos
    position: 'relative', // Necesario para posicionar el botón de editar de forma absoluta
  },
  // Estilos para la información del perfil (imagen y texto)
  profileInfo: {
    flexDirection: 'row', // Elementos en fila
    alignItems: 'center', // Alineación vertical al centro
    flex: 1, // Ocupa el espacio disponible
  },
  // Estilos para la imagen de perfil
  profileImage: {
    width: 100, // Ancho de la imagen
    height: 100, // Alto de la imagen
    borderRadius: 50, // Hace que la imagen sea circular (la mitad del ancho/alto)
    borderWidth: 3, // Ancho del borde
    borderColor: 'white', // Color del borde
    marginRight: 15, // Margen a la derecha
  },
  // Estilos para el contenedor de texto del perfil
  profileTextContainer: {
    justifyContent: 'center', // Alineación vertical al centro del texto
  },
  // Estilos para el nombre de usuario
  userName: {
    fontSize: 22, // Tamaño de fuente
    fontWeight: 'bold', // Negrita
    color: 'white', // Color de texto
    marginBottom: 5, // Margen inferior
  },
  // Estilos para el contenedor de ubicación
  locationContainer: {
    flexDirection: 'row', // Elementos en fila
    alignItems: 'center', // Alineación vertical al centro
    marginBottom: 5, // Margen inferior
  },
  // Estilos para el texto de ubicación
  location: {
    fontSize: 14, // Tamaño de fuente
    color: 'white', // Color de texto (cambiado de 'gray' a 'white' según tu último código)
    marginLeft: 5, // Margen a la izquierda
  },
  // Estilos para la descripción laboral
  jobDescription: {
    fontSize: 16, // Tamaño de fuente
    color: 'white', // Color de texto
  },
  // Estilos para el botón de editar
  editButton: {
    position: 'absolute', // Posicionamiento absoluto
    top: -15, // Desplazamiento hacia arriba
    right: 15, // Desplazamiento hacia la derecha
    backgroundColor: '#607D8B', // Color de fondo (cambiado de '#4CAF50' a '#607D8B' según tu último código)
    borderRadius: 25, // Bordes redondeados (lo hace circular)
    width: 50, // Ancho del botón
    height: 50, // Alto del botón
    justifyContent: 'center', // Centra el contenido horizontalmente
    alignItems: 'center', // Centra el contenido verticalmente
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Color de la sombra para iOS
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra para iOS
    shadowOpacity: 0.25, // Opacidad de la sombra para iOS
    shadowRadius: 3.84, // Radio de la sombra para iOS
  },
  // Estilos para el contenedor de las secciones de descripción y puntuación
  contentSectionsContainer: {
    flexDirection: 'row', // Elementos en fila
    justifyContent: 'space-between', // Espacio equitativo entre elementos
    marginHorizontal: 20, // Margen horizontal
    marginTop: 20, // Margen superior
  },
  // Estilos para la tarjeta de descripción
  descriptionCard: {
    backgroundColor: '#24475E', // Color de fondo azul oscuro
    borderRadius: 15, // Bordes redondeados
    padding: 15, // Relleno interno
    flex: 2, // Ocupa dos tercios del espacio disponible en la fila
    marginRight: 10, // Margen a la derecha
  },
  // Estilos para la tarjeta de puntuación
  scoreCard: {
    backgroundColor: '#24475E', // Color de fondo azul oscuro
    borderRadius: 15, // Bordes redondeados
    padding: 15, // Relleno interno
    flex: 1, // Ocupa un tercio del espacio disponible en la fila
    marginLeft: 10, // Margen a la izquierda
    alignItems: 'center', // Centra el contenido horizontalmente
    justifyContent: 'center', // Centra el contenido verticalmente
  },
  // Estilos para los títulos de sección (Descripción, Puntuación)
  sectionTitle: {
    fontSize: 16, // Tamaño de fuente
    fontWeight: 'bold', // Negrita
    color: 'white', // Color de texto
    marginBottom: 10, // Margen inferior
  },
  // Estilos para el texto de la descripción
  descriptionText: {
    fontSize: 14, // Tamaño de fuente
    color: '#CFD8DC', // Color de texto gris claro
    lineHeight: 20, // Altura de línea para el texto
  },
  // Estilos para el contenido de la puntuación (valor e icono)
  scoreContent: {
    flexDirection: 'row', // Elementos en fila
    alignItems: 'center', // Alineación vertical al centro
  },
  // Estilos para el valor numérico de la puntuación
  scoreValue: {
    fontSize: 32, // Tamaño de fuente grande
    fontWeight: 'bold', // Negrita
    color: 'white', // Color de texto
    marginRight: 5, // Margen a la derecha
  },
  // Estilos para el contenedor de los botones de acción
  actionButtonsContainer: {
    flexDirection: 'row', // Elementos en fila
    justifyContent: 'space-around', // Distribuye el espacio equitativamente alrededor de los elementos
    marginHorizontal: 20, // Margen horizontal
    marginTop: 20, // Margen superior
  },
  // Estilos para los botones de acción (Mis reseñas, Mis fotos)
  actionButton: {
    backgroundColor: '#607D8B', // Color de fondo de los botones
    borderRadius: 25, // Bordes redondeados
    paddingVertical: 12, // Relleno vertical
    paddingHorizontal: 25, // Relleno horizontal
    alignItems: 'center', // Centra el contenido horizontalmente
    flex: 1, // Ocupa el espacio disponible
    marginHorizontal: 5, // Margen horizontal entre botones
  },
  // Estilos para el texto de los botones de acción
  actionButtonText: {
    color: 'white', // Color de texto
    fontWeight: 'bold', // Negrita
    fontSize: 14, // Tamaño de fuente
  },
  // Estilos para la sección de reseñas
  reviewSection: {
    marginHorizontal: 20, // Margen horizontal
    marginTop: 20, // Margen superior
  },
  // Estilos para la tarjeta de reseña individual
  reviewCard: {
    backgroundColor: '#24475E', // Color de fondo azul oscuro
    borderRadius: 15, // Bordes redondeados
    padding: 15, // Relleno interno
    flexDirection: 'row', // Elementos en fila
    alignItems: 'center', // Alineación vertical al centro
    marginBottom: 10, // Margen inferior
  },
  // Estilos para la imagen del reseñador
  reviewerImage: {
    width: 50, // Ancho de la imagen
    height: 50, // Alto de la imagen
    borderRadius: 25, // Hace la imagen circular
    marginRight: 15, // Margen a la derecha
  },
  // Estilos para el contenedor de texto de la reseña
  reviewTextContainer: {
    flex: 1, // Ocupa el espacio disponible
  },
  // Estilos para el nombre del reseñador
  reviewerName: {
    fontSize: 16, // Tamaño de fuente
    fontWeight: 'bold', // Negrita
    color: 'white', // Color de texto
  },
  // Estilos para el comentario de la reseña
  reviewComment: {
    fontSize: 14, // Tamaño de fuente
    color: '#CFD8DC', // Color de texto gris claro
  },
  // Estilos para la puntuación de la reseña
  reviewScore: {
    fontSize: 18, // Tamaño de fuente
    fontWeight: 'bold', // Negrita
    color: 'white', // Color de texto
  },
});

// Exporta el componente para que pueda ser importado y usado en otros archivos
export default Perfil;
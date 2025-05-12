import Ionicons from "@expo/vector-icons/Ionicons";
// aguante ionicons 
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

// agreguen iconos aca, deja el codigo mas limpio
export const BuscarIcon = (props: any) => (
  <Ionicons name="search-outline" size={20} color="#0E3549" {...props} />
);

export const DestacadosIcon = (props: any) => (
  <Ionicons name="star-outline" size={20} color="#0E3549" {...props}/>
);

export const MensajeIcon = (props: any) => (
  <MaterialCommunityIcons name="message-text-outline" size={20} color="#0E3549" {...props} />
);

export const PerfilIcon = (props: any) => (
  <Ionicons name="person-outline" size={20} color="#0E3549" {...props}/>
);

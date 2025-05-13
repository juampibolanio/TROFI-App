import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// aca lo unico q cambie fue hacer constante estos valores, pq todos los iconos los tienen
const ICON_SIZE = 20;
const ICON_COLOR = "#0E3549";


export const BuscarIcon = (props: any) => (
  <Ionicons name="search-outline" size={ICON_SIZE} color={ICON_COLOR} {...props} />
);

export const DestacadosIcon = (props: any) => (
  <Ionicons name="star-outline" size={ICON_SIZE} color={ICON_COLOR} {...props} />
);

export const MensajeIcon = (props: any) => (
  <MaterialCommunityIcons name="message-text-outline" size={ICON_SIZE} color={ICON_COLOR} {...props} />
);

export const PerfilIcon = (props: any) => (
  <Ionicons name="person-outline" size={ICON_SIZE} color={ICON_COLOR} {...props} />
);

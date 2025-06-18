import Ionicons from "@expo/vector-icons/Ionicons";

// aca lo unico q cambie fue hacer constante estos valores, pq todos los iconos los tienen igual
const ICON_SIZE = 10;
const ICON_COLOR = "#0E3549";


export const BuscarIcon = (props: any) => (
  <Ionicons name="search-outline" size={ICON_SIZE} color={ICON_COLOR} {...props} />
);

export const DestacadosIcon = (props: any) => (
  <Ionicons name="star-outline" size={ICON_SIZE} color={ICON_COLOR} {...props} />
);

export const MensajeIcon = (props: any) => (
  <Ionicons name="chatbox-outline" size={ICON_SIZE} color={ICON_COLOR} {...props} />
);

export const PerfilIcon = (props: any) => (
  <Ionicons name="person-outline" size={ICON_SIZE} color={ICON_COLOR} {...props} />
);

export const ContactIcon = (props: any) => (
  <Ionicons name="copy1" size={ICON_SIZE} color={ICON_COLOR} {...props} />
);

export const SettingsIcon = (props: any) => (
  <Ionicons name="settings-outline" size={ICON_SIZE} color={ICON_COLOR} {...props} />
);
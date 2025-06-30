import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log('Hubo un error al guardar en AsyncStorage.', e);
    }
};

export const getData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log('Error al leer datos de AsyncStorage.', e);
        return null;
    }
};

export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log('Error al eliminar en AsyncStorage', e)
    }
}

export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log('Error al limpiar en AsyncStorage', e);
    }
};
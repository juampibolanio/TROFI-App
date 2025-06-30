import {
    TextInput,
    View,
    StyleSheet,
    Text,
    Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
};

const CustomInput = ({
    label,
    value,
    onChangeText,
    placeholder = '',
    secureTextEntry = false,
}: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#ccc"
                    secureTextEntry={secureTextEntry}
                    style={styles.input}
                />
                {value.length > 0 && (
                    <Pressable onPress={() => onChangeText('')}>
                        <Ionicons name="close" size={18} color="#fff" />
                    </Pressable>
                )}
            </View>
            <View style={styles.underline} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        color: '#fff',
        marginBottom: 4,
        fontSize: 14,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        color: '#fff',
        backgroundColor: 'transparent',
        paddingVertical: 6,
    },
    underline: {
        height: 1.5,
        backgroundColor: '#888',
        marginTop: 2,
    },
});

export default CustomInput;
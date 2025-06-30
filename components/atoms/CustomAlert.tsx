import React from 'react';
import { View, Text ,Modal ,Pressable ,StyleSheet ,Dimensions} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

interface CustomAlertProps {
    visible: boolean;
    title?: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    showCancel?: boolean;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
    visible,
    title,
    message,
    type = 'info',
    showCancel = false,
    confirmText = 'Aceptar',
    cancelText = 'Cancelar',
    onConfirm,
    onCancel
}) => {

    const getConfirmButtonColor = () => {
        switch (type) {
            case 'success':
                return '#4CAF50';
            case 'error':
                return '#DD4B4B';
            case 'warning':
                return '#FF9800';
            default: // info
                return '#0E3549';
        }
    };

    const confirmButtonColor = getConfirmButtonColor();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.alertContainer}>
                    {title && (
                        <Text style={[
                            styles.title,
                            { color: confirmButtonColor }
                        ]}>
                            {title}
                        </Text>
                    )}
                    
                    <Text style={styles.message}>
                        {message}
                    </Text>

                    <View style={styles.buttonsContainer}>
                        {showCancel && onCancel && (
                            <Pressable
                                style={({ pressed }) => [
                                    pressed && { opacity: 0.7 }
                                ]}
                                onPress={onCancel}
                            >
                                <Text style={styles.cancelText}>
                                    {cancelText}
                                </Text>
                            </Pressable>
                        )}

                        <Pressable
                            style={({ pressed }) => [
                                pressed && { opacity: 0.7 }
                            ]}
                            onPress={onConfirm}
                        >
                            <Text style={[
                                styles.confirmText,
                                { color: confirmButtonColor }
                            ]}>
                                {confirmText}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
    },
    alertContainer: {
        backgroundColor: '#fff',
        borderRadius: moderateScale(20),
        padding: moderateScale(20),
        width: "80%",
        alignItems: 'center',
    },
    title: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        marginBottom: moderateScale(10),
        textAlign: 'center',
    },
    message: {
        fontSize: moderateScale(14),
        textAlign: 'center',
        marginBottom: moderateScale(20),
        color: '#000',
        lineHeight: moderateScale(20),
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: moderateScale(30),
        alignItems: 'center',
    },
    cancelText: {
        fontSize: moderateScale(16),
        color: '#DD4B4B',
    },
    confirmText: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
    },
});

export default CustomAlert;
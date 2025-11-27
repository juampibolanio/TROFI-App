import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sendMessage } from '@/services/messageService';

type MessageInputProps = {
    chatId: string;
    senderId: string;
    onMessageSent?: (message: any) => void;
};

const MessageInput: React.FC<MessageInputProps> = ({ chatId, senderId, onMessageSent }) => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    /**
     * Envía un mensaje al backend
     */
    const handleSendMessage = async () => {
        if (!message.trim() || isSending) return;

        if (!chatId || !senderId) {
            Alert.alert('Error', 'Faltan datos para enviar el mensaje');
            return;
        }

        setIsSending(true);

        try {
            const response = await sendMessage(chatId, senderId, message.trim());
            const newMessage = response.data.message;

            // Limpiar input
            setMessage('');

            // Callback para actualizar la UI inmediatamente
            if (onMessageSent) {
                onMessageSent({
                    id: newMessage.id,
                    senderId: newMessage.senderId,
                    content: newMessage.content,
                    timestamp: newMessage.timestamp,
                });
            }
        } catch (error: any) {
            console.error('Error al enviar mensaje:', error);
            Alert.alert(
                'Error',
                error.response?.data?.message || 'No se pudo enviar el mensaje. Intenta nuevamente.'
            );
        } finally {
            setIsSending(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Escribe un mensaje..."
                    placeholderTextColor="#999"
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    maxLength={500}
                    returnKeyType="send"
                    onSubmitEditing={handleSendMessage}
                    blurOnSubmit={false}
                    editable={!isSending}
                />

                <Pressable
                    style={[
                        styles.sendButton,
                        { opacity: message.trim() && !isSending ? 1 : 0.5 }
                    ]}
                    onPress={handleSendMessage}
                    disabled={!message.trim() || isSending}
                >
                    <Ionicons
                        name="send"
                        size={20}
                        color={message.trim() && !isSending ? "#0E3549" : "#999"}
                    />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        maxHeight: 100,
        minHeight: 36,
        paddingVertical: 8,
        paddingHorizontal: 5,
        textAlignVertical: 'center',
    },
    sendButton: {
        marginLeft: 10,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MessageInput;
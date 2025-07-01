import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ref, push } from 'firebase/database';
import { database } from '@/constants/firebaseConfig';

type Props = {
    chatId: string;
    senderId: string;
    otherUserId: number;
};

const MessageInput: React.FC<Props> = ({ chatId, senderId, otherUserId }) => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const sendMessage = async () => {
        if (!message.trim() || isSending) return;

        setIsSending(true);

        try {
            const messagesRef = ref(database, `chats/${chatId}/messages`);
            await push(messagesRef, {
                senderId: senderId,
                text: message.trim(),
                timestamp: Date.now(),
            });

            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            Alert.alert('Error', 'No se pudo enviar el mensaje');
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
                    onSubmitEditing={sendMessage}
                    blurOnSubmit={false}
                />

                <Pressable
                    style={[
                        styles.sendButton,
                        { opacity: message.trim() ? 1 : 0.5 }
                    ]}
                    onPress={sendMessage}
                    disabled={!message.trim() || isSending}
                >
                    <Ionicons
                        name="send"
                        size={20}
                        color={message.trim() ? "#0E3549" : "#999"}
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
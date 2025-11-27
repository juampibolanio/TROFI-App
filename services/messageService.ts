import api from './api';

/* ================================
   CHATS
================================ */

/**
 * Inicia un chat o retorna uno existente
 * @param senderId - UID del remitente
 * @param receiverId - UID del destinatario
 * @param content - Mensaje inicial (opcional)
 */
export const startChat = async (senderId: string, receiverId: string, content?: string) => {
  try {
    const res = await api.post('/chat/start', {
      senderId,
      receiverId,
      content: content || '',
    });
    return res.data;
  } catch (err) {
    console.error('Error al iniciar chat:', err);
    throw err;
  }
};

/**
 * Obtiene todos los chats del usuario
 * @param uid - UID del usuario
 */
export const getUserChats = async (uid: string) => {
  try {
    const res = await api.get(`/chat/user/${uid}`);
    return res.data;
  } catch (err) {
    console.error('Error al obtener chats del usuario:', err);
    throw err;
  }
};

/**
 * Obtiene los mensajes de un chat
 * @param chatId - ID del chat
 * @param limit - Límite de mensajes (default: 50)
 */
export const getMessages = async (chatId: string, limit: number = 50) => {
  try {
    const res = await api.get(`/chat/${chatId}/messages`, {
      params: { limit },
    });
    return res.data;
  } catch (err) {
    console.error('Error al obtener mensajes:', err);
    throw err;
  }
};

/* ================================
   MENSAJES
================================ */

/**
 * Envía un mensaje en un chat
 * @param chatId - ID del chat
 * @param senderId - UID del remitente
 * @param content - Contenido del mensaje
 */
export const sendMessage = async (chatId: string, senderId: string, content: string) => {
  try {
    const res = await api.post(`/chat/${chatId}/message`, {
      senderId,
      content,
    });
    return res.data;
  } catch (err) {
    console.error('Error al enviar mensaje:', err);
    throw err;
  }
};

/**
 * Elimina un mensaje (solo el remitente)
 * @param chatId - ID del chat
 * @param messageId - ID del mensaje
 * @param userId - UID del usuario
 */
export const deleteMessage = async (chatId: string, messageId: string, userId: string) => {
  try {
    const res = await api.delete(`/chat/${chatId}/message/${messageId}`, {
      data: { userId },
    });
    return res.data;
  } catch (err) {
    console.error('Error al eliminar mensaje:', err);
    throw err;
  }
};

/* ================================
   GESTIÓN DE CHATS
================================ */

/**
 * Elimina un chat para el usuario (soft delete)
 * @param chatId - ID del chat
 * @param uid - UID del usuario
 */
export const deleteChat = async (chatId: string, uid: string) => {
  try {
    const res = await api.delete(`/chat/${chatId}/user/${uid}`);
    return res.data;
  } catch (err) {
    console.error('Error al eliminar chat:', err);
    throw err;
  }
};

/**
 * Marca mensajes como leídos
 * @param chatId - ID del chat
 * @param userId - UID del usuario
 */
export const markAsRead = async (chatId: string, userId: string) => {
  try {
    const res = await api.put(`/chat/${chatId}/read`, {
      userId,
    });
    return res.data;
  } catch (err) {
    console.error('Error al marcar como leído:', err);
    throw err;
  }
};
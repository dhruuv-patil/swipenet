import { io } from 'socket.io-client';

const rawSocketUrl =
  import.meta.env.VITE_SOCKET_URL ||
  (import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '')
    : 'http://localhost:5001');

const SOCKET_URL = rawSocketUrl.replace(/\/+$/, '');

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: true,
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('[WebSocket] Connected to SwipeNet:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('[WebSocket] Disconnected from SwipeNet');
    });
  }
  return socket;
};

export const joinRoom = (roomId) => {
  const s = getSocket();
  s.emit('joinRoom', roomId);
};

export const sendSocketMessage = (roomId, message) => {
  const s = getSocket();
  s.emit('sendMessage', { roomId, message });
};

export const subscribeToMessages = (callback) => {
  const s = getSocket();
  s.on('receiveMessage', callback);
  return () => {
    s.off('receiveMessage', callback);
  };
};

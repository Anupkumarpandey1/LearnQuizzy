import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = (quizId, onUpdate) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    const newSocket = io(socketUrl);
    
    newSocket.emit('join-quiz', quizId);
    newSocket.on('leaderboard-update', onUpdate);
    
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [quizId, onUpdate]);

  return socket;
};

import { io } from 'socket.io-client';
import React from 'react';
const SOCKET_URL = "https://pwa-chat-api.onrender.com"

export const socket = io(SOCKET_URL);
export const AppContext = React.createContext();
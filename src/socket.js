import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://qr-backend-b3pj.onrender.com';
// const URL = "http://localhost:5000"

export const socket = io(URL);
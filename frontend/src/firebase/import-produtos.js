import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyD0EyZY0qBgNqQqE83qnW3RGtiIdO4vySE',
  authDomain: 'cogny-front-end.firebaseapp.com',
  projectId: 'cogny-front-end',
  storageBucket: 'cogny-front-end.appspot.com',
  messagingSenderId: '419407130273',
  appId: '1:419407130273:web:dcca87c66038ab45378ae0',
  measurementId: 'G-976VL59S3B',
};

const app = initializeApp(firebaseConfig);

export default app;

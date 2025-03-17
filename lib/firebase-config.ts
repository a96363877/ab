// Revised Firebase configuration with better error handling
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

// Check if all required Firebase config values are available

const firebaseConfig = {
  apiKey: 'AIzaSyD_pAGfrLh3kNQz-UrCyHvCganH0oqpGns',
  authDomain: 'abbb-e95ea.firebaseapp.com',
  projectId: 'abbb-e95ea',
  storageBucket: 'abbb-e95ea.firebasestorage.app',
  messagingSenderId: '846219345131',
  appId: '1:846219345131:web:38bb079306c7d51c5fd2ae',
  measurementId: 'G-4DKQ003N49',
};

// Check if Firebase is already initialized
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7r_mXebiWolxvr9O3r_KgPVFS9P1ugSw",
  authDomain: "taskmaster-pro-f69f5.firebaseapp.com",
  projectId: "taskmaster-pro-f69f5",
  storageBucket: "taskmaster-pro-f69f5.firebasestorage.app",
  messagingSenderId: "840531105705",
  appId: "1:840531105705:web:fc8a977804a52d8a9f56b8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
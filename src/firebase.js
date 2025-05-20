import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCZjgmW_gTERq0LWy38h2nBM7vf2wFwAYY",
  authDomain: "attendance-system-8f7b4.firebaseapp.com",
  projectId: "attendance-system-8f7b4",
  storageBucket: "attendance-system-8f7b4.appspot.com",
  messagingSenderId: "51509707659",
  appId: "1:51509707659:web:527bf843423375b108a58e",
  measurementId: "G-K7DR4CMH31"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

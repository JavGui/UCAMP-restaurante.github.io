import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore/lite";

const firebaseConfig = 
{
  apiKey: "AIzaSyCBaKZOYsbyoEu83TIqad05LaquoJ3siGM",
  authDomain: "iniciando-firebase-d9df6.firebaseapp.com",
  projectId: "iniciando-firebase-d9df6",
  storageBucket: "iniciando-firebase-d9df6.appspot.com",
  messagingSenderId: "657455400343",
  appId: "1:657455400343:web:770fa452caa52f6cfb30d2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { useFirebaseAuth } from "vuefire";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAvJDC-97d_Ane5FUHA07N_Lv6Z7UGlQFo",
  authDomain: "run-chat-d574e.firebaseapp.com",
  projectId: "run-chat-d574e",
  storageBucket: "run-chat-d574e.appspot.com",
  messagingSenderId: "121366995570",
  appId: "1:121366995570:web:1618090b2b6ad482d118eb",
});

const db = getFirestore(firebaseApp);
export const auth = useFirebaseAuth();

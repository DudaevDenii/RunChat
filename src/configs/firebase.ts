import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { useFirebaseAuth } from "vuefire";

export const firebaseApp = initializeApp({
//Your Api key
});

const db = getFirestore(firebaseApp);
export const auth = useFirebaseAuth();

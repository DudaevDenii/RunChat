// Utilities
import { auth } from "@/configs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  DocumentData,
  addDoc,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useFirestore } from "vuefire";
interface message {
  id: string;
  data: DocumentData;
}
export const useAppStore = defineStore("app", () => {
  const db = useFirestore();
  const chat = ref<message[]>([]);
  const userEmail = ref<null | string | undefined>(auth?.currentUser?.email);
  const q = query(collection(db, "chat"));
  const inputValue = ref<string>("");
  const sendInputValue = ref<string>("");
  onSnapshot(q, (querySnapshot) => {
    chat.value = [];
    querySnapshot.forEach((message) => {
      chat.value.push({ id: message.id, data: message.data() });
    });

    chat.value.sort((a, b) => a.data.number - b.data.number);
  });

  async function addMessage() {
    await addDoc(collection(db, "chat"), {
      number: chat.value.length,
      text: sendInputValue.value,
      sender: auth?.currentUser?.email,
      currentTime: new Date().toLocaleTimeString(),
    });
    sendInputValue.value = "";
  }
  async function createUser(email: string, password: string) {
    if (password.length > 5 && email && /.+@.+\..+/.test(email)) {
      if (auth !== null)
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          userEmail.value = email;
          isAuth.value = true;
        } catch (error) {
          alert("Fill in the data correctly");
        }
    } else {
      alert("Fill in the data correctly");
    }
  }
  async function signUser(email: string, password: string) {
    if (password.length > 5 && email && /.+@.+\..+/.test(email)) {
      try {
        if (auth !== null) {
          try {
            await signInWithEmailAndPassword(auth, email, password);
            userEmail.value = email;

            isAuth.value = true;
          } catch (error) {
            alert("Email or password is uncorrect");
          }
        }
      } catch (error) {
        alert("Email or password is uncorrect");
      }
    } else {
      alert("Fill in the data correctly");
    }
  }
  const isAuth = ref(!!auth?.currentUser);
  async function logOut() {
    if (auth) await signOut(auth), (isAuth.value = false);
  }

  return {
    chat,
    inputValue,
    sendInputValue,
    addMessage,
    createUser,
    signUser,
    logOut,
    isAuth,
    userEmail,
  };
});

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUebQAUvNr2rzwiWONBiDsvr2Xye4-u3o",
  authDomain: "res-mgt-ck.firebaseapp.com",
  projectId: "res-mgt-ck",
  storageBucket: "res-mgt-ck.firebasestorage.app",
  messagingSenderId: "769323464838",
  appId: "1:769323464838:web:f6cdd9a0f2657816377907",
  measurementId: "G-S48ZGGNQE8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Upload failed:', error);
        reject(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });
};

export { app, analytics, auth, db };
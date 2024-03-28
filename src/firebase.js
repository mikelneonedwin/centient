import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

const app = initializeApp({
    apiKey: "AIzaSyCSvEKkCHzclAOZY8xJB12eqEFcEexfHYg",
    authDomain: 'centient.firebaseapp.com',
    databaseURL: 'https://centient-default-rtdb.firebaseio.com',
    projectId: "centient",
    appId: "1:587289416599:web:39febd588afe384c36aad2",
    storageBucket: "centient.appspot.com"
});
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
    connectAuthEmulator(auth, 'http://localhost:9099', {
        disableWarnings: true
    })
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
}
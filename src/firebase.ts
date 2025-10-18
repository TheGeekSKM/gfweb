import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDjHqv2w-hnUwgDCjxu_5-bf2qqWEeQcgk",
  authDomain: "gfallacy-e38ac.firebaseapp.com",
  databaseURL: "https://gfallacy-e38ac-default-rtdb.firebaseio.com",
  projectId: "gfallacy-e38ac",
  storageBucket: "gfallacy-e38ac.firebasestorage.app",
  messagingSenderId: "522353542057",
  appId: "1:522353542057:web:52a9b600d2b4b878967ab8"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function Publish(path: string, data: any)
{
    set(ref(database, path), data);
}

export function Subscribe(path: string, callback: (data: any) => void, failCallback?: () => void)
{
    const dataRef = ref(database, path);
    onValue(dataRef, (snapshot) => {
        if (snapshot.exists()) 
        {
            const data = snapshot.val();
            callback(data);
        }
        else
        {
            if (failCallback) 
            {
                failCallback();
            }
        }
    });
}
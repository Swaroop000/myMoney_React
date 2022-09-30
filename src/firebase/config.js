import firebase from "firebase/app";
import "firebase/firestore";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApxkIjylNa88okA0gbtupf44-UBJE8c-U",
  authDomain: "my-money-a1.firebaseapp.com",
  projectId: "my-money-a1",
  storageBucket: "my-money-a1.appspot.com",
  messagingSenderId: "240665603695",
  appId: "1:240665603695:web:6657fe21cb47640d17279a",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//firebase timestamp
const timestamp = firebase.firestore.Timestamp;

//init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth, timestamp };

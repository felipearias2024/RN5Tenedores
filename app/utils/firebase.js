import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAykctFJq_YBjNS7KnFyzps4aJdJomncc0",
  authDomain: "tndores-c707a.firebaseapp.com",
  projectId: "tndores-c707a",
  storageBucket: "tndores-c707a.appspot.com",
  messagingSenderId: "434136825991",
  appId: "1:434136825991:web:515d04984f496b362c3822",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

// firebase.js

import firestore from '@react-native-firebase/firestore';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); // Use your firebaseConfig
}

export { firebase, firestore };

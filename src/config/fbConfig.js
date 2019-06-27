 import firebase from 'firebase/app'
 import 'firebase/firestore'
 import 'firebase/auth'
 
 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyAGGvHctDOB-pXDzhR0yaXiDiq-LPAiLKU",
  authDomain: "net-ninja-mario-99.firebaseapp.com",
  databaseURL: "https://net-ninja-mario-99.firebaseio.com",
  projectId: "net-ninja-mario-99",
  storageBucket: "",
  messagingSenderId: "412044996679",
  appId: "1:412044996679:web:f2c6cbcd33844ed8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// firebase.firestore().settings({ timestampsInSnapshots: true })   //// No need to add this line anymore

export default firebase
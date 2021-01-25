import firebase from 'firebase'
require ('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyA2Iy37iZp14JDK7_XRlUBmFRFTlWSBauw",
    authDomain: "barterapp-bc2e3.firebaseapp.com",
    databaseURL:"https.//barterapp-bc2e3.firebaseio.com",
    projectId: "barterapp-bc2e3",
    storageBucket: "barterapp-bc2e3.appspot.com",
    messagingSenderId: "853612917301",
    appId: "1:853612917301:web:e182573f9e8c56b024f77c"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
     firebase.initializeApp(firebaseConfig);
  }

  export default firebase.firestore()
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM_aSr23yQJIsP1HCwa634ajKIx-HM-pU",
  authDomain: "instagram-dev-cfce5.firebaseapp.com",
  projectId: "instagram-dev-cfce5",
  storageBucket: "instagram-dev-cfce5.appspot.com",
  messagingSenderId: "233186615885",
  appId: "1:233186615885:web:917434a792854adc94f204",
  measurementId: "G-CL9Q567T42"
};  // use environment variables

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);



// // initializes firebase
// if(firebase.apps.length === 0) { // make sure we're not running any firebase instance at the moment to prevent the app to crash
//   firebase.intializeApp(firebaseConfig)
// }

// https://www.freecodecamp.org/news/react-firebase-authentication-and-crud-operations/
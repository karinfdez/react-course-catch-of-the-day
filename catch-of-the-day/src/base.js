import Rebase from "re-base"; //Package to mirrow state to firebase
import firebase from "firebase";

//Get from firebase/Project Overview/(</>)/object declare in config var
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAGogd-F9acFRW9y3AU7zfn0I8UYgAyPvA",
    authDomain: "catch-of-the-day-karin-3.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-karin-3.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//Named export
export { firebaseApp };

//Default export
export default base;
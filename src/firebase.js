

//import firebase from "firebase/app";
//import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import * as firebase from "firebase";
//import "firebase/auth";
//import "firebase/firestore";
//require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyAUZt0Z-OIYs0YlzBS_WDjjYHWScjUcFo4",
    authDomain: "ionicapplogin-e9c88.firebaseapp.com",
    databaseURL: "https://ionicapplogin-e9c88.firebaseio.com",
    projectId: "ionicapplogin-e9c88",
    storageBucket: "ionicapplogin-e9c88.appspot.com",
    messagingSenderId: "38984671875",
    appId: "1:38984671875:web:0af624f52d1d9ab600b1b6",
    measurementId: "G-PPV3QYSC11"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
/*

import * as firebase from "firebase";

constructor(private firebaseAuthentication: FirebaseAuthentication) {

 }*/


  export async function doLogin(check) {
      const info = JSON.parse(check);
      if(info.email.length && info.password.length) {
        var msg = "";
        var error;
        const auth = await firebase.auth().signInWithEmailAndPassword(info.email, info.password)
            .then(function(result) {
                msg = "Success";
                error = false;
                console.log(result);//result.user.tenantId //should be ‘TENANT_PROJECT_ID’.
            })
            .catch(function(error) {
                if (error.code === 'auth/wrong-password') {
                    error = true;
                    msg = "Wrong password.";
                } else {
                    error = true;
                    msg = error.message;
                }
            });
        if(msg===""){
            error = true;
            msg = "No esiting user with those credentials";
        }
        // Display the new image by rewriting the 'file://' path to HTTP
        // Details: https://ionicframework.com/docs/core-concepts/webview#file-protocol
        return {
            error: error,
            msg: msg
        };
      } else {
        return { error: true, msg: "Enter Information" };
      }
      
  }

  /*
  var user = firebase.auth().currentUser;

user.updateProfile({
  displayName: "Jane Q. User",
  photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});
  */
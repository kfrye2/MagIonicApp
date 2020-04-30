

//import firebase from "firebase/app";
//import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import * as firebase from "firebase";
//import "firebase/auth";
//import "firebase/firestore";
//require("firebase/firestore");
import jsCookie from 'js-cookie';

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

  export const firestore = firebase.firestore();
/*

import * as firebase from "firebase";

constructor(private firebaseAuthentication: FirebaseAuthentication) {

 }*/

  export async function doLogin(check) {
      const info = JSON.parse(check);
      var msg = "";
      var err;
      var userName = "";
      if(info.email.length && info.password.length) {
        const auth = await firebase.auth().signInWithEmailAndPassword(info.email, info.password)
            .then(function(result) {
                msg = "Success";
                err = false;
                if(result.user.displayName == null || result.user.displayName === ""){
                    const emailName = result.user.email.split("@");
                    userName = emailName[0];
                } else {
                    userName = result.user.displayName;
                }
            })
            .catch(function(error) {
                if (error.code === 'auth/wrong-password') {
                    err = true;
                    msg = "Wrong password.";
                } else {
                    err = true;
                    msg = error.message;
                }
            });
        if(msg===""){
            err = true;
            msg = "No esiting user with those credentials";;
        }
        // Display the new image by rewriting the 'file://' path to HTTP
        // Details: https://ionicframework.com/docs/core-concepts/webview#file-protocol
        return {
            err: err,
            msg: msg,
            un: userName
        };
      } else {
        return { err: true, msg: "Enter Information", un: userName };
      }
      
  }

  export async function doGoogleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    var userName = "";
    var msg = "";
    var err;
    const auth = await firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;        
        if(user.displayName == null || user.displayName === ""){
            const emailName = user.email.split("@");
            userName = emailName[0];
        } else {
            userName = user.displayName;
        }
        msg = "Success";
        err = false;
      }).catch(function(error) {
        // Handle Errors here.
        msg = error.message;
        err = true;
      });
    return { msg: msg, err: false, un: userName };
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
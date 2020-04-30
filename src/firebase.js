import * as firebase from "firebase";

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

  export async function doLogin(check) {
      const info = JSON.parse(check);
      var msg = "";
      var err;
      var userName = "";
      if(info.email.length && info.password.length) {
        await firebase.auth().signInWithEmailAndPassword(info.email, info.password)
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
    await firebase.auth().signInWithPopup(provider)
        .then(function(result) {
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

  export async function doNewLogin(info) {
    const user = JSON.parse(info);
    var userName = user.username;
    var msg = "";
    var err;
    console.log(user);
    const v = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(function(result) {
            msg = "Success";
            err = false;
        })
        .catch(function(error) {
            console.dir(error);
            msg = error.message;
            err = true;
        });
    console.log("AFTER!");
    return { msg: msg, err: false, un: userName };
  }
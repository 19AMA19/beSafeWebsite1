 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyCy3dYQI67hwhjJ2-R_JlhIhkAcQl29gbw",
   authDomain: "isoapplication-c76e3.firebaseapp.com",
   projectId: "isoapplication-c76e3",
   storageBucket: "isoapplication-c76e3.appspot.com",
   messagingSenderId: "688031718290",
   appId: "1:688031718290:web:bdb590d1d76ac5ebc4bf4b"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth();
 console.log(app);


//  Login Function
 var email = document.getElementById("email")
 var password = document.getElementById("password")

 window.login = function(e){
e.preventDefault();
    var user = {
    email:email.value,
    password:password.value,            
    }
    signInWithEmailAndPassword(auth, user.email, user.password).then(function(success){
        window.location.replace('dashboard.html');
        alert("Login successfully");
    })
    .catch(function(error){
        alert("Error "+ error)
    })
    console.log(user);
}

// Logout Function
window.logout = function(e){
    e.preventDefault();
    signOut(auth).then(() => {
        alert("Logout successfully");
        window.location.replace('index.html');
      }).catch((error) => {
        alert("Error: " + error);
      });
}




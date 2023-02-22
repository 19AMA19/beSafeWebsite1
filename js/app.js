 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
 import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
 import { getFirestore, collection, getDoc, getDocs, doc, query} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'

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
 const db = getFirestore(app);


// Get users data from firestore
const userList = document.querySelector('.ta');


getDocs(collection(db, "userData")).then(snapshot => {
  var index = 0;
  let html = '';

  snapshot.forEach((doc) => {
    const getUsers = doc.data();
    const li = `
    <tr>
        <td>${index+=1}</td>
        <td>${getUsers.fullname}</td>
        <td>${getUsers.email}</td>
        <td>${getUsers.department}</td>
        <td>${getUsers.division}</td>
        <td>${getUsers.role}</td>
    <tr>
      `;
    html += li;
  });
  userList.innerHTML = html;

});
  





// Check if user login
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('User logged in ' , user);
  } else {
    console.log('User logged out ' , user);

  }
});



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
        console.log("Logout");

        window.location.replace('index.html');
      }).catch((error) => {
        alert("Error: " + error);
      });
}


// ===================
// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

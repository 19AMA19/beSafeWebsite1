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

 const hideTable = document.querySelector('.table');
 const showUsers = document.querySelector('.ta');
 const showMessage = document.querySelector('#message');


// Check if user login
auth.onAuthStateChanged(user => {
  if (user) {
    // Get users data from firestore
    let html = '';
    var index = 0;
    getDocs(collection(db, "userData")).then(snapshot => {
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
            <td>Active</td>
        <tr>
          `;
        html += li
        showUsers.innerHTML = html
      });
    });



  } else {
    showMessage.innerHTML = `<h5 class="text-center justify-content-center"> Login to view data</h5>`;
    hideTable.style.display = "none";
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
        window.location.replace('./admin/index.html');
        // alert("Login successfully");
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
        alert("Logout successfully ...");
        console.log("Logout");

        window.location.replace('../index.html');
      }).catch((error) => {
        alert("Error: " + error);
    });
}




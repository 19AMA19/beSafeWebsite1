 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
 import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
 import { getFirestore, collection, getDoc, getDocs, doc, query, addDoc} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'


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
 const db = getFirestore();
 const usrCol = collection(db, 'userData');
 const snapshots = await getDocs(usrCol);

//  console.log(snapshots);


 var email = document.querySelector("#email")
 var password = document.querySelector("#password")
 const hideTable = document.querySelector('.table');
 const showUsers = document.querySelector('.ta');
 const showMessage = document.querySelector('.Ma');

 

// Check if user login
auth.onAuthStateChanged(user => {
  if (user) {
    // Get users data from firestore
    let html1 = ''; var index1 = 0; // For Drivers Page
    let html2 = ''; var index2 = 0; // For Messages Page

    getDocs(collection(db, "userData")).then(snapshot => {
      snapshot.forEach((doc1) => {
        const getUsers = doc1.data();
        const li1 = `
        <tr>
            <td>${index1 +=1 }</td>
            <td>${getUsers.fullname}</td>
            <td>${getUsers.email}</td>
            <td>${getUsers.department}</td>
            <td>${getUsers.division}</td>
            <td>${getUsers.role}</td>
            <td>Active</td>
        <tr>
          `;
        html1 += li1
        showUsers.innerHTML = html1
      });
    });

  getDocs(collection(db, "Messages")).then(snap => {
    snap.forEach((doc2) => {
      const UserMessages = doc2.data();
      const li2 = `
      <tr>
          <td>${index2 +=1 }</td>
          <td>${UserMessages.FULLNAME}</td>
          <td>${UserMessages.EMAIL}</td>
          <td>${UserMessages.MESSAGE}</td>
      <tr>
        `;
      html2 += li2
      showMessage.innerHTML = html2
    });
  });

  } else {
    // showMessage.innerHTML = `<h5 class="text-center justify-content-center"> Login to view data</h5>`;
    // hideTable.style.display = "none";
  }
});

//  Login Function

 window.login = function(e){
e.preventDefault();
    var user = {
    email:email.value,
    password:password.value,            
    }
    signInWithEmailAndPassword(auth, user.email, user.password).then(function(success){
        localStorage.setItem('user', JSON.stringify(user));
        window.location.replace('./admin/index.html');
        // alert("Login successfully");
    })
    .catch(function(error){
        alert("Error "+ error)
    })
}

// Logout Function
window.logout = function(e){
    e.preventDefault();
    signOut(auth).then(() => {
        alert("Logout successfully ...");
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');


        console.log("Logout");

        window.location.replace('../index.html');
      }).catch((error) => {
        alert("Error: " + error);
    });
}


// ========================================= User Profile ========================================
const myName = document.querySelector('#MyName');
const myEmail = document.querySelector('#MyEmail');
const myRole = document.querySelector('#MyRole');
const myPic = document.querySelector('#MyProfilePic');
const myDiv = document.querySelector('#MyDivision');
const myDept = document.querySelector('#MyDepartment');
const lastLogin = document.querySelector('#LastLogin');



const user = auth.currentUser;

if (user) {
  getDocs(collection(db, "userData")).then(snapshot => {
    snapshot.forEach((doc) => {
      const getUserInformation = doc.data();
      if(getUserInformation.uid == user.uid){
        myPic.innerHTML   = `<img id="MyProPic" src="${getUserInformation.imageUrl}" alt=""></img>`
        myName.innerHTML  = `<h3 class="text-center justify-content-center">${getUserInformation.fullname}</h3>`;
        myEmail.innerHTML = `<h3 class="text-center justify-content-center">${getUserInformation.email}</h3>`;
        myDiv.innerHTML  = `<h3 class="text-center justify-content-center">${getUserInformation.division}</h3>`;
        myDept.innerHTML  = `<h3 class="text-center justify-content-center">${getUserInformation.department}</h3>`;
        myRole.innerHTML  = `<h3 class="text-center justify-content-center">Account Type: (${getUserInformation.role})</h3>`;
        lastLogin.innerHTML  = `<h4 class="text-center justify-content-center text-warning">Last Login: ${user['metadata'].lastSignInTime}</h4>`;
      }
    });
  });

//  console.log(user);
} else {
  // alert('Please login')
}


// ========================================= Contact us ============================================

// Add Message
window.addMessage = function(e){
  e.preventDefault();

  let CNAME = document.querySelector('#CName').value;
  let CEMAIL = document.querySelector('#CEmail').value;
  let CMESSAGE = document.querySelector('#CMessage').value;
  let Alert = document.querySelector('#ALERT');

  addDoc(collection(db, "Messages"),{
    FULLNAME : CNAME,
    EMAIL : CEMAIL,
    MESSAGE : CMESSAGE,
  });
    Alert.style.display = "block";
    document.getElementById("myForm").reset();

}

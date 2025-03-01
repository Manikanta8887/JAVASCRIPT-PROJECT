import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsHUK_YSuffz8cnW7zwbVvvGoF1TZu_2U",
  authDomain: "manikanta-travels-f5ff5.firebaseapp.com",
  projectId: "manikanta-travels-f5ff5",
  storageBucket: "manikanta-travels-f5ff5.appspot.com",
  messagingSenderId: "331354051565",
  appId: "1:331354051565:web:ee5dc2ceef38966acd8de4",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(); 

document.getElementById("signup").addEventListener("click", () => {
  const signupEmail = document.getElementById("signup_email").value.trim();
  const signupPassword = document.getElementById("signup_password").value.trim();
  const signupFullName = document.getElementById("signup_fullname").value.trim(); 
  if (signupEmail && signupPassword && signupFullName) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then(async (userCredential) => {

        const user = userCredential.user;


        Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          text: 'You can now log in with your credentials.',
          confirmButtonText: 'OK',
          background: '#f7f7f7',
          iconColor: '#4CAF50',
          confirmButtonColor: '#E4B7A0'
        });

        
        const userData = {
          fullName: signupFullName,
          email: signupEmail,
          uid: user.uid, 
          createdAt: new Date().toISOString(), 
        };

        try {
          await setDoc(doc(db, "users", user.uid), userData);
          console.log("User data saved in Firestore.");
        } catch (error) {
          console.error("Error saving user data to Firestore:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error Saving Data!',
            text: 'Failed to save user data. Please try again.',
            confirmButtonText: 'OK',
            background: '#f7f7f7',
            iconColor: '#FF3B30',
            confirmButtonColor: '#E4B7A0'
          });
        }

        document.getElementById("signup_email").value = "";
        document.getElementById("signup_password").value = "";
        document.getElementById("signup_fullname").value = "";
      })
      .catch((error) => {
        console.error("Error code:", error.code);
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed!',
          text: error.message,
          confirmButtonText: 'Try Again',
          background: '#f7f7f7',
          iconColor: '#FF3B30',
          confirmButtonColor: '#E4B7A0'
        });
      });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Information',
      text: 'Please enter all required fields.',
      confirmButtonText: 'OK',
      background: '#f7f7f7',
      iconColor: '#FF9800',
      confirmButtonColor: '#E4B7A0'
    });
  }
});

document.getElementById("login").addEventListener("click", () => {
  const loginEmail = document.getElementById("login_email").value.trim();
  const loginPassword = document.getElementById("login_password").value.trim();

  if (loginEmail && loginPassword) {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You are now logged in.',
          confirmButtonText: 'OK',
          background: '#f7f7f7',
          iconColor: '#4CAF50',
          confirmButtonColor: '#E4B7A0'
        }).then(() => {
          window.location.href = "home.html";
        });
      })
      .catch((error) => {
        console.error("Error code:", error.code);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: error.message,
          confirmButtonText: 'Try Again',
          background: '#f7f7f7',
          iconColor: '#FF3B30',
          confirmButtonColor: '#E4B7A0'
        });
      });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Information',
      text: 'Please enter a valid email and password.',
      confirmButtonText: 'OK',
      background: '#f7f7f7',
      iconColor: '#FF9800',
      confirmButtonColor: '#E4B7A0'
    });
  }

  document.getElementById("login_email").value = "GuestLogin@gmail.com";
  document.getElementById("login_password").value = "ManiTraveller";
});



document.addEventListener("DOMContentLoaded", function () {
  const title = "MANI TRAVELS";
  let index = 0;
  let isDeleting = false;
  const titleElement = document.getElementById("title");

  function typeEffect() {
      if (!isDeleting) {
          titleElement.innerHTML = title.substring(0, index + 1);
          index++;
          if (index === title.length) {
              isDeleting = true;
              setTimeout(typeEffect, 1000); 
          } else {
              setTimeout(typeEffect, 500); 
          }
      } else {
          titleElement.innerHTML = title.substring(0, index - 1);
          index--;
          if (index === 0) {
              isDeleting = false;
              setTimeout(typeEffect, 500); 
          } else {
              setTimeout(typeEffect, 150); 
          }
      }
  }

  typeEffect();
});


const textElement = document.getElementById("text");
const texts = ["Bus", "Train", "Car"]; 
let currentText = 0;

function changeText() {
  textElement.innerText = texts[currentText];
  currentText = (currentText + 1) % texts.length; 
}

window.addEventListener("DOMContentLoaded", function() {
  changeText();
  setInterval(changeText, 6000); 
});
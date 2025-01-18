// // Import the functions you need from the SDKs
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAsHUK_YSuffz8cnW7zwbVvvGoF1TZu_2U",
//   authDomain: "manikanta-travels-f5ff5.firebaseapp.com",
//   projectId: "manikanta-travels-f5ff5",
//   storageBucket: "manikanta-travels-f5ff5.appspot.com",
//   messagingSenderId: "331354051565",
//   appId: "1:331354051565:web:ee5dc2ceef38966acd8de4",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const db = getFirestore(); // Initialize Firestore

// // Add event listener to the signup button
// document.getElementById("signup").addEventListener("click", () => {
//   const signupEmail = document.getElementById("signup_email").value.trim();
//   const signupPassword = document.getElementById("signup_password").value.trim();
//   const signupFullName = document.getElementById("signup_fullname").value.trim(); // Add a field for full name

//   if (signupEmail && signupPassword && signupFullName) {
//     createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
//       .then(async (userCredential) => {
//         // Signed up successfully
//         const user = userCredential.user;
//         alert("Account Successfully Created. You can now log in.");
//         console.log("User created:", user);

//         // Save additional user information in Firestore
//         const userData = {
//           fullName: signupFullName,
//           email: signupEmail,
//           uid: user.uid, // Store user ID for reference
//           createdAt: new Date().toISOString(), // Optionally add a timestamp
//         };

//         try {
//           await setDoc(doc(db, "users", user.uid), userData);
//           console.log("User data saved in Firestore.");
//         } catch (error) {
//           console.error("Error saving user data to Firestore:", error);
//           alert("Failed to save user data. Please try again.");
//         }

//         // Automatically clear fields after signup
//         document.getElementById("signup_email").value = "";
//         document.getElementById("signup_password").value = "";
//         document.getElementById("signup_fullname").value = "";
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error("Error code:", error.code);
//         alert("Error: " + error.message);
//       });
//   } else {
//     alert("Please enter all required fields.");
//   }
// });

// // Add event listener to the login button
// document.getElementById("login").addEventListener("click", () => {
//   const loginEmail = document.getElementById("login_email").value.trim();
//   const loginPassword = document.getElementById("login_password").value.trim();

//   if (loginEmail && loginPassword) {
//     signInWithEmailAndPassword(auth, loginEmail, loginPassword)
//       .then((userCredential) => {
//         // Signed in successfully
//         const user = userCredential.user;
//         alert("Login Successful!");
//         console.log("Logged in user:", user);

//         // Redirect to home page
//         window.location.href = "home.html";
//       })
//       .catch((error) => {
//         // Handle login errors
//         console.error("Error code:", error.code);
//         alert("Login failed: " + error.message);
//       });
//   } else {
//     alert("Please enter valid email and password.");
//   }

//   // Automatically clear fields after login attempt
//   document.getElementById("login_email").value = "";
//   document.getElementById("login_password").value = "";
// });

  // Import the functions you need from the SDKs
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAsHUK_YSuffz8cnW7zwbVvvGoF1TZu_2U",
    authDomain: "manikanta-travels-f5ff5.firebaseapp.com",
    projectId: "manikanta-travels-f5ff5",
    storageBucket: "manikanta-travels-f5ff5.appspot.com",
    messagingSenderId: "331354051565",
    appId: "1:331354051565:web:ee5dc2ceef38966acd8de4",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore(); // Initialize Firestore

  // Add event listener to the signup button
  document.getElementById("signup").addEventListener("click", () => {
    const signupEmail = document.getElementById("signup_email").value.trim();
    const signupPassword = document.getElementById("signup_password").value.trim();
    const signupFullName = document.getElementById("signup_fullname").value.trim(); // Add a field for full name

    if (signupEmail && signupPassword && signupFullName) {
      createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then(async (userCredential) => {
          // Signed up successfully
          const user = userCredential.user;

          // SweetAlert for successful signup
          Swal.fire({
            icon: 'success',
            title: 'Account Created!',
            text: 'You can now log in with your credentials.',
            confirmButtonText: 'OK',
            background: '#f7f7f7',
            iconColor: '#4CAF50',
            confirmButtonColor: '#E4B7A0'
          });

          // Save additional user information in Firestore
          const userData = {
            fullName: signupFullName,
            email: signupEmail,
            uid: user.uid, // Store user ID for reference
            createdAt: new Date().toISOString(), // Optionally add a timestamp
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

          // Automatically clear fields after signup
          document.getElementById("signup_email").value = "";
          document.getElementById("signup_password").value = "";
          document.getElementById("signup_fullname").value = "";
        })
        .catch((error) => {
          // Handle errors
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
      // SweetAlert for missing fields
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

  // Add event listener to the login button
  document.getElementById("login").addEventListener("click", () => {
    const loginEmail = document.getElementById("login_email").value.trim();
    const loginPassword = document.getElementById("login_password").value.trim();

    if (loginEmail && loginPassword) {
      signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
          // Signed in successfully
          const user = userCredential.user;

          // SweetAlert for successful login
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You are now logged in.',
            confirmButtonText: 'OK',
            background: '#f7f7f7',
            iconColor: '#4CAF50',
            confirmButtonColor: '#E4B7A0'
          }).then(() => {
            // Redirect to home page
            window.location.href = "home.html";
          });
        })
        .catch((error) => {
          // Handle login errors
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
      // SweetAlert for missing fields
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

    // Automatically clear fields after login attempt
    document.getElementById("login_email").value = "";
    document.getElementById("login_password").value = "";
  });

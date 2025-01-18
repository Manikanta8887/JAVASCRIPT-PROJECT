// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAsHUK_YSuffz8cnW7zwbVvvGoF1TZu_2U",
//   authDomain: "manikanta-travels-f5ff5.firebaseapp.com",
//   projectId: "manikanta-travels-f5ff5",
//   storageBucket: "manikanta-travels-f5ff5.firebaseapp.com",
//   messagingSenderId: "331354051565",
//   appId: "1:331354051565:web:ee5dc2ceef38966acd8de4",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const db = getFirestore(); // Initialize Firestore

// document.addEventListener('DOMContentLoaded', () => {
//   const avatarImg = document.getElementById('userAvatar');
//   const imageInput = document.getElementById('imageUpload');
//   const uploadAvatar = document.getElementById('uploadAvatar');

//   // Initialize Avatar based on user's email from localStorage
//   const initializeUserAvatar = () => {
//     const user = auth.currentUser;
//     if (user) {
//       const userEmail = user.email;
//       const savedImage = localStorage.getItem(`userAvatar_${userEmail}`);
//       avatarImg.src = savedImage || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";

//       // Fetch user data from Firestore
//       fetchUserData(user.uid);
//     }
//   };

//   // Fetch user data from Firestore
//   const fetchUserData = async (userId) => {
//     try {
//       const userDoc = await getDoc(doc(db, "users", userId));
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         document.getElementById("username").innerText = userData.fullName || "Unknown"; // Update name
//         document.getElementById("useremail").innerText = userData.email || "No email available"; // Update email
//       } else {
//         console.error("No user data found!");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   // Trigger File Input on Upload Avatar Click
//   uploadAvatar.addEventListener('click', () => {
//     imageInput.click();
//   });

//   // Handle Image Upload with Resizing
//   imageInput.addEventListener('change', (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         alert('Please upload a valid image file.');
//         return;
//       }

//       // Resize the image before saving it
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = new Image();
//         img.onload = () => {
//           // Create a canvas to resize the image
//           const canvas = document.createElement('canvas');
//           const ctx = canvas.getContext('2d');

//           // Resize image to a fixed width (e.g., 150px)
//           const maxWidth = 150;
//           const scale = maxWidth / img.width;
//           canvas.width = maxWidth;
//           canvas.height = img.height * scale;

//           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//           // Convert resized image to base64
//           const resizedDataUrl = canvas.toDataURL(file.type);

//           // Save resized avatar to localStorage
//           const user = auth.currentUser;
//           if (user) {
//             const userEmail = user.email;
//             localStorage.setItem(`userAvatar_${userEmail}`, resizedDataUrl);
//             avatarImg.src = resizedDataUrl;
//             alert('Avatar updated successfully!');
//           }
//         };
//         img.src = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   });

//   // Check if a user is logged in and initialize their avatar and data
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       initializeUserAvatar();
//     } else {
//       console.error("No user is logged in");
//     }
//   });

//   // Add event listener to the signout button
//   document.getElementById("signOut").addEventListener("click", () => {
//     signOut(auth)
//       .then(() => {
//         alert("Sign Out Successful!");
//         window.location.href = "index.html"; // Redirect to login or homepage
//       })
//       .catch((error) => {
//         console.error("Error signing out:", error);
//         alert("Error: " + error.message);
//       });
//   });
// });

// // Gallery and Popup logic
// document.addEventListener("DOMContentLoaded", function () {
//   // Retrieve package data from localStorage
//   const packages = JSON.parse(localStorage.getItem("Packages"));

//   if (!packages || packages.length === 0) {
//     console.error("No packages found in localStorage!");
//     return;
//   }

//   // Get the package ID from URL if available
//   const urlParams = new URLSearchParams(window.location.search);
//   const packageId = parseInt(urlParams.get("id"));
//   let selectedPackage = null;

//   // If packageId is present, find the matching package
//   if (packageId) {
//     selectedPackage = packages.find((p) => p.id === packageId);
//     if (!selectedPackage) {
//       console.error("Selected package not found!");
//       return;
//     }
//   }

//   // Function to populate content dynamically
//   function populateContent(packageData) {
//     // Add video to top-right-container
//     const topRightContainer = document.querySelector(".top-right-container");
//     if (packageData.video) {
//       topRightContainer.innerHTML = `
//       <a href="${packageData.video}" target="videoFrame">
//         <video controls>
//           <source src="${packageData.video}" type="video/mp4">
//           Your browser does not support the video tag.
//         </video>
//       </a>`;
    
//     }

//     // Add video to bottom-right-container
//     const bottomRightContainer = document.querySelector(".bottom-right-container");
//     if (packageData.video1) {
//       bottomRightContainer.innerHTML =  `
//       <a href="${packageData.video1}" target="videoFrame">
//         <video controls>
//           <source src="${packageData.video1}" type="video/mp4">
//           Your browser does not support the video tag.
//         </video>
//       </a>`;
    
//     }
    

//     // Add images to bottom-container
//     const bottomContainer = document.querySelector(".bottom-container");
//     bottomContainer.innerHTML = 
//       `${packageData.image ? `<a href="${packageData.image}" target="videoFrame"><img src="${packageData.image}" alt="${packageData.title}" style="width:90%; height:90%;" /></a>` : ""}`;
//   }
  

//   // If a specific package is selected, populate its content
//   if (selectedPackage) {
//     populateContent(selectedPackage);
//   } else {
//     // If no specific package is selected, populate all packages
//     packages.forEach((packageItem) => {
//       const galleryContainer = document.getElementById("Travelling");
//       const card = document.createElement("div");
//       card.classList.add("gallery-item");

//       card.innerHTML = 
//         `<div class="clickable" data-id="${packageItem.id}">
//           <img class="images" src="${packageItem.image}" alt="${packageItem.title}" width="100%" height="200px"/>
//           <div class="overlay">${packageItem.title}</div>
//         </div>`;

//       galleryContainer.appendChild(card);
//     });
//   }

//   // Popup functionality
//   const popup = document.getElementById("popup");
//   const closePopupBtn = document.getElementById("closePopup");
//   const iframe = document.getElementById("popupIframe");

//   function openPopup() {
//     popup.style.display = "flex";
//   }

//   function closePopup() {
//     popup.style.display = "none";
//     iframe.src = ""; // Clear iframe content
//   }

//   closePopupBtn.addEventListener("click", closePopup);

//   // Add event listeners to clickable elements
//   const clickableElements = document.querySelectorAll(".clickable");
//   clickableElements.forEach((element) => {
//     element.addEventListener("click", () => {
//       const packageId = element.getAttribute("data-id");
//       const packageData = packages.find(p => p.id == packageId);
      
//       if (packageData) {
//         populateContent(packageData);
//         openPopup();
//       }
//     });
//   });
// });


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsHUK_YSuffz8cnW7zwbVvvGoF1TZu_2U",
  authDomain: "manikanta-travels-f5ff5.firebaseapp.com",
  projectId: "manikanta-travels-f5ff5",
  storageBucket: "manikanta-travels-f5ff5.firebaseapp.com",
  messagingSenderId: "331354051565",
  appId: "1:331354051565:web:ee5dc2ceef38966acd8de4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(); // Initialize Firestore

document.addEventListener("DOMContentLoaded", () => {
  const avatarImg = document.getElementById("userAvatar");
  const imageInput = document.getElementById("imageUpload");
  const uploadAvatar = document.getElementById("uploadAvatar");

  // Initialize Avatar based on user's email from localStorage
  const initializeUserAvatar = () => {
    const user = auth.currentUser;
    if (user) {
      const userEmail = user.email;
      const savedImage = localStorage.getItem(`userAvatar_${userEmail}`);
      avatarImg.src =
        savedImage ||
        "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";

      // Fetch user data from Firestore
      fetchUserData(user.uid);
    }
  };

  // Fetch user data from Firestore
  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        document.getElementById("username").innerText =
          userData.fullName || "Unknown"; // Update name
        document.getElementById("useremail").innerText =
          userData.email || "No email available"; // Update email
      } else {
        console.error("No user data found!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Trigger File Input on Upload Avatar Click
  uploadAvatar.addEventListener("click", () => {
    imageInput.click();
  });

  // Handle Image Upload with Resizing
  imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }

      // Resize the image before saving it
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Resize image to a fixed width (e.g., 150px)
          const maxWidth = 150;
          const scale = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scale;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert resized image to base64
          const resizedDataUrl = canvas.toDataURL(file.type);

          // Save resized avatar to localStorage
          const user = auth.currentUser;
          if (user) {
            const userEmail = user.email;
            localStorage.setItem(`userAvatar_${userEmail}`, resizedDataUrl);
            avatarImg.src = resizedDataUrl;
            alert("Avatar updated successfully!");
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Check if a user is logged in and initialize their avatar and data
  onAuthStateChanged(auth, (user) => {
    if (user) {
      initializeUserAvatar();
    } else {
      console.error("No user is logged in");
    }
  });

  // Add event listener to the signout button
  document.getElementById("signOut").addEventListener("click", () => {
    // Use SweetAlert for logout confirmation
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have been logged out successfully.",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              window.location.href = "index.html"; // Redirect to login or homepage
            });
          })
          .catch((error) => {
            console.error("Error signing out:", error);
            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  });
});

// Gallery and Popup logic
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve package data from localStorage
  const packages = JSON.parse(localStorage.getItem("Packages"));

  if (!packages || packages.length === 0) {
    console.error("No packages found in localStorage!");
    return;
  }

  // Get the package ID from URL if available
  const urlParams = new URLSearchParams(window.location.search);
  const packageId = parseInt(urlParams.get("id"));
  let selectedPackage = null;

  // If packageId is present, find the matching package
  if (packageId) {
    selectedPackage = packages.find((p) => p.id === packageId);
    if (!selectedPackage) {
      console.error("Selected package not found!");
      return;
    }
  }

  // Function to populate content dynamically
  function populateContent(packageData) {
    // Add video to top-right-container
    const topRightContainer = document.querySelector(".top-right-container");
    if (packageData.video) {
      topRightContainer.innerHTML = `
      <a href="${packageData.video}" target="videoFrame">
        <video controls>
          <source src="${packageData.video}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </a>`;
    }

    // Add video to bottom-right-container
    const bottomRightContainer = document.querySelector(".bottom-right-container");
    if (packageData.video1) {
      bottomRightContainer.innerHTML = `
      <a href="${packageData.video1}" target="videoFrame">
        <video controls>
          <source src="${packageData.video1}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </a>`;
    }

    // Add images to bottom-container
    const bottomContainer = document.querySelector(".bottom-container");
    bottomContainer.innerHTML =
      `${packageData.image ? `<a href="${packageData.image}" target="videoFrame"><img src="${packageData.image}" alt="${packageData.title}" style="width:90%; height:90%;" /></a>` : ""}`;
  }

  // If a specific package is selected, populate its content
  if (selectedPackage) {
    populateContent(selectedPackage);
  } else {
    // If no specific package is selected, populate all packages
    packages.forEach((packageItem) => {
      const galleryContainer = document.getElementById("Travelling");
      const card = document.createElement("div");
      card.classList.add("gallery-item");

      card.innerHTML = `
        <div class="clickable" data-id="${packageItem.id}">
          <img class="images" src="${packageItem.image}" alt="${packageItem.title}" width="100%" height="200px"/>
          <div class="overlay">${packageItem.title}</div>
        </div>`;

      galleryContainer.appendChild(card);
    });
  }

  // Popup functionality
  const popup = document.getElementById("popup");
  const closePopupBtn = document.getElementById("closePopup");
  const iframe = document.getElementById("popupIframe");

  function openPopup() {
    popup.style.display = "flex";
  }

  function closePopup() {
    popup.style.display = "none";
    iframe.src = ""; // Clear iframe content
  }

  closePopupBtn.addEventListener("click", closePopup);

  // Add event listeners to clickable elements
  const clickableElements = document.querySelectorAll(".clickable");
  clickableElements.forEach((element) => {
    element.addEventListener("click", () => {
      const packageId = element.getAttribute("data-id");
      const packageData = packages.find((p) => p.id == packageId);

      if (packageData) {
        populateContent(packageData);
        openPopup();
      }
    });
  });
});

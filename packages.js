// // Import necessary Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
// import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// // Firebase configuration
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
// const db = getFirestore(app);

// // Currency Symbol
// const currencySymbol = "₹";

// // Store Packages in Firestore (if not already stored)
// const storePackagesInFirestore = async () => {
//   try {
//     const Packages = [
//       { id: 1, title: "Godavari", price: 2999, category: "TOUR", image: "images/Pushkar Ghat.jpeg", image1: "images/Train.jpeg", video: "videos/TOUR.mp4", video1: "Videos/godavari4.mp4", person: 1 },
//       { id: 2, title: "Konaseema", price: 2499, category: "TOUR", image: "images/Konaseema.jpg", image1: "./images/Train22.jpg", video: "Videos/Nature.mp4", video1: "Videos/Nature.mp4", person: 1 },
//       { id: 3, title: "Tirumala", price: 6000, category: "TOUR", image: "images/Tirumala.jpg", image1: "./images/Train33.jpg", video: "Videos/Rajahmundry.mp4", video1: "Videos/Rajahmundry.mp4", person: 1 },
//       { id: 4, title: "Annavaram", price: 4000, category: "TOUR", image: "images/Annavaram.jpeg", image1: "./images/Train22.jpg", video: "Videos/SANKRANTHI.mp4", video1: "Videos/SANKRANTHI.mp4", person: 1 },
//       { id: 5, title: "Araku", price: 4999, category: "TOUR", image: "images/Araku2.jpeg", image1: "./images/Train11.jpeg", video: "videos/TOUR.mp4", video1: "Videos/TOUR.mp4", person: 1 },
//       { id: 6, title: "Maredumilli", price: 3500, category: "TOUR", image: "images/Maredumilli.webp", image1: "./images/Train22.jpg", video: "Videos/Tour2.mp4", video1: "Videos/Tour2.mp4", person: 1 },
//       { id: 7, title: "Lambasingi", price: 4599, category: "TOUR", image: "images/Lambasingi.jpg", image1: "./images/Train33.jpeg", video: "Videos/Tour3.mp4", video1: "Videos/Tour3.mp4", person: 1 },
//       { id: 8, title: "Vanajangi", price: 4499, category: "TOUR", image: "images/Vanajangi.jpg", image1: "./images/Train22.jpg", video: "Videos/SANKRANTHI.mp4", video1: "Videos/SANKRANTHI.mp4", person: 1 },
//       { id: 9, title: "Gudisa", price: 3499, category: "TOUR", image: "images/Gudisa.jpg", image1: "./images/Train11.jpeg", video: "Videos/TOY.mp4", video1: "Videos/TOY.mp4", person: 1 },
//       { id: 90, title: "Rampachodavaram", price: 1999, category: "TOUR", image: "images/Rampachodavaram.jpeg", image1: "./images/Train22.jpg", video: "Videos/Maredumilli.mp4", video1: "Videos/Maredumilli.mp4", person: 1 },
//       { id: 91, title: "Vizag", price: 3499, category: "TOUR", image: "images/Vizag.jpg", image1: "./images/Train33.jpeg", video: "Videos/SANKRANTHI.mp4", video1: "Videos/SANKRANTHI.mp4", person: 1 },
//       { id: 92, title: "Rampachodavaram", price: 1999, category: "TOUR", image: "images/Annavaram.jpeg", image1: "./images/Train.jpeg", video: "Videos/Maredumilli1.mp4", video1: "Videos/Maredumilli1.mp4", person: 1 },
//     ];

//     for (const pkg of Packages) {
//       await setDoc(doc(db, "packages", pkg.id.toString()), pkg);
//       console.log(`Package with ID ${pkg.id} stored successfully.`);
//     }
//     // alert("All packages stored successfully in Firestore!");
//   } catch (error) {
//     console.error("Error storing packages in Firestore:", error);
//     // alert("Failed to store packages. Please try again.");
//   }
// };

// // Call the function to store data in Firestore (only once)
// storePackagesInFirestore();

// // Display Packages in the DOM (for listing on the homepage)
// let data = document.getElementById("Travelling");

// // Fetch packages from Firestore
// const fetchPackagesFromFirestore = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "packages"));
//     querySnapshot.forEach(doc => {
//       const pkg = doc.data();
//       let card = document.createElement("div");
//       card.classList.add("Travel");

//       card.innerHTML = `
//         <img src="${pkg.image}" alt="${pkg.title}" width="100%" height="350px" />
//         <div class="innerdiv1">
//           <h1>${pkg.title}</h1>
//           <p>Price: ₹${pkg.price}</p>
//           <div class="innerdiv">
//             <button class="p_btn book-now" data-id="${pkg.id}">BOOK NOW</button>
//             <button class="p_btn seemore-btn" data-id="${pkg.id}">SEE MORE</button>
//           </div>
//         </div>
//       `;
//       data.append(card);
//     });

//     // Attach event listeners to buttons
//     document.querySelectorAll(".seemore-btn").forEach(button => {
//       button.addEventListener("click", (e) => {
//         const packageId = e.target.getAttribute("data-id");
//         window.location.href = `seemore.html?id=${packageId}`;
//       });
//     });

//     document.querySelectorAll(".book-now").forEach(button => {
//       button.addEventListener("click", (e) => {
//         const packageId = e.target.getAttribute("data-id");
//         window.location.href = `Booknow.html?id=${packageId}`;
//       });
//     });

//   } catch (error) {
//     console.error("Error fetching packages from Firestore:", error);
//   }
// };

// // Call the function to fetch data from Firestore
// fetchPackagesFromFirestore();

// // Code for managing user avatar and authentication
// document.addEventListener('DOMContentLoaded', () => {
//   const avatarImg = document.getElementById('userAvatar');
//   const imageInput = document.getElementById('imageUpload');
//   const uploadAvatar = document.getElementById('uploadAvatar');

//   const initializeUserAvatar = () => {
//     const user = auth.currentUser;
//     if (user) {
//       const userEmail = user.email;
//       const savedImage = localStorage.getItem(`userAvatar_${userEmail}`);
//       avatarImg.src = savedImage || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";
//       fetchUserData(user.uid);
//     }
//   };

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

//   uploadAvatar.addEventListener('click', () => {
//     imageInput.click();
//   });

//   imageInput.addEventListener('change', (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         alert('Please upload a valid image file.');
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = new Image();
//         img.onload = () => {
//           const canvas = document.createElement('canvas');
//           const ctx = canvas.getContext('2d');
//           const maxWidth = 150;
//           const scale = maxWidth / img.width;
//           canvas.width = maxWidth;
//           canvas.height = img.height * scale;
//           ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//           const resizedDataUrl = canvas.toDataURL(file.type);

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

//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       initializeUserAvatar();
//     } else {
//       console.error("No user is logged in.");
//     }
//   });
// });

// const signOutBtn = document.getElementById("signOut");

// signOutBtn.addEventListener("click", async () => {
//   try {
//     await signOut(auth);
//     window.location.href = "login.html"; // Redirect to login page after sign out
//   } catch (error) {
//     console.error("Error signing out: ", error);
//   }
// });

// // Fetch package details from Firestore by ID (for `seemore.html`)
// const fetchPackageDetails = async (packageId) => {
//   try {
//     const docRef = doc(db, "packages", packageId.toString());
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const packageData = docSnap.data();
//       const dataContainer = document.getElementById("Travelling");

//       let card = document.createElement("div");
//       card.classList.add("Travel");

//       card.innerHTML = `
//         <img src="${packageData.image}" alt="${packageData.title}" width="100%" height="350px" />
//         <div class="innerdiv1">
//           <h1>${packageData.title}</h1>
//           <p>Price: ₹${packageData.price}</p>
//           <div class="innerdiv">
//             <button class="p_btn book-now" data-id="${packageData.id}">BOOK NOW</button>
//             <button class="p_btn seemore-btn" data-id="${packageData.id}">SEE MORE</button>
//           </div>
//         </div>
//       `;
//       dataContainer.appendChild(card);
//     } else {
//       console.log("No package found with this ID.");
//     }
//   } catch (error) {
//     console.error("Error fetching package from Firestore:", error);
//   }
// };

// // Call the function for the `seemore.html` page after the page is loaded
// document.addEventListener("DOMContentLoaded", () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const packageId = urlParams.get("id");

//   if (packageId) {
//     fetchPackageDetails(packageId); // Fetch and display the package
//   } else {
//     console.log("No package ID found in the URL.");
//   }
// });


// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// SweetAlert library
import "https://cdn.jsdelivr.net/npm/sweetalert2@11";

// Firebase configuration
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
const db = getFirestore(app);

// Currency Symbol
const currencySymbol = "₹";

// Store Packages in Firestore (if not already stored)
const storePackagesInFirestore = async () => {
  try {
    const Packages = [
      { id: 1, title: "Godavari", price: 2999, category: "TOUR", image: "images/Pushkar Ghat.jpeg", image1: "images/Train.jpeg", video: "videos/TOUR.mp4", video1: "Videos/godavari4.mp4", person: 1 },
      { id: 2, title: "Konaseema", price: 2499, category: "TOUR", image: "images/Konaseema.jpg", image1: "./images/Train22.jpg", video: "Videos/Nature.mp4", video1: "Videos/Nature.mp4", person: 1 },
      { id: 3, title: "Tirumala", price: 6000, category: "TOUR", image: "images/Tirumala.jpg", image1: "./images/Train33.jpg", video: "Videos/Rajahmundry.mp4", video1: "Videos/Rajahmundry.mp4", person: 1 },
      { id: 4, title: "Annavaram", price: 4000, category: "TOUR", image: "images/Annavaram.jpeg", image1: "./images/Train22.jpg", video: "Videos/SANKRANTHI.mp4", video1: "Videos/SANKRANTHI.mp4", person: 1 },
      { id: 5, title: "Araku", price: 4999, category: "TOUR", image: "images/Araku2.jpeg", image1: "./images/Train11.jpeg", video: "videos/TOUR.mp4", video1: "Videos/TOUR.mp4", person: 1 },
      { id: 6, title: "Maredumilli", price: 3500, category: "TOUR", image: "images/Maredumilli.webp", image1: "./images/Train22.jpg", video: "Videos/Tour2.mp4", video1: "Videos/Tour2.mp4", person: 1 },
      { id: 7, title: "Lambasingi", price: 4599, category: "TOUR", image: "images/Lambasingi.jpg", image1: "./images/Train33.jpeg", video: "Videos/Tour3.mp4", video1: "Videos/Tour3.mp4", person: 1 },
      { id: 8, title: "Vanajangi", price: 4499, category: "TOUR", image: "images/Vanajangi.jpg", image1: "./images/Train22.jpg", video: "Videos/SANKRANTHI.mp4", video1: "Videos/SANKRANTHI.mp4", person: 1 },
      { id: 9, title: "Gudisa", price: 3499, category: "TOUR", image: "images/Gudisa.jpg", image1: "./images/Train11.jpeg", video: "Videos/TOY.mp4", video1: "Videos/TOY.mp4", person: 1 },
      { id: 90, title: "Rampachodavaram", price: 1999, category: "TOUR", image: "images/Rampachodavaram.jpeg", image1: "./images/Train22.jpg", video: "Videos/Maredumilli.mp4", video1: "Videos/Maredumilli.mp4", person: 1 },
      { id: 91, title: "Vizag", price: 3499, category: "TOUR", image: "images/Vizag.jpg", image1: "./images/Train33.jpeg", video: "Videos/SANKRANTHI.mp4", video1: "Videos/SANKRANTHI.mp4", person: 1 },
      { id: 92, title: "Rampachodavaram", price: 1999, category: "TOUR", image: "images/Annavaram.jpeg", image1: "./images/Train.jpeg", video: "Videos/Maredumilli1.mp4", video1: "Videos/Maredumilli1.mp4", person: 1 },
    ];

    for (const pkg of Packages) {
      await setDoc(doc(db, "packages", pkg.id.toString()), pkg);
      console.log(`Package with ID ${pkg.id} stored successfully.`);
    }
  } catch (error) {
    console.error("Error storing packages in Firestore:", error);
  }
};

// Call the function to store data in Firestore (only once)
storePackagesInFirestore();

// Display Packages in the DOM (for listing on the homepage)
let data = document.getElementById("Travelling");

// Fetch packages from Firestore
const fetchPackagesFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "packages"));
    querySnapshot.forEach(doc => {
      const pkg = doc.data();
      let card = document.createElement("div");
      card.classList.add("Travel");

      card.innerHTML = `
        <img src="${pkg.image}" alt="${pkg.title}" width="100%" height="350px" />
        <div class="innerdiv1">
          <h1>${pkg.title}</h1>
          <p>Price: ₹${pkg.price}</p>
          <div class="innerdiv">
            <button class="p_btn book-now" data-id="${pkg.id}">BOOK NOW</button>
            <button class="p_btn seemore-btn" data-id="${pkg.id}">SEE MORE</button>
          </div>
        </div>
      `;
      data.append(card);
    });

    // Attach event listeners to buttons
    document.querySelectorAll(".seemore-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const packageId = e.target.getAttribute("data-id");
        window.location.href = `seemore.html?id=${packageId}`;
      });
    });

    document.querySelectorAll(".book-now").forEach(button => {
      button.addEventListener("click", (e) => {
        const packageId = e.target.getAttribute("data-id");
        window.location.href = `Booknow.html?id=${packageId}`;
      });
    });

  } catch (error) {
    console.error("Error fetching packages from Firestore:", error);
  }
};

// Call the function to fetch data from Firestore
fetchPackagesFromFirestore();

// Code for managing user avatar and authentication
document.addEventListener('DOMContentLoaded', () => {
  const avatarImg = document.getElementById('userAvatar');
  const imageInput = document.getElementById('imageUpload');
  const uploadAvatar = document.getElementById('uploadAvatar');

  const initializeUserAvatar = () => {
    const user = auth.currentUser;
    if (user) {
      const userEmail = user.email;
      const savedImage = localStorage.getItem(`userAvatar_${userEmail}`);
      avatarImg.src = savedImage || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";
      fetchUserData(user.uid);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        document.getElementById("username").innerText = userData.fullName || "Unknown"; // Update name
        document.getElementById("useremail").innerText = userData.email || "No email available"; // Update email
      } else {
        console.error("No user data found!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  uploadAvatar.addEventListener('click', () => {
    imageInput.click();
  });

  imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxWidth = 150;
          const scale = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scale;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const resizedDataUrl = canvas.toDataURL(file.type);

          const user = auth.currentUser;
          if (user) {
            const userEmail = user.email;
            localStorage.setItem(`userAvatar_${userEmail}`, resizedDataUrl);
            avatarImg.src = resizedDataUrl;
            alert('Avatar updated successfully!');
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      initializeUserAvatar();
    } else {
      console.error("No user is logged in.");
    }
  });
});

// Logout with SweetAlert
const signOutBtn = document.getElementById("signOut");

signOutBtn.addEventListener("click", async () => {
  Swal.fire({
    title: "Are you sure you want to log out?",
    text: "You will need to log in again to access your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log me out!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await signOut(auth);
        Swal.fire("Logged Out!", "You have been successfully logged out.", "success").then(() => {
          window.location.href = "login.html"; // Redirect to login page after sign out
        });
      } catch (error) {
        console.error("Error signing out: ", error);
        Swal.fire("Error!", "An error occurred while logging out.", "error");
      }
    }
  });
});

// Ticket form submission with SweetAlert confirmation
document.getElementById("ticket-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  Swal.fire({
    title: "Confirm Your Booking?",
    text: "Please review the details before confirming your booking.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm Booking",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const ticketData = {
          travelTitle: document.getElementById("travel-title").value,
          travelId: document.getElementById("travel-id").value,
          arrivalPoint: document.getElementById("arrival-point").value,
          destinationPoint: document.getElementById("destination-point").value,
          fullName: document.getElementById("full-name").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
          dob: document.getElementById("dob").value,
          Aadhaar: document.getElementById("Aadhaar").value,
          departureDate: document.getElementById("departure-date").value,
          totalPrice: parseFloat(
            document.getElementById("total-price").textContent
              .replace("₹", "")
              .trim()
          ),
        };

        const user = auth.currentUser;

        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          await setDoc(userDocRef, { tickets: ticketData }, { merge: true });

          localStorage.setItem(
            `passengerData-${user.uid}`,
            JSON.stringify(ticketData)
          );

          Swal.fire("Booking Confirmed!", "Your ticket details have been saved to Firestore.", "success").then(() => {
            window.location.href = "ticket.html";
          });
        } else {
          Swal.fire("Error!", "Please log in to save your booking details.", "error");
        }
      } catch (error) {
        console.error("Error saving to Firestore:", error);
        Swal.fire("Error!", "An error occurred while saving your booking details.", "error");
      }

      // Reset the form
      document.getElementById("ticket-form").reset();
    }
  });
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

document.addEventListener("DOMContentLoaded", () => {
  const avatarImg = document.getElementById("userAvatar");
  const imageInput = document.getElementById("imageUpload");
  const uploadAvatar = document.getElementById("uploadAvatar");

  const initializeUserAvatar = () => {
    const user = auth.currentUser;
    if (user) {
      const userEmail = user.email;
      const savedImage = localStorage.getItem(`userAvatar_${userEmail}`);
      avatarImg.src =
        savedImage ||
        "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";

      fetchUserData(user.uid);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        document.getElementById("username").innerText =
          userData.fullName || "Unknown"; 
        document.getElementById("useremail").innerText =
          userData.email || "No email available"; 
      } else {
        console.error("No user data found!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  uploadAvatar.addEventListener("click", () => {
    imageInput.click();
  });

  imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const maxWidth = 150;
          const scale = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scale;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const resizedDataUrl = canvas.toDataURL(file.type);

          const user = auth.currentUser;
          if (user) {
            const userEmail = user.email;
            localStorage.setItem(
              `userAvatar_${userEmail}`,
              resizedDataUrl
            );
            avatarImg.src = resizedDataUrl;
            alert("Avatar updated successfully!");
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
      console.error("No user is logged in");
    }
  });

  document.getElementById("signOut").addEventListener("click", () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            Swal.fire(
              "Logged Out!",
              "You have been successfully logged out.",
              "success"
            ).then(() => {
              window.location.href = "index.html"; 
            });
          })
          .catch((error) => {
            Swal.fire("Error!", error.message, "error");
          });
      }
    });
  });

  document.getElementById("BOOKTICKET").addEventListener("click", async (e) => {
    e.preventDefault(); 

    let rawTotalPrice = document.getElementById("total-price").textContent;
    let numericTotalPrice = parseFloat(rawTotalPrice.replace(/[^\d.]/g, "")); 

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
      totalPrice: numericTotalPrice
    };

    Swal.fire({
      title: "Confirm Booking?",
      text: "Are you sure you want to confirm your booking?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const user = auth.currentUser;

          if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, { tickets: arrayUnion(ticketData) });

            localStorage.setItem(
              `passengerData-${user.uid}`,
              JSON.stringify(ticketData)
            );

            Swal.fire(
              "Booking Confirmed!",
              "Your ticket details have been successfully saved.",
              "success"
            ).then(() => {
              window.location.href = "ticket.html"; 
            });
          } else {
            Swal.fire(
              "Not Logged In!",
              "Please log in to save your booking details.",
              "error"
            );
          }
        } catch (error) {
          console.error("Error saving to Firestore:", error);
          Swal.fire("Error!", "An error occurred while saving your booking details.", "error");
        }
      }
    });
  });
});

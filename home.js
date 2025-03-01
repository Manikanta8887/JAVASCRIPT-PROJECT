import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
      avatarImg.src = savedImage || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";

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
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E4B7A0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have successfully logged out.",
              icon: "success",
              confirmButtonColor: "#E4B7A0",
            }).then(() => {
              window.location.href = "index.html";
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: `Failed to log out: ${error.message}`,
              icon: "error",
              confirmButtonColor: "#E4B7A0",
            });
          });
      }
    });
  });

  // Store travel data in Firestore
  const storeTravelData = async () => {
    const Travels = [
      { id: 1, title: "Flight", category: "Travel", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221092/flights_swubo7.jpg" },
      { id: 2, title: "Train", category: "Travel", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221116/Train11_xrvgik.jpg" },
      { id: 3, title: "Bus", category: "Travel", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221088/bus_ljyvjs.jpg" },
      { id: 4, title: "Car", category: "Travel", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221089/car_rpvnht.avif" },
      { id: 5, title: "Auto", category: "Travel", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221079/a_obsnpj.avif" },
      { id: 6, title: "Bike", category: "Travel", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221103/Gt_gh8zzm.jpg" },
    ];

    try {
      for (const travel of Travels) {
        const travelRef = doc(db, "travels", travel.id.toString());
        await setDoc(travelRef, travel);
      }
      console.log("Travel data stored successfully!");
    } catch (error) {
      console.error("Error storing travel data:", error);
    }
  };

  const fetchAndDisplayTravelCards = async () => {
    const travelContainer = document.querySelector(".Travelling");
    try {
      const travelCollection = collection(db, "travels");
      const travelSnapshot = await getDocs(travelCollection);

      travelSnapshot.forEach((doc) => {
        const travel = doc.data();
        const travelCard = `
          <div class="Travel">
            <div class="discount">${travel.title}</div>
            <img src="${travel.image}" alt="${travel.title}" />
            <button class="booknow" onclick="window.location.href='book.html?id=${travel.id}&title=${encodeURIComponent(travel.title)}'">
              BOOK NOW
            </button>
          </div>
        `;
        travelContainer.innerHTML += travelCard;
      });

      console.log("Travel cards displayed successfully!");
    } catch (error) {
      console.error("Error fetching travel data:", error);
    }
  };

  storeTravelData(); 
  fetchAndDisplayTravelCards();
});


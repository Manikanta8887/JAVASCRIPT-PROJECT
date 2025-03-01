import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsHUK_YSuffz8cnW7zwbVvvGoF1TZu_2U",
  authDomain: "manikanta-travels-f5ff5.firebaseapp.com",
  projectId: "manikanta-travels-f5ff5",
  storageBucket: "manikanta-travels-f5ff5.firebaseapp.com",
  messagingSenderId: "331354051565",
  appId: "1:331354051565:web:ee5dc2ceef38966acd8de4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const params = new URLSearchParams(window.location.search);
const packageId = params.get("id");

const packageDetailsDiv = document.getElementById("package-details");
db.collection("Packages")
  .doc(packageId)
  .get()
  .then((doc) => {
    if (doc.exists) {
      const selectedPackage = doc.data();

      packageDetailsDiv.innerHTML = `
        <div class="goback">
          <a href="./packages.html"><button>GO BACK</button></a>
          <a href="./gallery.html"><button>GALLERY</button></a>
        </div>
        <h1>${selectedPackage.title}</h1>
        <img src="${selectedPackage.image}" alt="${selectedPackage.title}" width="100%" height="350px" />
        <div class="seemorediv">
          <div class="video-container">
            <video width="50%" height="500" class="rotated-video" controls>
              <source src="${selectedPackage.video}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="video-container">
            <video width="50%" height="500" class="rotated-video" controls>
              <source src="${selectedPackage.video1}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div id="more-info">
          <h1>TO KNOW MORE VISIT GALLERY</h1>
          <a href="./gallery.html"><button>GALLERY</button></a>
        </div>
      `;
    } else {
      packageDetailsDiv.innerHTML = `<h1>Package not found!</h1>`;
    }
  })
  .catch((error) => {
    console.error("Error fetching package:", error);
    packageDetailsDiv.innerHTML = `<h1>Error loading package details.</h1>`;
  });

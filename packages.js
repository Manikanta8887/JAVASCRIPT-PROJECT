import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { 
  getFirestore, doc, setDoc, getDoc, updateDoc, collection, getDocs, onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import "https://cdn.jsdelivr.net/npm/sweetalert2@11";

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
const db = getFirestore(app);

const packages = [
        { id: 1, title: "Godavari", price: 2999, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221114/Pushkar_Ghat_hgswig.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221117/Train_hzlped.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208533/TOUR_t57poa.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208038/godavari4_dhgkhv.mp4", person: 1 },
        { id: 2, title: "Konaseema", price: 2499, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221105/Konaseema_kue3vp.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221118/Train22_pnrueb.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740220253/Nature_gtnhep.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740220253/Nature_gtnhep.mp4", person: 1 },
        { id: 3, title: "Tirumala", price: 6000, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221115/Tirumala_yjsz0b.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221118/Train33_cyyab3.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208141/Tirumala_klrjtp.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208141/TirumalaNature_lsepru.mp4", person: 1 },
        { id: 4, title: "Annavaram", price: 4000, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221079/Annavaram_p3roi9.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221118/Train22_pnrueb.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208173/TIRUMALATIRUPATI_l5y00v.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208165/SANKRANTHI_rksb0e.mp4", person: 1 },
        { id: 5, title: "Araku", price: 4999, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221079/Araku2_s22i0q.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221116/Train11_xrvgik.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208533/TOUR_t57poa.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208729/Tour3_qrmh09.mp4", person: 1 },
        { id: 6, title: "Maredumilli", price: 3500, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221114/Maredumilli_jrjsd7.webp", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221118/Train22_pnrueb.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208033/Maredumilli_hjw227.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208760/Maredumilli1_ylyjpg.mp4", person: 1 },
        { id: 7, title: "Lambasingi", price: 4599, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221109/Lambasingi_fk5piy.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221118/Train33_cyyab3.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208105/Nature5_jajbnl.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208105/Nature5_jajbnl.mp4", person: 1 },
        { id: 8, title: "Vanajangi", price: 4499, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221122/Vanajangi_k5z0rz.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221118/Train22_pnrueb.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208042/Nature2_zflo2b.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208069/Nature4_kook3j.mp4", person: 1 },
        { id: 9, title: "Gudisa", price: 3499, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221103/Gudisa_uoqr8t.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221116/Train11_xrvgik.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740209199/Village_ceh8dt.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740220237/Nature1_w30wf7.mp4", person: 1 },
        { id: 90, title: "Rampachodavaram", price: 1999, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221114/Rampachodavaram_pwvbjf.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221118/Train22_pnrueb.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208033/Maredumilli_hjw227.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208760/Maredumilli1_ylyjpg.mp4", person: 1 },
        { id: 91, title: "Vizag", price: 3499, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221127/Vizag_p2yrqe.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221118/Train33_cyyab3.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740209169/VillageView_bzxvpu.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740209169/VillageView_bzxvpu.mp4", person: 1 },
        { id: 92, title: "Rajahmundry", price: 1999, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221115/Tirumala_yjsz0b.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221117/Train_hzlped.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208103/Rajahmundry5_cpwmsz.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208098/Rajahmundry2_nceded.mp4", person: 1 },
        { id: 93, title: "Bhadrachalam", price: 1999, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221079/Annavaram_p3roi9.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221117/Train_hzlped.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1739878248/rvuh9ezbmgci0u82haom.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1739878248/rvuh9ezbmgci0u82haom.mp4", person: 1 },
        { id: 94, title: "Hyderabad", price: 1999, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221115/Tirumala_yjsz0b.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221117/Train_hzlped.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740207996/Hyderabad_ivojzc.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740207996/Hyderabad_ivojzc.mp4", person: 1 },
        { id: 95, title: "Tamilnadu", price: 1999, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221079/Annavaram_p3roi9.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221117/Train_hzlped.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208134/Tamilnadu_dvnqki.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208077/Pamban1_lvhzh6.mp4", person: 1 },
        { id: 96, title: "kerala", price: 1999, category: "TOUR", image: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221079/Annavaram_p3roi9.jpg", image1: "https://res.cloudinary.com/dno3iyo9k/image/upload/v1740221117/Train_hzlped.jpg", video: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740207983/KeralaLocation_ixzpam.mp4", video1: "https://res.cloudinary.com/dno3iyo9k/video/upload/v1740208016/KeralaNature_wwmbfo.mp4", person: 1 },
      ];

const storePackagesInFirestore = async () => {
  try {
    for (const pkg of packages) {
      const packageRef = doc(db, "packages", pkg.id.toString());
      await setDoc(packageRef, pkg, { merge: true });
      console.log(`Package with ID ${pkg.id} updated/stored successfully.`);
    }
  } catch (error) {
    console.error("Error storing packages in Firestore:", error);
  }
};

storePackagesInFirestore();

let data = document.getElementById("Travelling");

const fetchPackagesFromFirestore = () => {
  onSnapshot(collection(db, "packages"), (querySnapshot) => {
    data.innerHTML = ""; 
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
  });
};

fetchPackagesFromFirestore();

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
          window.location.href = "index.html";
        });
      } catch (error) {
        console.error("Error signing out: ", error);
        Swal.fire("Error!", "An error occurred while logging out.", "error");
      }
    }
  });
});

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
          await setDoc(doc(db, "tickets", user.uid), ticketData);
          Swal.fire("Booking Confirmed!", "Your booking has been successfully confirmed.", "success");
        } else {
          Swal.fire("Error!", "You need to log in first.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "There was an issue with your booking.", "error");
      }
    }
  });
});

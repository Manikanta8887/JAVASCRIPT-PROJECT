import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
        document.getElementById("username").innerText = userData.fullName || "Unknown"; 
        document.getElementById("useremail").innerText = userData.email || "No email available"; 
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
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            Swal.fire("Logged Out!", "You have been successfully logged out.", "success").then(() => {
              window.location.href = "index.html"; 
            });
          })
          .catch((error) => {
            Swal.fire("Error!", "An error occurred while signing out: " + error.message, "error");
          });
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('.submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      Swal.fire("Warning!", "Please fill in all fields before submitting.", "warning");
      return;
    }

    const formattedMessage = encodeURIComponent(
      `Hello! My name is ${name}.
      I have a ${subject}.
      Email: ${email}
      Message: ${message}`
    );

    const whatsappNumber = '919866554339'; 
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${formattedMessage}`;
    Swal.fire({
      title: "Sending Message",
      text: "Do you want to proceed to WhatsApp?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, send it!",
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(whatsappUrl, '_blank');
        Swal.fire("Success!", "Your message has been sent!", "success");
        form.reset();
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const ceoDescription = document.querySelector(".ceo-description");
  ceoDescription.style.opacity = "1";
});

let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;

  if (index >= totalSlides) currentSlide = 0;
  else if (index < 0) currentSlide = totalSlides - 1;
  else currentSlide = index;

  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

setInterval(() => {
  showSlide(currentSlide + 1);
}, 5000);

document.addEventListener("DOMContentLoaded", () => {
  const reviewCards = document.querySelectorAll(".review-card");

  reviewCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = 1;
    }, index * 300);
  });
});

const scrollRevealOption = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", { ...scrollRevealOption, origin: "right" });
ScrollReveal().reveal(".header__content p", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".header__content h1", { ...scrollRevealOption, delay: 1000 });
ScrollReveal().reveal(".header__btns", { ...scrollRevealOption, delay: 1500 });
ScrollReveal().reveal(".destination__card", { ...scrollRevealOption, interval: 500 });
ScrollReveal().reveal(".showcase__image img", { ...scrollRevealOption, origin: "left" });
ScrollReveal().reveal(".showcase__content h4", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".showcase__content p", { ...scrollRevealOption, delay: 1000 });
ScrollReveal().reveal(".showcase__btn", { ...scrollRevealOption, delay: 1500 });
ScrollReveal().reveal(".banner__card", { ...scrollRevealOption, interval: 500 });
ScrollReveal().reveal(".discover__card", { ...scrollRevealOption, interval: 500 });

const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
});

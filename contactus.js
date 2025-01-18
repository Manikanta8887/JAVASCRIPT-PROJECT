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

// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('contactForm');
//   const submitBtn = form.querySelector('.submit-btn');

//   form.addEventListener('submit', async (e) => {
//       e.preventDefault();

//       // Get form values
//       const name = document.getElementById('name').value.trim();
//       const email = document.getElementById('email').value.trim();
//       const subject = document.getElementById('subject').value.trim();
//       const message = document.getElementById('message').value.trim();

//       // Validate if all fields are filled
//       if (!name || !email || !subject || !message) {
//           alert("Please fill in all fields.");
//           return;
//       }

//       // Manually clean up the message
//       let formattedMessage = `Hello! My name is ${name}.%0D%0A%0D%0AI have a ${subject}.%0D%0A%0D%0AEmail: ${email}%0D%0A%0D%0AMessage: ${message}`;

//       // Replace any invisible characters (like non-breaking spaces) with standard spaces
//       formattedMessage = formattedMessage.replace(/\u200B/g, ''); // Zero-width space
//       formattedMessage = formattedMessage.replace(/\s+/g, ' ');  // Multiple spaces into single space

//       // URL encode the message
//       const encodedMessage = encodeURIComponent(formattedMessage);

//       // WhatsApp number (replace with your number including country code)
//       const whatsappNumber = '919866554339'; // Replace this with your number

//       // Construct the WhatsApp URL with the encoded message
//       const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

//       // Open WhatsApp with the encoded message
//       window.open(whatsappUrl, '_blank');

//       // Add success animation
//       submitBtn.classList.add('success');

//       // Simulate form submission
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       // Reset form and button
//       form.reset();
//       submitBtn.classList.remove('success');

//       // Show success message (toast)
//       const toast = document.createElement('div');
//       toast.textContent = 'Your message has been sent successfully!';
//       toast.classList.add('toast');
//       document.body.appendChild(toast);

//       setTimeout(() => {
//           toast.remove();
//       }, 3000);
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const ceoDescription = document.querySelector(".ceo-description");
//   ceoDescription.style.opacity = "1";
// });


// let currentSlide = 0;

// function showSlide(index) {
//   const slides = document.querySelectorAll('.carousel-slide');
//   const totalSlides = slides.length;

//   // Ensure the index is within bounds
//   if (index >= totalSlides) currentSlide = 0;
//   else if (index < 0) currentSlide = totalSlides - 1;
//   else currentSlide = index;

//   const carouselContainer = document.querySelector('.carousel-container');
//   carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
// }

// // Auto slide every 3 seconds
// setInterval(() => {
//   showSlide(currentSlide + 1);
// }, 5000);

// // Script for additional animations or functionalities
// document.addEventListener("DOMContentLoaded", () => {
//   const reviewCards = document.querySelectorAll(".review-card");
  
//   reviewCards.forEach((card, index) => {
//     setTimeout(() => {
//       card.style.opacity = 1;
//     }, index * 300); // Stagger the fade-in effect
//   });
// });


// //  Extra code 


// const scrollRevealOption = {
//   origin: "bottom",
//   distance: "50px",
//   duration: 1000,
// };

// ScrollReveal().reveal(".header__image img", {
//   ...scrollRevealOption,
//   origin: "right",
// });
// ScrollReveal().reveal(".header__content p", {
//   ...scrollRevealOption,
//   delay: 500,
// });
// ScrollReveal().reveal(".header__content h1", {
//   ...scrollRevealOption,
//   delay: 1000,
// });
// ScrollReveal().reveal(".header__btns", {
//   ...scrollRevealOption,
//   delay: 1500,
// });

// ScrollReveal().reveal(".destination__card", {
//   ...scrollRevealOption,
//   interval: 500,
// });

// ScrollReveal().reveal(".showcase__image img", {
//   ...scrollRevealOption,
//   origin: "left",
// });
// ScrollReveal().reveal(".showcase__content h4", {
//   ...scrollRevealOption,
//   delay: 500,
// });
// ScrollReveal().reveal(".showcase__content p", {
//   ...scrollRevealOption,
//   delay: 1000,
// });
// ScrollReveal().reveal(".showcase__btn", {
//   ...scrollRevealOption,
//   delay: 1500,
// });

// ScrollReveal().reveal(".banner__card", {
//   ...scrollRevealOption,
//   interval: 500,
// });

// ScrollReveal().reveal(".discover__card", {
//   ...scrollRevealOption,
//   interval: 500,
// });

// const swiper = new Swiper(".swiper", {
//   slidesPerView: 3,
//   spaceBetween: 20,
//   loop: true,
// });

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const db = getFirestore(); // Initialize Firestore

document.addEventListener('DOMContentLoaded', () => {
  const avatarImg = document.getElementById('userAvatar');
  const imageInput = document.getElementById('imageUpload');
  const uploadAvatar = document.getElementById('uploadAvatar');

  // Initialize Avatar based on user's email from localStorage
  const initializeUserAvatar = () => {
    const user = auth.currentUser;
    if (user) {
      const userEmail = user.email;
      const savedImage = localStorage.getItem(`userAvatar_${userEmail}`);
      avatarImg.src = savedImage || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";

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
        document.getElementById("username").innerText = userData.fullName || "Unknown"; // Update name
        document.getElementById("useremail").innerText = userData.email || "No email available"; // Update email
      } else {
        console.error("No user data found!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Trigger File Input on Upload Avatar Click
  uploadAvatar.addEventListener('click', () => {
    imageInput.click();
  });

  // Handle Image Upload with Resizing
  imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
      }

      // Resize the image before saving it
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

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
            alert('Avatar updated successfully!');
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
              window.location.href = "index.html"; // Redirect to login or homepage
            });
          })
          .catch((error) => {
            Swal.fire("Error!", "An error occurred while signing out: " + error.message, "error");
          });
      }
    });
  });
});

// Contact form with SweetAlert for submit confirmation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('.submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate if all fields are filled
    if (!name || !email || !subject || !message) {
      Swal.fire("Warning!", "Please fill in all fields before submitting.", "warning");
      return;
    }

    // URL encode the message
    const formattedMessage = encodeURIComponent(
      `Hello! My name is ${name}.
      I have a ${subject}.
      Email: ${email}
      Message: ${message}`
    );

    const whatsappNumber = '919866554339'; // Replace with your number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${formattedMessage}`;

    // Open WhatsApp with the encoded message
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

// Remaining functionality for animations and carousels
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

// Auto slide every 5 seconds
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

// ScrollReveal animations
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

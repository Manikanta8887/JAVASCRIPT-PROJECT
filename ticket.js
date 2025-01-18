// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAsHUK_YSuffz8cnW7zwbVvvGoF1TZu_2U",
//   authDomain: "manikanta-travels-f5ff5.firebaseapp.com",
//   projectId: "manikanta-travels-f5ff5",
//   storageBucket: "manikanta-travels-f5ff5.firebasestorage.app",
//   messagingSenderId: "331354051565",
//   appId: "1:331354051565:web:ee5dc2ceef38966acd8de4"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const db = getFirestore();

// document.addEventListener("DOMContentLoaded", function () {
//   const ticketContainer = document.getElementById("ticketDetails");

//   onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       try {
//         const userDocRef = doc(db, "users", user.uid);
//         const userDoc = await getDoc(userDocRef);

//         if (userDoc.exists()) {
//           const userData = userDoc.data();
//           const tickets = userData.tickets || [];

//           if (tickets.length > 0) {
//             const latestTicket = tickets[tickets.length - 1];

//             ticketContainer.innerHTML = `
//               <div class="ticket-card">
//                 <h2>Latest Ticket Details</h2>
//                 <p><strong>Full Name:</strong> ${latestTicket.fullName}</p>
//                 <p><strong>Email:</strong> ${latestTicket.email}</p>
//                 <p><strong>Phone:</strong> ${latestTicket.phone}</p>
//                 <p><strong>Date of Birth:</strong> ${latestTicket.dob}</p>
//                 <p><strong>Passport Number:</strong> ${latestTicket.passport}</p>
//                 <p><strong>Departure Date:</strong> ${latestTicket.departureDate}</p>
//                 <p><strong>Destination:</strong> ${latestTicket.destination}</p>
//                 <p><strong>Total Passengers:</strong> ${latestTicket.totalPassengers}</p>
//                 <p><strong>Total Price:</strong> ₹${latestTicket.totalPrice.toFixed(2)}</p>
//                 <p><strong>Discounted Price:</strong> ₹${latestTicket.discountedPrice.toFixed(2)}</p>
//               </div>
//               <button id="printTicket" class="print-button">Print Ticket</button>
//             `;

//             // Add print functionality
//             document.getElementById("printTicket").addEventListener("click", () => {
//               window.print();
//             });
//           } else {
//             ticketContainer.innerHTML = `
//               <p>No tickets found. Please book a ticket to view its details.</p>
//             `;
//           }
//         } else {
//           ticketContainer.innerHTML = `
//             <p>No user data found. Please log in and book a ticket to view its details.</p>
//           `;
//         }
//       } catch (error) {
//         console.error("Error fetching ticket details:", error);
//         ticketContainer.innerHTML = `
//           <p>An error occurred while fetching ticket details. Please try again later.</p>
//         `;
//       }
//     } else {
//       ticketContainer.innerHTML = `
//         <p>Please log in to view your latest ticket details.</p>
//       `;
//     }
//   });
// });

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsHUK_YSuffz8cnW7zwbVvvGoF1TZu_2U",
  authDomain: "manikanta-travels-f5ff5.firebaseapp.com",
  projectId: "manikanta-travels-f5ff5",
  storageBucket: "manikanta-travels-f5ff5.firebasestorage.app",
  messagingSenderId: "331354051565",
  appId: "1:331354051565:web:ee5dc2ceef38966acd8de4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

document.addEventListener("DOMContentLoaded", function () {
  const ticketContainer = document.getElementById("ticketDetails");

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const tickets = userData.tickets || [];

          if (tickets.length > 0) {
            let latestTicket = tickets[tickets.length - 1];

            // Assign default values if travelId or travelTitle are not available
            latestTicket.travelId = latestTicket.travelId || 1;
            latestTicket.travelTitle = latestTicket.travelTitle || 1;

            ticketContainer.innerHTML = `
              <div class="ticket-card">
                <h2>Ticket Details</h2>
                <p><strong>Travel Title:</strong> ${latestTicket.travelTitle}</p>
                <p><strong>Travel ID:</strong> ${latestTicket.travelId}</p>
                <p><strong>Arrival Point:</strong> ${latestTicket.arrivalPoint}</p>
                <p><strong>Destination Point:</strong> ${latestTicket.destinationPoint}</p>
                <p><strong>Full Name:</strong> ${latestTicket.fullName}</p>
                <p><strong>Email:</strong> ${latestTicket.email}</p>
                <p><strong>Phone:</strong> ${latestTicket.phone}</p>
                <p><strong>Date of Birth:</strong> ${latestTicket.dob}</p>
                <p><strong>Aadhaar Number:</strong> ${latestTicket.Aadhaar}</p>
                <p><strong>Departure Date:</strong> ${latestTicket.departureDate}</p>
                <p><strong>Total Price:</strong> ₹${latestTicket.totalPrice.toFixed(2)}</p>
              </div>
              <button id="printTicket" class="print-button">Print Ticket</button>
               <div class="button-container">
      <button onclick="window.location.href='packages.html'">Back to Packages</button>
    </div>
            `;

            // Add print functionality
            document.getElementById("printTicket").addEventListener("click", () => {
              window.print();
            });
          } else {
            ticketContainer.innerHTML = `
              <p>No tickets found. Please book a ticket to view its details.</p>
            `;
          }
        } else {
          ticketContainer.innerHTML = `
            <p>No user data found. Please log in and book a ticket to view its details.</p>
          `;
        }
      } catch (error) {
        console.error("Error fetching ticket details:", error);
        ticketContainer.innerHTML = `
          <p>An error occurred while fetching ticket details. Please try again later.</p>
        `;
      }
    } else {
      ticketContainer.innerHTML = `
        <p>Please log in to view your latest ticket details.</p>
      `;
    }
  });
});

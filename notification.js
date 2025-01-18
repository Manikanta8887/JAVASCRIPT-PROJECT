// // Import Firebase Modules
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

// document.addEventListener("DOMContentLoaded", () => {
//   const notificationsContainer = document.getElementById("notifications");

//   if (!notificationsContainer) {
//     console.error("Notifications container not found.");
//     return;
//   }

//   onAuthStateChanged(auth, async (user) => {
//     if (!user) {
//       notificationsContainer.innerHTML = "<p>Please log in to view your tickets.</p>";
//       return;
//     }

//     try {
//       const userDocRef = doc(db, "users", user.uid);
//       const userDoc = await getDoc(userDocRef);

//       if (!userDoc.exists()) {
//         notificationsContainer.innerHTML = "<p>No tickets found. Start booking now!</p>";
//         return;
//       }

//       const tickets = userDoc.data().tickets || [];

//       if (tickets.length === 0) {
//         notificationsContainer.innerHTML = "<p>No tickets found. Start booking now!</p>";
//         return;
//       }

//       // Separate active and expired tickets
//       const activeTickets = [];
//       const expiredTickets = [];

//       tickets.forEach((ticket) => {
//         const departureDate = new Date(ticket.departureDate);
//         const isExpired = departureDate < new Date();

//         if (isExpired) {
//           expiredTickets.push(ticket);
//         } else {
//           activeTickets.push(ticket);
//         }
//       });

//       notificationsContainer.innerHTML = "";

//       // Function to render tickets
//       function renderTickets(ticketList, status) {
//         ticketList.forEach((ticket) => {
//           const departureDate = new Date(ticket.departureDate);
//           const ticketCard = document.createElement("div");
//           ticketCard.className = `ticket-card ${status}`;
//           ticketCard.innerHTML = `
//             <img src="./images/Train.jpeg" alt="Ticket Banner">
//             <div class="ticket-details">
//             <h2>Ticket for ${ticket.destination}</h2>
//             <h3>Ticket ${ticket.travelTitle}</h3>
//             <p><strong>Travel Id:</strong> ${ticket.travelId}</p>
//             <p><strong>Full Name:</strong> ${ticket.fullName}</p>
//             <p><strong>Email:</strong> ${ticket.email}</p>
//             <p><strong>Phone:</strong> ${ticket.phone}</p>
//             <p><strong>Date of Birth:</strong> ${ticket.dob}</p>
//             <p><strong>Passport Number:</strong> ${ticket.Aadhaar}</p>
//             <p><strong>Departure Date:</strong> ${departureDate.toDateString()}</p>
//             <p><strong>Number of Passengers:</strong> ${ticket.totalPassengers}</p>
//             <p><strong>Total Price:</strong> ₹${ticket.totalPrice.toFixed(2)}</p>
//             <p><strong>Discounted Price:</strong> ₹${ticket.discountedPrice.toFixed(2)}</p>
//             <div class="ticket-actions"></div>
//             </div>
//           `;

//           const printButton = document.createElement("button");
//           printButton.textContent = "Print Ticket";
//           printButton.addEventListener("click", () => printTicket(ticket));

//           const downloadButton = document.createElement("button");
//           downloadButton.textContent = "Download Ticket";
//           downloadButton.addEventListener("click", () => downloadTicket(ticket));

//           ticketCard.querySelector(".ticket-actions").appendChild(printButton);
//           ticketCard.querySelector(".ticket-actions").appendChild(downloadButton);

//           notificationsContainer.appendChild(ticketCard);
//         });
//       }

//       // Render active tickets first
//       renderTickets(activeTickets, "active");

//       // Render expired tickets below active tickets
//       renderTickets(expiredTickets, "expired");

//     } catch (error) {
//       notificationsContainer.innerHTML = "<p>Error loading tickets. Please try again.</p>";
//     }
//   });
// });

// // Print Ticket Function
// function printTicket(ticket) {
//   const printContent = `
//     <html>
//       <head><title>Print Ticket</title></head>
//       <body>
//         <div>
//           <h2>Ticket for ${ticket.destination}</h2>
//           <p><strong>Full Name:</strong> ${ticket.fullName}</p>
//           <p><strong>Email:</strong> ${ticket.email}</p>
//           <p><strong>Phone:</strong> ${ticket.phone}</p>
//           <p><strong>Date of Birth:</strong> ${ticket.dob}</p>
//           <p><strong>Passport Number:</strong> ${ticket.passport}</p>
//           <p><strong>Departure Date:</strong> ${ticket.departureDate}</p>
//           <p><strong>Number of Passengers:</strong> ${ticket.totalPassengers}</p>
//           <p><strong>Total Price:</strong> ₹${ticket.totalPrice.toFixed(2)}</p>
//           <p><strong>Discounted Price:</strong> ₹${ticket.discountedPrice.toFixed(2)}</p>
//         </div>
//       </body>
//     </html>
//   `;
//   const printWindow = window.open('', '_blank', 'width=800,height=600');
//   printWindow.document.write(printContent);
//   printWindow.document.close();
//   printWindow.print();
// }

// // Download Ticket Function
// function downloadTicket(ticket) {
//   const { jsPDF } = window.jspdf;
//   const doc = new jsPDF();
//   doc.text(`Ticket for ${ticket.destination}`, 10, 10);
//   doc.text(`Full Name: ${ticket.fullName}`, 10, 20);
//   doc.text(`Email: ${ticket.email}`, 10, 30);
//   doc.text(`Phone: ${ticket.phone}`, 10, 40);
//   doc.text(`Date of Birth: ${ticket.dob}`, 10, 50);
//   doc.text(`Passport Number: ${ticket.passport}`, 10, 60);
//   doc.text(`Departure Date: ${ticket.departureDate}`, 10, 70);
//   doc.text(`Number of Passengers: ${ticket.totalPassengers}`, 10, 80);
//   doc.text(`Total Price: ₹${ticket.totalPrice.toFixed(2)}`, 10, 90);
//   doc.text(`Discounted Price: ₹${ticket.discountedPrice.toFixed(2)}`, 10, 100);
//   doc.save(`ticket_${ticket.destination}_${ticket.departureDate}.pdf`);
// }


// Import Firebase Modules
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

// document.addEventListener("DOMContentLoaded", () => {
//   const notificationsContainer = document.getElementById("notifications");

//   if (!notificationsContainer) {
//     console.error("Notifications container not found.");
//     return;
//   }

//   onAuthStateChanged(auth, async (user) => {
//     if (!user) {
//       notificationsContainer.innerHTML = "<p>Please log in to view your tickets.</p>";
//       return;
//     }

//     try {
//       const userDocRef = doc(db, "users", user.uid);
//       const userDoc = await getDoc(userDocRef);

//       if (!userDoc.exists()) {
//         notificationsContainer.innerHTML = "<p>No tickets found. Start booking now!</p>";
//         return;
//       }

//       const tickets = userDoc.data().tickets || [];

//       if (tickets.length === 0) {
//         notificationsContainer.innerHTML = "<p>No tickets found. Start booking now!</p>";
//         return;
//       }

//       // Separate active and expired tickets
//       const activeTickets = [];
//       const expiredTickets = [];

//       tickets.forEach((ticket) => {
//         const departureDate = new Date(ticket.departureDate);
//         const isExpired = departureDate < new Date();

//         if (isExpired) {
//           expiredTickets.push(ticket);
//         } else {
//           activeTickets.push(ticket);
//         }
//       });

//       notificationsContainer.innerHTML = "";

//       // Function to render tickets
//       function renderTickets(ticketList, status) {
//         ticketList.forEach((ticket) => {
//           const departureDate = new Date(ticket.departureDate);
//           const ticketCard = document.createElement("div");
//           ticketCard.className = `ticket-card ${status}`;

//           // Check if it's a long-term ticket or tour package ticket
//           const isTourPackage = ticket.arrivalPoint && ticket.destinationPoint;

//           const totalPrice = ticket.totalPrice ? ticket.totalPrice.toFixed(2) : "0.00"; // Safe default value for totalPrice
//           const discountedPrice = ticket.discountedPrice ? ticket.discountedPrice.toFixed(2) : "0.00"; // Safe default value for discountedPrice

//           ticketCard.innerHTML = `
//             <img src="./images/Train.jpeg" alt="Ticket Banner">
//             <div class="ticket-details">
//               <h2>Ticket to ${isTourPackage ? ticket.destinationPoint : ticket.destination}</h2>
//               <h3>Ticket ${ticket.travelTitle}</h3>
//               <p><strong>Travel Id:</strong> ${ticket.travelId}</p>
//               <p><strong>Full Name:</strong> ${ticket.fullName}</p>
//               <p><strong>Email:</strong> ${ticket.email}</p>
//               <p><strong>Phone:</strong> ${ticket.phone}</p>
//               <p><strong>Date of Birth:</strong> ${ticket.dob}</p>
//               <p><strong>Passport Number:</strong> ${ticket.Aadhaar}</p>
//               <p><strong>Departure Date:</strong> ${departureDate.toDateString()}</p>
//               <p><strong>Number of Passengers:</strong> ${ticket.totalPassengers}</p>
//               <p><strong>Total Price:</strong> ₹${totalPrice}</p>
//               <p><strong>Discounted Price:</strong> ₹${discountedPrice}</p>
//               ${isTourPackage ? `
//                 <p><strong>Arrival Point:</strong> ${ticket.arrivalPoint}</p>
//                 <p><strong>Destination Point:</strong> ${ticket.destinationPoint}</p>
//               ` : ""}
//               <div class="ticket-actions"></div>
//             </div>
//           `;

//           const printButton = document.createElement("button");
//           printButton.textContent = "Print Ticket";
//           printButton.addEventListener("click", () => printTicket(ticket));

//           const downloadButton = document.createElement("button");
//           downloadButton.textContent = "Download Ticket";
//           downloadButton.addEventListener("click", () => downloadTicket(ticket));

//           ticketCard.querySelector(".ticket-actions").appendChild(printButton);
//           ticketCard.querySelector(".ticket-actions").appendChild(downloadButton);

//           notificationsContainer.appendChild(ticketCard);
//         });
//       }

//       // Render active tickets first
//       renderTickets(activeTickets, "active");

//       // Render expired tickets below active tickets
//       renderTickets(expiredTickets, "expired");

//     } catch (error) {
//       notificationsContainer.innerHTML = "<p>Error loading tickets. Please try again.</p>";
//       console.error("Error fetching tickets:", error);
//     }
//   });
// });

// // Print Ticket Function
// function printTicket(ticket) {
//   const printContent = `
//     <html>
//       <head><title>Print Ticket</title></head>
//       <body>
//         <div>
//           <h2>Ticket to ${ticket.destination}</h2>
//           <p><strong>Full Name:</strong> ${ticket.fullName}</p>
//           <p><strong>Email:</strong> ${ticket.email}</p>
//           <p><strong>Phone:</strong> ${ticket.phone}</p>
//           <p><strong>Date of Birth:</strong> ${ticket.dob}</p>
//           <p><strong>Passport Number:</strong> ${ticket.passport}</p>
//           <p><strong>Departure Date:</strong> ${ticket.departureDate}</p>
//           <p><strong>Number of Passengers:</strong> ${ticket.totalPassengers}</p>
//           <p><strong>Total Price:</strong> ₹${ticket.totalPrice.toFixed(2)}</p>
//           <p><strong>Discounted Price:</strong> ₹${ticket.discountedPrice.toFixed(2)}</p>
//         </div>
//       </body>
//     </html>
//   `;
//   const printWindow = window.open('', '_blank', 'width=800,height=600');
//   printWindow.document.write(printContent);
//   printWindow.document.close();
//   printWindow.print();
// }

// // Download Ticket Function
// function downloadTicket(ticket) {
//   const { jsPDF } = window.jspdf;
//   const doc = new jsPDF();
//   doc.text(`Ticket to ${ticket.destination}`, 10, 10);
//   doc.text(`Full Name: ${ticket.fullName}`, 10, 20);
//   doc.text(`Email: ${ticket.email}`, 10, 30);
//   doc.text(`Phone: ${ticket.phone}`, 10, 40);
//   doc.text(`Date of Birth: ${ticket.dob}`, 10, 50);
//   doc.text(`Passport Number: ${ticket.Aadhaar}`, 10, 60);
//   doc.text(`Departure Date: ${ticket.departureDate}`, 10, 70);
//   doc.text(`Number of Passengers: ${ticket.totalPassengers}`, 10, 80);
//   doc.text(`Total Price: ₹${ticket.totalPrice.toFixed(2)}`, 10, 90);
//   doc.text(`Discounted Price: ₹${ticket.discountedPrice.toFixed(2)}`, 10, 100);
//   if (ticket.arrivalPoint) {
//     doc.text(`Arrival Point: ${ticket.arrivalPoint}`, 10, 110);
//     doc.text(`Destination Point: ${ticket.destinationPoint}`, 10, 120);
//   }
//   doc.save(`ticket_${ticket.travelTitle}_${ticket.departureDate}.pdf`);
// }


// Import Firebase Modules
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

document.addEventListener("DOMContentLoaded", () => {
  const notificationsContainer = document.getElementById("notifications");

  if (!notificationsContainer) {
    console.error("Notifications container not found.");
    return;
  }

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      notificationsContainer.innerHTML = "<p>Please log in to view your tickets.</p>";
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        notificationsContainer.innerHTML = "<p>No tickets found. Start booking now!</p>";
        return;
      }

      const tickets = userDoc.data().tickets || [];

      if (tickets.length === 0) {
        notificationsContainer.innerHTML = "<p>No tickets found. Start booking now!</p>";
        return;
      }

      // Separate active and expired tickets
      const activeTickets = [];
      const expiredTickets = [];

      tickets.forEach((ticket) => {
        const departureDate = new Date(ticket.departureDate);
        const isExpired = departureDate < new Date();

        if (isExpired) {
          expiredTickets.push(ticket);
        } else {
          activeTickets.push(ticket);
        }
      });

      notificationsContainer.innerHTML = "";

      // Function to render tickets
      function renderTickets(ticketList, status) {
        ticketList.forEach((ticket) => {
          const departureDate = new Date(ticket.departureDate);
          const ticketCard = document.createElement("div");
          ticketCard.className = `ticket-card ${status}`;

          // Check if it's a tour package ticket or a long-term ticket
          const isTourPackage = ticket.arrivalPoint && ticket.destinationPoint;

          const totalPrice = ticket.totalPrice ? ticket.totalPrice.toFixed(2) : "0.00"; // Safe default value for totalPrice
          const discountedPrice = ticket.discountedPrice ? ticket.discountedPrice.toFixed(2) : "0.00"; // Safe default value for discountedPrice

          // Create the HTML content for the ticket
          ticketCard.innerHTML = `
            <img src="./images/Train.jpeg" alt="Ticket Banner">
            <div class="ticket-details">
            <div class=ticketsall>
            <div>
              <h2>Ticket To ${isTourPackage ? ticket.destinationPoint : ticket.destination}</h2>
              <h3 style="margin-bottom:20px">Ticket ${ticket.travelTitle}</h3>
              <p><strong>Travel Id:</strong> ${ticket.travelId}</p>
              <p><strong>Full Name:</strong> ${ticket.fullName}</p>
              <p><strong>Email:</strong> ${ticket.email}</p>
              <p><strong>Phone:</strong> ${ticket.phone}</p>
              <p><strong>Date of Birth:</strong> ${ticket.dob}</p>
              <p><strong>Passport Number:</strong> ${ticket.Aadhaar}</p>
              <p><strong>Departure Date:</strong> ${departureDate.toDateString()}</p>
              <p><strong>Number of Passengers:</strong> ${ticket.totalPassengers}</p>
              <p><strong>Total Price:</strong> ₹${totalPrice}</p>
              <p><strong>Discounted Price:</strong> ₹${discountedPrice}</p>
              ${isTourPackage ? `
                <p><strong>Arrival Point:</strong> ${ticket.arrivalPoint}</p>
                <p><strong>Destination Point:</strong> ${ticket.destinationPoint}</p>
              ` : ""}
              </div>
              
              <!-- Ticket Status Section -->
              <div>
              <div class="ticket-status">
                <span class="${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
              </div>
              <div>

              <div class="ticket-actions"></div>
              </div>
            </div>
          `;

          // Add buttons for printing and downloading the ticket
          const printButton = document.createElement("button");
          printButton.textContent = "Print Ticket";
          printButton.addEventListener("click", () => printTicket(ticket));

          const downloadButton = document.createElement("button");
          downloadButton.textContent = "Download Ticket";
          downloadButton.addEventListener("click", () => downloadTicket(ticket));

          ticketCard.querySelector(".ticket-actions").appendChild(printButton);
          ticketCard.querySelector(".ticket-actions").appendChild(downloadButton);

          // Add ticket card to notifications container
          notificationsContainer.appendChild(ticketCard);
        });
      }

      // Render active tickets first
      renderTickets(activeTickets, "active");

      // Render expired tickets below active tickets
      renderTickets(expiredTickets, "expired");

    } catch (error) {
      notificationsContainer.innerHTML = "<p>Error loading tickets. Please try again.</p>";
      console.error("Error fetching tickets:", error);
    }
  });
});

// Print Ticket Function
function printTicket(ticket) {
  const printContent = `
    <html>
      <head><title>Print Ticket</title></head>
      <body>
        <div>
          <h2>Ticket To ${ticket.destination}</h2>
          <p><strong>Full Name:</strong> ${ticket.fullName}</p>
          <p><strong>Email:</strong> ${ticket.email}</p>
          <p><strong>Phone:</strong> ${ticket.phone}</p>
          <p><strong>Date of Birth:</strong> ${ticket.dob}</p>
          <p><strong>Passport Number:</strong> ${ticket.passport}</p>
          <p><strong>Departure Date:</strong> ${ticket.departureDate}</p>
          <p><strong>Number of Passengers:</strong> ${ticket.totalPassengers}</p>
          <p><strong>Total Price:</strong> ₹${ticket.totalPrice.toFixed(2)}</p>
          <p><strong>Discounted Price:</strong> ₹${ticket.discountedPrice.toFixed(2)}</p>
        </div>
      </body>
    </html>
  `;
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.print();
}

// Download Ticket Function
function downloadTicket(ticket) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(`Ticket To ${ticket.destination}`, 10, 10);
  doc.text(`Full Name: ${ticket.fullName}`, 10, 20);
  doc.text(`Email: ${ticket.email}`, 10, 30);
  doc.text(`Phone: ${ticket.phone}`, 10, 40);
  doc.text(`Date of Birth: ${ticket.dob}`, 10, 50);
  doc.text(`Passport Number: ${ticket.Aadhaar}`, 10, 60);
  doc.text(`Departure Date: ${ticket.departureDate}`, 10, 70);
  doc.text(`Number of Passengers: ${ticket.totalPassengers}`, 10, 80);
  doc.text(`Total Price: ₹${ticket.totalPrice.toFixed(2)}`, 10, 90);
  doc.text(`Discounted Price: ₹${ticket.discountedPrice.toFixed(2)}`, 10, 100);
  if (ticket.arrivalPoint) {
    doc.text(`Arrival Point: ${ticket.arrivalPoint}`, 10, 110);
    doc.text(`Destination Point: ${ticket.destinationPoint}`, 10, 120);
  }
  doc.save(`ticket_${ticket.travelTitle}_${ticket.departureDate}.pdf`);
}

// Example CSS styles for active and expired tickets
// const style = document.createElement("style");
// style.innerHTML = `
//   .ticket-card.active {
//     background-color: #d4f8e8;
//     border-left: 5px solid #28a745;
//     display: flex;
//     justify-content: space-between;
//   }

//   .ticket-card.expired {
//     background-color: #f8d7da;
//     border-left: 5px solid #dc3545;
//     display: flex;
//     justify-content: space-between;
//   }

//   .ticket-status {
//     align-self: flex-start;
//     margin-top: 10px;
//     margin-right: 20px;
//   }

//   .ticket-status span.active {
//     color: #28a745;
//     font-weight: bold;
//   }

//   .ticket-status span.expired {
//     color: #dc3545;
//     font-weight: bold;
//   }

//   .ticket-details {
//     padding: 20px;
//     flex: 1;
//   }

//   .ticket-actions {
//     margin-top: 10px;
//   }

//   .ticket-actions button {
//     margin-right: 10px;
//   }
// `;

// Append the styles to the document head
document.head.appendChild(style);
// 
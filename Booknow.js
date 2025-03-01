import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, arrayUnion, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsHUK_YSuffz8cnW7zwbVvvGoF1TZu_2U",
  authDomain: "manikanta-travels-f5ff5.firebaseapp.com",
  projectId: "manikanta-travels-f5ff5",
  storageBucket: "manikanta-travels-f5ff5.firebasestorage.app",
  messagingSenderId: "331354051565",
  appId: "1:331354051565:web:ee5dc2ceef38966acd8de4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

document.addEventListener("DOMContentLoaded", function () {
  const couponCodes = {
    "FIRST TRIP": false, 
    "FAST 10": false,    
    "MANI100": false     
  };

  let appliedCoupons = []; 

  const urlParams = new URLSearchParams(window.location.search);
  const packageId = parseInt(urlParams.get("id"));

  async function fetchPackages() {
    const packagesCollection = collection(db, "packages");
    try {
      const querySnapshot = await getDocs(packagesCollection);
      const packages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return packages;
    } catch (error) {
      console.error("Error fetching packages from Firebase:", error);
      return [];
    }
  }

  fetchPackages().then(packages => {
    const selectedPackage = packages.find(p => p.id === packageId);

    if (selectedPackage) {
      const packageDetails = document.getElementById("packageDetails");
      packageDetails.innerHTML = `
        <div class="Booknow-parentimage">
          <img src="${selectedPackage.image}" alt="${selectedPackage.title}" class="Booknow-image"/>
          <img src="${selectedPackage.image1}" alt="${selectedPackage.title}" class="Booknow-image"/>
        </div>
        <div class="package-details1">
          <h2>${selectedPackage.title}</h2>
          <div class="package-details2">
            <p>Category: ${selectedPackage.category}</p>
            <p>Price: ₹<span id="price">${selectedPackage.price}</span></p>
            <p>Person(s): 
              <button id="decrementBtn">-</button>
              <span id="personCount" class="count">1</span>
              <button id="incrementBtn">+</button>
            </p>
            <p>Total Price: ₹<span id="totalPrice">${selectedPackage.price}</span></p>
            <p id="discountDetails" style="color: blue;"></p>
          </div>
          <p>Discount: 10% </p>
          <div class="coup">
            <p>Coupon Code: </p> 
            <input type="text" id="couponCodeInput" placeholder="Enter coupon code">
            <button id="applyCouponBtn">Apply</button>
          </div>
          <p id="couponMessage" style="color: red;"></p>
        </div>
      `;

      const pricePerPerson = selectedPackage.price;
      let personCount = 1;
      const personCountElement = document.getElementById("personCount");
      const totalPriceElement = document.getElementById("total-price");
      const priceElement = document.getElementById("pricess");
      const totalpricecard = document.getElementById("totalPrice");
      const discountedPriceElement = document.getElementById("discounted-price");
      const incrementBtn = document.getElementById("incrementBtn");
      const decrementBtn = document.getElementById("decrementBtn");
      const applyCouponBtn = document.getElementById("applyCouponBtn");
      const couponCodeInput = document.getElementById("couponCodeInput");
      const couponMessage = document.getElementById("couponMessage");
      const discountDetails = document.getElementById("discountDetails");

      const discountPercentage = 10;
      const couponDiscountPercentage = 5;

      function updatePrices() {
        let totalPrice = personCount * pricePerPerson;
        const discountAmount = (totalPrice * discountPercentage) / 100;
        let discountedPrice = totalPrice - discountAmount;

        let couponDiscountBreakdown = `10% discount: ₹${discountAmount.toFixed(2)}`;
        appliedCoupons.forEach(coupon => {
          if (coupon === "FIRST TRIP") {
            const extraDiscount = (discountedPrice * couponDiscountPercentage) / 100;
            discountedPrice -= extraDiscount;
            couponDiscountBreakdown += `<br>5% (FIRST TRIP): ₹${extraDiscount.toFixed(2)}`;
          } else if (coupon === "FAST 10") {
            const extraDiscount = (discountedPrice * couponDiscountPercentage) / 100;
            discountedPrice -= extraDiscount;
            couponDiscountBreakdown += `<br>10% (FAST 10): ₹${extraDiscount.toFixed(2)}`;
          } else if (coupon === "MANI100") {
            discountedPrice -= 100;
            couponDiscountBreakdown += `<br>Flat ₹100 off (MANI100)`;
          }
        });

        priceElement.textContent = "₹" + totalPrice.toFixed(2);
        totalPriceElement.textContent = "₹" + discountedPrice.toFixed(2);
        discountedPriceElement.textContent = "-₹" + discountAmount.toFixed(2);
        totalpricecard.textContent = discountedPrice.toFixed(2);
        discountDetails.innerHTML = couponDiscountBreakdown;
      }

      incrementBtn.addEventListener("click", () => {
        if (personCount < 10) {
          personCount++;
          personCountElement.textContent = personCount;
          updatePrices();
        }
      });

      decrementBtn.addEventListener("click", () => {
        if (personCount > 1) {
          personCount--;
          personCountElement.textContent = personCount;
          updatePrices();
        }
      });

      applyCouponBtn.addEventListener("click", () => {
        const enteredCode = couponCodeInput.value.trim().toUpperCase();

        if (couponCodes[enteredCode] !== undefined) {
          if (couponCodes[enteredCode]) {
            couponMessage.style.color = "red";
            couponMessage.textContent = "Coupon already used.";
          } else {
            if (appliedCoupons.length < 2) {
              appliedCoupons.push(enteredCode);
              couponCodes[enteredCode] = true;
              couponMessage.style.color = "green";

              if (enteredCode === "FIRST TRIP") {
                couponMessage.textContent = "Coupon applied! Extra 5% discount added.";
              } else if (enteredCode === "FAST 10") {
                couponMessage.textContent = "Coupon applied! Extra 10% discount added.";
              } else if (enteredCode === "MANI100") {
                couponMessage.textContent = "Coupon applied! ₹100 off added.";
              }

              updatePrices();
            } else {
              couponMessage.style.color = "red";
              couponMessage.textContent = "You can only apply two coupons per trip.";
            }
          }
        } else {
          couponMessage.style.color = "red";
          couponMessage.textContent = "Invalid coupon code.";
        }
      });

      updatePrices();
    } else {
      alert("Package not found. Please select a valid package.");
    }
  });

  document.getElementById('ticket-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const travelTitle = "TRAVEL"
    const travelId = "Id"
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const Aadhaar = document.getElementById('Aadhaar').value;
    const departureDate = document.getElementById('departure-date').value;
    const destination = document.getElementById('destination').value;

    const totalPassengers = parseInt(document.getElementById('personCount').textContent, 10);
    const totalPrice = document.getElementById('total-price').textContent.replace('₹', '').trim();
    const discountedPrice = document.getElementById('discounted-price').textContent.replace('-₹', '').trim();

    const ticketData = {
      travelTitle,
      travelId,
      fullName,
      email,
      phone,
      dob,
      Aadhaar,
      departureDate,
      destination,
      totalPassengers,
      totalPrice: parseFloat(totalPrice),
      discountedPrice: parseFloat(discountedPrice)
    };

    try {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { tickets: arrayUnion(ticketData) });

        localStorage.setItem(`passengerData-${user.uid}`, JSON.stringify(ticketData));

        Swal.fire({
          icon: 'success',
          title: 'Booking Confirmed!',
          text: 'Your ticket details have been saved.',
          confirmButtonText: 'OK',
          background: '#f7f7f7',
          iconColor: '#4CAF50',
          confirmButtonColor: '#4CAF50'
        }).then(() => {
          window.location.href = "ticket.html";
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Required!',
          text: 'Please log in to save your booking details.',
          confirmButtonText: 'OK',
          background: '#f7f7f7',
          iconColor: '#FF3B30',
          confirmButtonColor: '#FF3B30'
        });
      }
    } catch (error) {
      console.error("Error saving to Firestore:", error);

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while saving your booking details. Please try again later.',
        confirmButtonText: 'OK',
        background: '#f7f7f7',
        iconColor: '#FF3B30',
        confirmButtonColor: '#FF3B30'
      });
    }

    document.getElementById('ticket-form').reset();
  });

  document.getElementById("cancelPurchase").addEventListener("click", () => {
    window.location.href = "packages.html";
  });
});

const coupons = {
  "First Trip": 5,    
  "Fast 10": 10,      
  "MANI100": 100,     
};

function displayCoupons() {
  const couponList = document.getElementById("coupon-list");
  couponList.innerHTML = ""; 

  for (const [code, discount] of Object.entries(coupons)) {
    const couponButton = document.createElement("button");
    couponButton.classList.add("coupon-item");
    if (discount === 100) {
      couponButton.textContent = `${code} (₹${discount} OFF)`;
    } else {
      couponButton.textContent = `${code} (${discount}% OFF)`;
    }
    couponButton.addEventListener("click", () => applyCoupon(code, discount));
    couponList.appendChild(couponButton);
  }
}

function applyCoupon(code, discount) {
  const messageBox = document.getElementById("coupon-message");
  let discountAmount;
  let totalPrice;

  if (discount === 100) {
    discountAmount = 100; 
    messageBox.textContent = `Using This Coupon "${code}" You get ₹100 off.`;
  } else {
    const originalPrice = parseFloat(document.getElementById('pricess').textContent.replace('₹', ''));
    discountAmount = (originalPrice * discount) / 100;
    totalPrice = originalPrice - discountAmount;
    messageBox.textContent = `Using This Coupon "${code}" You get ${discount}% off.`;
  }

  messageBox.style.color = "green";
  const originalPrice = parseFloat(document.getElementById('pricess').textContent.replace('₹', ''));
  totalPrice = originalPrice - discountAmount;

  document.getElementById('discounted-price').textContent = `-₹${discountAmount.toFixed(2)}`;
  document.getElementById('total-price').textContent = `₹${totalPrice.toFixed(2)}`;
}

window.onload = displayCoupons;

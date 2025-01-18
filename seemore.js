// Get the query parameter from the URL
const params = new URLSearchParams(window.location.search);
const packageId = params.get("id");

// Fetch the Packages data from local storage
const storedPackages = JSON.parse(localStorage.getItem("Packages"));

// Find the specific package using the ID
const selectedPackage = storedPackages.find(p => p.id === Number(packageId));

// Display the package details on the page
const packageDetailsDiv = document.getElementById("package-details");

if (selectedPackage) {
  // Populate the package details dynamically
  packageDetailsDiv.innerHTML = `
  <div class="goback">
  <button><a href="./packages.html">GO BACK</a></button>
  <button><a href="./gallery.html">GALLERY</a></button>
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
    <div id="package-details">
    <h1>TO KNOW MORE VISIT GALLERY</h1>
    <button><a href="./gallery.html">GALLERY</a></button>
    </div>
  `;
} else {
  // Display a message if the package isn't found
  packageDetailsDiv.innerHTML = `<h1>Package not found!</h1>`;
}

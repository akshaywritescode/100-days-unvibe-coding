// Generate Custom URL with user input
function GenerateURL(data) {
  return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=130x130`;
}

let imageBlob;

async function fetchQR() {
  // Taking user value and passing it to GenerateURL
  const inputValue = document.getElementById("input").value;
  const qrURL = GenerateURL(inputValue);

  // Fetching Image & Making Blob
  const response = await fetch(qrURL);
  if (!response.ok) {
    throw new Error(`QR request failed: ${response.status}`);
  }

  imageBlob = await response.blob();

  // Setting up image
  const imageElement = document.getElementById("qr-image");
  imageElement.src = URL.createObjectURL(imageBlob);
}

// Generating when clicking Generate button
document.getElementById("generate-btn").addEventListener("click", fetchQR);


//Run When page Reload
fetchQR()
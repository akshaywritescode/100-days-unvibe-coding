// Generate Custom URL with user input
function GenerateURL(data) {
  return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=130x130`;
}

let imageUrl;
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
  imageUrl = URL.createObjectURL(imageBlob);
  imageElement.src = imageUrl
}

// Generating when clicking Generate button
document.getElementById("generate-btn").addEventListener("click", fetchQR);

//Downloading functionality
document.getElementById("download-btn").addEventListener("click", function downloadImage() {
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "my-image.jpg";

  document.body.appendChild(link);
  link.click();
  link.remove();
})

//Run When page Reload
fetchQR();

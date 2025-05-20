const API_KEY = 'AIzaSyA7EYAe-Cj-XsG4BkbDrt0YfwScf9dI4zI'; 
const DRIVE_FOLDER_ID = '1WC7j0E0vXveSXcImpI0kRlj9iALma2kP'; 


// Fetch folders (categories)
async function fetchFolders() {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${DRIVE_FOLDER_ID}'+in+parents and mimeType='application/vnd.google-apps.folder'&key=${API_KEY}`);
    const data = await response.json();
    return data.files;
}

// Fetch images from a selected folder
async function fetchImages(folderId) {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents and mimeType contains 'image/'&key=${API_KEY}`);
    const data = await response.json();
    console.log("Fetched Images:", data.files); // Debugging
    return data.files;
}

// Display folder categories
async function displayCategories() {
    const folders = await fetchFolders();
    const categoryContainer = document.getElementById('categories');
    categoryContainer.innerHTML = folders.map(folder => 
        `<button onclick="displayImages('${folder.id}')">${folder.name}</button>`
    ).join('');
}

// Display images in the gallery
async function displayImages(folderId) {
    const images = await fetchImages(folderId);
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = images.map(img => 
        `<img src="https://drive.google.com/thumbnail?id=${img.id}&sz=w1000" alt="${img.name}" data-id="${img.id}">`
    ).join('');
}

// Event listener for lightbox functionality (fix for dynamic images)
document.addEventListener("click", function(event) {
    if (event.target.tagName === "IMG" && event.target.hasAttribute("data-id")) {
        const imageId = event.target.getAttribute("data-id");

        if (!imageId) {
            console.error("Error: imageId is null or undefined");
            return;
        }

        // Create Lightbox
        const lightbox = document.createElement("div");
        lightbox.classList.add("lightbox");

        const img = document.createElement("img");
        img.src = `https://drive.google.com/uc?id=${imageId}`;
        
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);

        // Close Lightbox on Click
        lightbox.addEventListener("click", function() {
            document.body.removeChild(lightbox);
        });

        console.log("Lightbox opened for:", imageId); // Debugging
    }
});

// Initialize categories on page load
document.addEventListener('DOMContentLoaded', displayCategories);

const API_KEY = 'AIzaSyA7EYAe-Cj-XsG4BkbDrt0YfwScf9dI4zI'; 
const DRIVE_FOLDER_ID = 'https://drive.google.com/drive/u/0/folders/1WC7j0E0vXveSXcImpI0kRlj9iALma2kP'; 

async function fetchFolders() {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${DRIVE_FOLDER_ID}'+in+parents&key=${API_KEY}`);
    const data = await response.json();
    return data.files;
}

async function fetchImages(folderId) {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}`);
    const data = await response.json();
    return data.files;
}

async function displayCategories() {
    const folders = await fetchFolders();
    const categoryContainer = document.getElementById('categories');
    categoryContainer.innerHTML = folders.map(folder => 
        `<button onclick="displayImages('${folder.id}')">${folder.name}</button>`
    ).join('');
}

async function displayImages(folderId) {
    const images = await fetchImages(folderId);
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = images.map(img => 
        `<img src="https://drive.google.com/uc?id=${img.id}" alt="${img.name}">`
    ).join('');
}

document.addEventListener('DOMContentLoaded', displayCategories);
// Placeholder images
const images = [
    'https://placehold.co/800x600/2563eb/ffffff/png?text=Slide+1',
    'https://placehold.co/800x600/10b981/ffffff/png?text=Slide+2',
    'https://placehold.co/800x600/f59e0b/ffffff/png?text=Slide+3',
    'https://placehold.co/800x600/ef4444/ffffff/png?text=Slide+4'
];

let currentIndex = 0;
const totalImages = images.length;

// DOM elements
const carouselImage = document.getElementById('carousel-image');
const indexCounter = document.getElementById('index-counter');

// Update carousel display
function updateCarousel() {
    carouselImage.src = images[currentIndex];
    indexCounter.textContent = `${currentIndex + 1} / ${totalImages}`;
}

// Next image
function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
}

// Previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
}

// Initialize on load
window.onload = function () {
    if (totalImages > 0) updateCarousel();
};

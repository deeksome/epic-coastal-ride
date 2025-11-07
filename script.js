// script.js

// Smooth scroll for internal links (if added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Highlight current day in itinerary (optional enhancement)
const today = new Date();
const rideStart = new Date('2024-12-20');
const rideEnd = new Date('2024-12-31');

if (today >= rideStart && today <= rideEnd) {
    const dayIndex = Math.floor((today - rideStart) / (1000 * 60 * 60 * 24)) + 1;
    const dayCard = document.querySelector(`.day-number:contains("DAY ${dayIndex}")`);
    if (dayCard) {
        dayCard.parentElement.classList.add('highlight-today');
    }
}

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker registered:', reg))
        .catch(err => console.error('Service Worker registration failed:', err));
}

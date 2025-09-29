// Birthday Website JavaScript

// Application data
const appData = {
    birthDate: "2005-10-06",
    password: "magic123",
    timeline: [
        {"age": 20, "date": "October 6, 2025", "year": 2025},
        {"age": 19, "date": "October 6, 2024", "year": 2024},
        {"age": 18, "date": "October 6, 2023", "year": 2023},
        {"age": 17, "date": "October 6, 2022", "year": 2022},
        {"age": 16, "date": "October 6, 2021", "year": 2021},
        {"age": 15, "date": "October 6, 2020", "year": 2020},
        {"age": 14, "date": "October 6, 2019", "year": 2019},
        {"age": 13, "date": "October 6, 2018", "year": 2018},
        {"age": 12, "date": "October 6, 2017", "year": 2017},
        {"age": 11, "date": "October 6, 2016", "year": 2016},
        {"age": 10, "date": "October 6, 2015", "year": 2015},
        {"age": 9, "date": "October 6, 2014", "year": 2014},
        {"age": 8, "date": "October 6, 2013", "year": 2013},
        {"age": 7, "date": "October 6, 2012", "year": 2012},
        {"age": 6, "date": "October 6, 2011", "year": 2011},
        {"age": 5, "date": "October 6, 2010", "year": 2010},
        {"age": 4, "date": "October 6, 2009", "year": 2009},
        {"age": 3, "date": "October 6, 2008", "year": 2008},
        {"age": 2, "date": "October 6, 2007", "year": 2007},
        {"age": 1, "date": "October 6, 2006", "year": 2006},
        {"age": 0, "date": "October 6, 2005", "year": 2005}
    ]
};

// Global variables
let lockScreen, timelinePage, passwordForm, passwordInput, errorMessage, ageCounter, timeline, confettiContainer;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    lockScreen = document.getElementById('lockScreen');
    timelinePage = document.getElementById('timelinePage');
    passwordForm = document.getElementById('passwordForm');
    passwordInput = document.getElementById('passwordInput');
    errorMessage = document.getElementById('errorMessage');
    ageCounter = document.getElementById('ageCounter');
    timeline = document.getElementById('timeline');
    confettiContainer = document.getElementById('confetti');

    // Initialize app
    initializeConfetti();
    setupEventListeners();
    updateAgeCounter();
    generateTimeline();

    // Update age counter every hour
    setInterval(updateAgeCounter, 3600000);

    // Add CSS animations
    addCustomStyles();
});

// Setup event listeners
function setupEventListeners() {
    if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordSubmit);
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', clearError);
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handlePasswordSubmit(e);
            }
        });
    }
}

// Handle password form submission
function handlePasswordSubmit(e) {
    e.preventDefault();

    if (!passwordInput) return;

    const password = passwordInput.value.trim();

    if (password === appData.password) {
        clearError();
        unlockSite();
    } else {
        showError('Oops! That\'s not the right password. Try again! 💕');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Clear error message when typing
function clearError() {
    if (errorMessage) {
        errorMessage.textContent = '';
        errorMessage.style.opacity = '0';
    }
}

// Show error message
function showError(message) {
    if (errorMessage && passwordInput) {
        errorMessage.textContent = message;
        errorMessage.style.opacity = '1';
        passwordInput.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            passwordInput.style.animation = '';
        }, 500);
    }
}

// Unlock the site with smooth transition
function unlockSite() {
    if (!lockScreen || !timelinePage) return;

    // Add transition styles
    lockScreen.style.transition = 'all 0.8s ease-in-out';
    timelinePage.style.transition = 'all 0.8s ease-in-out';

    // Hide lock screen
    lockScreen.style.transform = 'translateY(-100%)';
    lockScreen.style.opacity = '0';

    setTimeout(() => {
        lockScreen.classList.add('hidden');
        lockScreen.style.display = 'none';

        timelinePage.classList.remove('hidden');
        timelinePage.style.display = 'block';
        timelinePage.style.opacity = '0';
        timelinePage.style.transform = 'translateY(20px)';

        setTimeout(() => {
            timelinePage.style.opacity = '1';
            timelinePage.style.transform = 'translateY(0)';
            animateTimelineEntries();
        }, 100);
    }, 800);
}

// Calculate and update age counter
function updateAgeCounter() {
    if (!ageCounter) return;

    const birthDate = new Date(appData.birthDate);
    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    // Adjust for negative days
    if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    const ageText = `${years} years, ${months} months, and ${days} days`;
    ageCounter.textContent = ageText;
}

// Generate timeline entries
function generateTimeline() {
    if (!timeline) return;

    timeline.innerHTML = '';

    appData.timeline.forEach((entry, index) => {
        const timelineEntry = createTimelineEntry(entry, index);
        timeline.appendChild(timelineEntry);
    });
}

// Create a single timeline entry
function createTimelineEntry(entry, index) {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'timeline-entry';
    entryDiv.style.animationDelay = `${index * 0.1}s`;

    const marker = document.createElement('div');
    marker.className = 'timeline-marker';

    const content = document.createElement('div');
    content.className = 'timeline-content';

    const yearBadge = document.createElement('span');
    yearBadge.className = 'year-badge';
    yearBadge.textContent = entry.year;

    const ageDisplay = document.createElement('h3');
    ageDisplay.className = 'age-display';
    ageDisplay.textContent = entry.age === 0 ? 'Birth Day! 🎂' : `Age ${entry.age}`;

    const dateDisplay = document.createElement('p');
    dateDisplay.className = 'date-display';
    dateDisplay.textContent = entry.date;

    const photoPlaceholder = document.createElement('div');
    photoPlaceholder.className = 'photo-placeholder';

    if (entry.age === 20) {
        // For 20th birthday, display message instead of image
        photoPlaceholder.textContent = '🎉 Happy 20th Birthday! 🎉';
        photoPlaceholder.style.fontStyle = 'italic';
        photoPlaceholder.style.textAlign = 'center';
        photoPlaceholder.style.padding = '20px';
    } else {
        photoPlaceholder.innerHTML = `
            <img src="images/birthday-${entry.age}.jpeg" alt="Birthday photo age ${entry.age}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
        `;
    }

    const messageArea = document.createElement('div');
    messageArea.className = 'message-area';
    messageArea.textContent = `Add your special memory or message for ${entry.age === 0 ? 'her birth' : 'age ' + entry.age} here...`;

    // Add click handler for photo placeholder
    photoPlaceholder.addEventListener('click', () => {
        handlePhotoClick(entry.age);
    });

    content.appendChild(yearBadge);
    content.appendChild(ageDisplay);
    content.appendChild(dateDisplay);
    content.appendChild(photoPlaceholder);
    content.appendChild(messageArea);

    entryDiv.appendChild(marker);
    entryDiv.appendChild(content);

    return entryDiv;
}

// Handle photo placeholder click
function handlePhotoClick(age) {
    alert(`To add photos for ${age === 0 ? 'birth day' : 'age ' + age}:\n\n1. Right-click the photo area\n2. Select "Inspect Element"\n3. Replace the photo-placeholder div with an <img> tag\n4. Add your image URL to the src attribute\n\nExample:\n<img src="your-photo.jpg" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">\n\nFor easier management, upload photos to a cloud service like Google Drive or Dropbox and use the direct links! 💕`);
}

// Animate timeline entries on scroll
function animateTimelineEntries() {
    const entries = document.querySelectorAll('.timeline-entry');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        entries.forEach(entry => {
            observer.observe(entry);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        entries.forEach(entry => {
            entry.style.animationPlayState = 'running';
        });
    }
}

// Initialize floating confetti
function initializeConfetti() {
    if (!confettiContainer) return;

    createConfettiParticles();

    // Recreate confetti every 10 seconds
    setInterval(createConfettiParticles, 10000);
}

// Create confetti particles
function createConfettiParticles() {
    if (!confettiContainer) return;

    // Clear existing particles
    confettiContainer.innerHTML = '';

    const particleCount = 20;
    const colors = ['#FFB6C1', '#DDA0DD', '#98FB98', '#87CEEB', '#F0E68C'];

    for (let i = 0; i < particleCount; i++) {
        createConfettiParticle(colors[i % colors.length], i);
    }
}

// Create a single confetti particle
function createConfettiParticle(color, index) {
    if (!confettiContainer) return;

    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    particle.style.backgroundColor = color;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = (index * 0.3) + 's';
    particle.style.animationDuration = (3 + Math.random() * 2) + 's';

    // Random shapes
    if (Math.random() > 0.5) {
        particle.style.borderRadius = '50%';
    }

    confettiContainer.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 5000);
}

// Add custom CSS animations and styles
function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @keyframes heartFloat {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }

        .hidden {
            display: none !important;
        }

        html {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);
}

// Add parallax effect to timeline
window.addEventListener('scroll', function() {
    if (!timelinePage || timelinePage.classList.contains('hidden')) return;

    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;

    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    timelineMarkers.forEach((marker, index) => {
        if (marker) {
            const offset = (index % 2 === 0 ? 1 : -1) * parallax * 0.1;
            marker.style.transform = `translateX(calc(-50% + ${offset}px))`;
        }
    });
});

// Create floating hearts
function createFloatingHearts() {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = '1.5rem';
    heart.style.opacity = '0.7';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1';
    heart.style.animation = 'heartFloat 4s ease-in-out forwards';

    document.body.appendChild(heart);

    setTimeout(() => {
        if (heart && heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 4000);
}

// Create floating hearts periodically when on timeline page
setInterval(() => {
    if (timelinePage && !timelinePage.classList.contains('hidden') && Math.random() > 0.7) {
        createFloatingHearts();
    }
}, 3000);

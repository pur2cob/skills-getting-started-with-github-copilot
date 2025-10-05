// DOM elements
const activitiesContainer = document.getElementById('activities-container');
const activitySelect = document.getElementById('activity-select');
const signupForm = document.getElementById('signup-form');
const emailInput = document.getElementById('email-input');
const messageDiv = document.getElementById('message');

// Global activities data
let activitiesData = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadActivities();
    setupEventListeners();
});

// Load activities from the API
async function loadActivities() {
    try {
        const response = await fetch('/activities');
        if (!response.ok) {
            throw new Error('Failed to fetch activities');
        }
        
        activitiesData = await response.json();
        displayActivities();
        populateActivitySelect();
    } catch (error) {
        console.error('Error loading activities:', error);
        showMessage('Failed to load activities. Please refresh the page.', 'error');
    }
}

// Display activities in the activities container
function displayActivities() {
    activitiesContainer.innerHTML = '';
    
    Object.entries(activitiesData).forEach(([activityName, activity]) => {
        const activityCard = createActivityCard(activityName, activity);
        activitiesContainer.appendChild(activityCard);
    });
}

// Create an activity card element
function createActivityCard(name, activity) {
    const card = document.createElement('div');
    card.className = 'activity-card';
    
    const participantCount = activity.participants.length;
    const spotsLeft = activity.max_participants - participantCount;
    
    card.innerHTML = `
        <h4>${name}</h4>
        <p><strong>Description:</strong> ${activity.description}</p>
        <p><strong>Schedule:</strong> ${activity.schedule}</p>
        <div class="participants-info">
            <p>Participants: ${participantCount}/${activity.max_participants}</p>
            <p>Spots available: ${spotsLeft}</p>
        </div>
    `;
    
    return card;
}

// Populate the activity select dropdown
function populateActivitySelect() {
    // Clear existing options (except the default one)
    activitySelect.innerHTML = '<option value="">Choose an activity...</option>';
    
    Object.keys(activitiesData).forEach(activityName => {
        const option = document.createElement('option');
        option.value = activityName;
        option.textContent = activityName;
        activitySelect.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    signupForm.addEventListener('submit', handleSignup);
}

// Handle signup form submission
async function handleSignup(event) {
    event.preventDefault();
    
    const selectedActivity = activitySelect.value;
    const email = emailInput.value.trim();
    
    if (!selectedActivity || !email) {
        showMessage('Please select an activity and enter your email.', 'error');
        return;
    }
    
    // Validate email format (basic validation)
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    try {
        const response = await fetch(`/activities/${encodeURIComponent(selectedActivity)}/signup?email=${encodeURIComponent(email)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to sign up');
        }
        
        const result = await response.json();
        showMessage(`Successfully signed up! ${result.message}`, 'success');
        
        // Reset form
        signupForm.reset();
        
        // Reload activities to show updated participant count
        loadActivities();
        
    } catch (error) {
        console.error('Error signing up:', error);
        showMessage(`Error: ${error.message}`, 'error');
    }
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message to user
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}
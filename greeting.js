// Simple greeting program for GitHub Copilot exercise
// This program responds to different types of greetings

function greet(input) {
    // Convert input to lowercase for case-insensitive matching
    const normalizedInput = input.toLowerCase().trim();
    
    // Handle different greeting types
    switch (normalizedInput) {
        case 'hi':
        case 'hello':
            return 'Hello there! Welcome to GitHub Copilot!';
        case 'hey':
            return 'Hey! Ready to code with Copilot?';
        case 'good morning':
            return 'Good morning! Have a productive coding session!';
        case 'good afternoon':
            return 'Good afternoon! Hope your code is compiling smoothly!';
        case 'good evening':
            return 'Good evening! Time for some late-night coding?';
        default:
            return `Hi! You said "${input}". Nice to meet you!`;
    }
}

// Function to demonstrate GitHub Copilot suggestions
function getRandomGreeting() {
    const greetings = [
        'Hello, fellow developer!',
        'Welcome to the world of AI-assisted coding!',
        'Ready to boost your productivity with Copilot?',
        'Let\'s write some amazing code together!',
        'GitHub Copilot is here to help!'
    ];
    
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
}

// Main function to run the program
function main() {
    console.log('=== GitHub Copilot Greeting Program ===');
    console.log('This program demonstrates basic functionality with GitHub Copilot');
    console.log('');
    
    // Test different greetings
    const testInputs = ['hi', 'Hello', 'hey', 'good morning', 'howdy'];
    
    testInputs.forEach(input => {
        console.log(`Input: "${input}"`);
        console.log(`Response: ${greet(input)}`);
        console.log('---');
    });
    
    console.log('Random greeting:');
    console.log(getRandomGreeting());
}

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { greet, getRandomGreeting, main };
}

// Run the program if this file is executed directly
if (require.main === module) {
    main();
}
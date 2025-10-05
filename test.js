// Simple test file for the greeting program
const { greet, getRandomGreeting } = require('./greeting.js');

function runTests() {
    console.log('=== Running Tests ===');
    let passed = 0;
    let total = 0;
    
    // Test function
    function test(description, actual, expected) {
        total++;
        if (actual === expected) {
            console.log(`✅ ${description}`);
            passed++;
        } else {
            console.log(`❌ ${description}`);
            console.log(`   Expected: "${expected}"`);
            console.log(`   Actual: "${actual}"`);
        }
    }
    
    // Test greet function with different inputs
    test(
        'greet("hi") returns correct response',
        greet('hi'),
        'Hello there! Welcome to GitHub Copilot!'
    );
    
    test(
        'greet("Hello") handles case insensitive input',
        greet('Hello'),
        'Hello there! Welcome to GitHub Copilot!'
    );
    
    test(
        'greet("hey") returns correct response',
        greet('hey'),
        'Hey! Ready to code with Copilot?'
    );
    
    test(
        'greet("good morning") returns correct response',
        greet('good morning'),
        'Good morning! Have a productive coding session!'
    );
    
    test(
        'greet("unknown") handles unknown input',
        greet('unknown'),
        'Hi! You said "unknown". Nice to meet you!'
    );
    
    // Test getRandomGreeting function
    const randomGreeting = getRandomGreeting();
    test(
        'getRandomGreeting() returns a string',
        typeof randomGreeting,
        'string'
    );
    
    test(
        'getRandomGreeting() returns non-empty string',
        randomGreeting.length > 0,
        true
    );
    
    console.log('\n=== Test Results ===');
    console.log(`Passed: ${passed}/${total} tests`);
    
    if (passed === total) {
        console.log('🎉 All tests passed!');
        return 0;
    } else {
        console.log('❌ Some tests failed!');
        return 1;
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    process.exit(runTests());
}
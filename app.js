const http = require('http');
const url = require('url');

// Set the port number
const PORT = 9876;

// Function to generate even numbers
function generateEvenNumbers() {
    const evenNumbers = [];
    for (let i = 2; i <= 56; i += 2) {
        evenNumbers.push(i);
    }
    return evenNumbers;
}

// Function to generate Fibonacci numbers
function generateFibonacciNumbers() {
    const fibNumbers = [0, 1];
    let n1 = 0, n2 = 1, nextTerm;
    while (fibNumbers.length < 10) {
        nextTerm = n1 + n2;
        fibNumbers.push(nextTerm);
        n1 = n2;
        n2 = nextTerm;
    }
    return fibNumbers;
}

// Function to generate prime numbers
function generatePrimeNumbers() {
    const primes = [];
    for (let i = 2; primes.length < 10; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
    }
    return primes;
}

// Function to generate random numbers
function generateRandomNumbers() {
    const randomNumbers = [];
    for (let i = 0; i < 10; i++) {
        const randomNumber = Math.floor(Math.random() * 100) + 1; // Numbers between 1 and 100
        randomNumbers.push(randomNumber);
    }
    return randomNumbers;
}

// Handle requests based on the path
function requestHandler(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    res.setHeader('Content-Type', 'application/json');

    if (path === '/numbers/e') {
        res.end(JSON.stringify({ numbers: generateEvenNumbers() }));
    } else if (path === '/numbers/f') {
        res.end(JSON.stringify({ numbers: generateFibonacciNumbers() }));
    } else if (path === '/numbers/p') {
        res.end(JSON.stringify({ numbers: generatePrimeNumbers() }));
    } else if (path === '/numbers/r') {
        res.end(JSON.stringify({ numbers: generateRandomNumbers() }));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Endpoint not found' }));
    }
}

// Create the server
const server = http.createServer(requestHandler);

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

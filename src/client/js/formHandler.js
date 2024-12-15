import { checkForURL } from "./urlChecker"; // Import the function for URL validation

// Define constants and import necessary functions
const serverURL = 'https://localhost:8000/api';

const form = document.getElementById('urlForm');
if (form) {
    form.addEventListener('submit', handleSubmit);
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // Check if the URL is valid
    if (checkForURL(formText)) {
        postData('api', { url: formText })
            .then(response => {
                console.log('Server response:', response);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        console.log("Invalid URL");
        alert("Please enter a valid URL.");
    }
}

// Function to send data to the server
async function sendDataToServer(url) {
    try {
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }), // Correctly passing the URL
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Response from server:", data);
            displayResults(data);
        } else {
            console.error("Server responded with an error:", response.statusText);
            alert("There was an error processing your request. Please try again later.");
        }
    } catch (error) {
        console.error("Error sending data to server:", error);
        alert("Unable to connect to the server. Please check your connection or try again later.");
    }
}

// Function to validate a URL
function isValidUrl(url) {
    try {
        const newUrl = new URL(url);
        return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch (e) {
        return false;
    }
}

// Function to display results on the page
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerText = JSON.stringify(data, null, 2); // Display results as a formatted string
}

// Export the handleSubmit function
export { handleSubmit };

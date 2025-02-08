const apiKey = 'AIzaSyDtNUYJlfSPuMLFE_FXgXAgssRSzhdgvuQ';
const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    appendMessage('User', userMessage);
    userInput.value = '';

    const response = await getGenerativeAIResponse(userMessage);
    appendMessage('AI', response);
});

async function getGenerativeAIResponse(query) {
    try {
        // Correct API URL for Chat-Bison model (if using this model)
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateText?key=${apiKey}`;
        
        // Send the request to the API with a POST method
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: { text: query },  // Correct prompt format for the API
                temperature: 0.7,  // Optional: Adjust response creativity
                maxOutputTokens: 150  // Optional: Control the length of the response
            })
        });

        // Handle HTTP error and report 404
        if (!response.ok) {
            const errorData = await response.json();
            console.error(`HTTP error! Status: ${response.status}`, errorData);
            if (response.status === 404) {
                throw new Error(`API Endpoint Not Found! Status: ${response.status} - Check your endpoint and model name.`);
            }
            throw new Error(`HTTP error! Status: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        // Parse the response
        const data = await response.json();
        console.log('API Response:', data);

        // Check if the API returned a valid response
        if (data && data.candidates && data.candidates.length > 0) {
            return limitWords(data.candidates[0].output, 30);  // Limit the response to 30 words
        } else {
            return 'No meaningful response generated.';
        }
    } catch (error) {
        console.error('Error fetching response from Generative AI API:', error);
        return `Sorry, I could not process your request. Please try again later. Error: ${error.message}`;
    }
}

// Limit the response text to a certain number of words
function limitWords(text, wordLimit) {
    return text.split(' ').slice(0, wordLimit).join(' ');
}

// Append the messages to the chat body
function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${sender}: ${message}`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

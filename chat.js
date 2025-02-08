const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');
const queryInfo = document.getElementById('query-info');

function showBot() {
    queryInfo.style.visibility = 'visible';
}

function hideBot() {
    queryInfo.style.visibility = 'hidden';
}

sendButton.addEventListener('click', () => {
    if (userInput.value.trim() === '') return;

    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = userInput.value;
    chatBody.appendChild(userMessage);
    userInput.value = '';

    // Simulate bot response
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot-message');
        botMessage.innerHTML = `
            <div class="thinking-indicator">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        `;
        chatBody.appendChild(botMessage);

        setTimeout(() => {
            botMessage.innerHTML = `<div>${userMessage.textContent}</div>`;
        }, 2000);
    }, 500);
});

// Show the bot by default for testing
showBot();



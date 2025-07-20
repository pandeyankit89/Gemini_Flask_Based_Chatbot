document.getElementById("chat-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();  // Prevent newline
        sendMessage();           // Call your send function
    }
});

async function sendMessage() {
    
    const inputElement = document.getElementById('chat-input');
    const userInput = inputElement.value;
    const chatBox = document.getElementById('chat-box');

    if (userInput === "") return;

    const chatMessages = document.getElementById("chat-messages");

    // Add user message
    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.textContent = userInput;
    chatMessages.appendChild(userMsg);

    inputElement.value = ""; // Clear input
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom

  
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    const botMsg = document.createElement("div");
    botMsg.className = "message bot";

    // Add icon + response text
    botMsg.innerHTML = `
            <img src="/static/chatbot_image.png" alt="Bot Icon">
            <span>${data.reply}</span>
            `;
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Your Firebase configuration
// Replace with your own config from Firebase console
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPwGUW6zz20uRXuUeSfIwoxmD8FmBl6QU",
  authDomain: "mychat-b052f.firebaseapp.com",
  projectId: "mychat-b052f",
  storageBucket: "mychat-b052f.firebasestorage.app",
  messagingSenderId: "20535185592",
  appId: "1:20535185592:web:6efe12e6efc94a77f7244d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Get DOM elements
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Generate a random user ID for this session
const userId = 'user_' + Math.random().toString(36).substr(2, 9);
const username = 'Anonymous ' + Math.floor(Math.random() * 1000);

// Load messages in real-time
db.collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot((snapshot) => {
        // Clear messages container
        messagesContainer.innerHTML = '';
        
        // Display each message
        snapshot.forEach((doc) => {
            const message = doc.data();
            displayMessage(message);
        });
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });

// Send message function
async function sendMessage() {
    const text = messageInput.value.trim();
    
    if (text === '') return;
    
    // Disable button while sending
    sendButton.disabled = true;
    
    try {
        await db.collection('messages').add({
            text: text,
            userId: userId,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Clear input
        messageInput.value = '';
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
    } finally {
        sendButton.disabled = false;
        messageInput.focus();
    }
}

// Display message in the chat
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${message.userId === userId ? 'sent' : 'received'}`;
    
    const time = message.timestamp ? 
        new Date(message.timestamp.toDate()).toLocaleTimeString() : 
        'Just now';
    
    messageElement.innerHTML = `
        <strong>${message.username}</strong><br>
        ${message.text}
        <div class="message-time">${time}</div>
    `;
    
    messagesContainer.appendChild(messageElement);
}

// Event listeners
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !sendButton.disabled) {
        sendMessage();
    }
});

// Focus input on load
messageInput.focus();

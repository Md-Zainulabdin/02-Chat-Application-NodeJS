const socket = io();
const textArea = document.getElementById("textarea");
const messageArea = document.querySelector(".chat-area");
let name;
do {
    name = prompt("Please enter your name..")
} while (!name);


textArea.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessgae(e.target.value);
    }
})

const sendMessgae = (message) => {

    let msg = {
        user: name,
        message: message.trim(),
    }

    // Append message

    appendMessage(msg, 'outgoing');
    textArea.value = ""
    scrollToBottom()

    // Send to Server

    socket.emit('message', msg);
}

const appendMessage = (msg, type) => {
    let mainDiv = document.createElement("div");
    let className = type;
    mainDiv.classList.add(className, "message");

    let markup = `
        <h2>${msg.user}</h2>
        <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv)
}


// Recieve Message

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}
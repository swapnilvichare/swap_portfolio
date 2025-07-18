document.addEventListener("DOMContentLoaded", function () {
    const chatToggle = document.getElementById("chat-toggle");
    const chatbot = document.getElementById("chatbot");
    const chatClose = document.getElementById("chat-close");
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatBody = document.getElementById("chat-body");
    const micBtn = document.getElementById("mic-btn");

    chatToggle.addEventListener("click", () => {
      chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
    });

    chatClose.addEventListener("click", () => {
      chatbot.style.display = "none";
    });

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
      const msg = userInput.value.trim();
      if (!msg) return;
      chatBody.innerHTML += `<div><strong>You:</strong> ${msg}</div>`;
      userInput.value = "";

      let reply = "Sorry, I didn't understand that.";
      if (msg.toLowerCase().includes("hello")) reply = "Hi there! 👋";
      else if (msg.toLowerCase().includes("project")) reply = "Check out the Projects section!";
      else if (msg.toLowerCase().includes("contact")) reply = "Use the Contact form at the bottom.";

      setTimeout(() => {
        chatBody.innerHTML += `<div><strong>Bot:</strong> ${reply}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
        speak(reply);
      }, 500);
    }

    function speak(message) {
      const speech = new SpeechSynthesisUtterance(message);
      speech.lang = 'en-US';
      speechSynthesis.speak(speech);
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';

      micBtn.addEventListener("click", () => {
        recognition.start();
        micBtn.innerText = "🎙️";
      });

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        sendMessage();
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event);
      };

      recognition.onend = () => {
        micBtn.innerText = "🎤";
      };
    } else {
      micBtn.disabled = true;
      micBtn.title = "Speech recognition not supported";
    }
  });
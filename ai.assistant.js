// ai.assistant.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. AI Assistant Logic Setup
    const aiAssistantContainer = document.getElementById('ai-assistant-container');
    if (aiAssistantContainer) {
        const askButton = document.querySelector('.ai-button');
        const inputField = document.getElementById('ai-input');

        askButton.addEventListener('click', sendQuery);
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendQuery();
            }
        });
    }

    // 2. Scroll Reveal Initialization (Works on all pages)
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('header', { delay: 100, distance: '0px' });
        ScrollReveal().reveal('.hero-content', { delay: 300, distance: '50px', origin: 'top' });
        ScrollReveal().reveal('.social-icons-container', { delay: 400, distance: '30px', origin: 'bottom' });
        ScrollReveal().reveal('.core-stack', { delay: 500, distance: '30px', origin: 'bottom' });
        
        ScrollReveal().reveal('.project-card', { interval: 200, distance: '50px', origin: 'bottom' });
        ScrollReveal().reveal('.contact-form-container', { delay: 300, distance: '50px', origin: 'left' });
    }
});

function sendQuery() {
    const input = document.getElementById('ai-input');
    const output = document.getElementById('ai-output');
    const query = input.value.trim().toLowerCase();
    let response = "";

    output.textContent = "Processing...";
    input.value = ""; 

    // Simple Rule-based Responses with a slight delay for realism
    setTimeout(() => {
        if (query.includes("sharad") || query.includes("developer") || query.includes("skill")) {
            response = "Sharad Rathore is a passionate web developer focused on creating modern, stylish, and functional PWA websites. He masters HTML, CSS, JavaScript, and framework basics.";
        } else if (query.includes("snake") || query.includes("project")) {
            response = "Sharad's featured project is the Classic System: Snake Game, built using Vanilla JavaScript and HTML Canvas. It is fully PWA enabled!";
        } else if (query.includes("contact") || query.includes("reach out") || query.includes("call")) {
            response = "To contact Sharad, please visit the Contact page. Redirecting you there in 3 seconds...";
            setTimeout(() => {
                window.location.href = './contact.html';
            }, 3000);
        } else if (query === "") {
            response = "Please type your question about Sharad or his work in the input box.";
        } else {
            response = "I am a basic AI assistant and can only answer questions about Sharad and his portfolio. Try asking about his skills or projects!";
        }

        output.textContent = response;
    }, 500); 
}
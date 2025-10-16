// ai.assistant.js (Text-Only Assistant Logic - FINAL with Conversation History)

document.addEventListener("DOMContentLoaded", function() {
    const aiButton = document.getElementById('ai-assistant-btn');
    const aiChatbox = document.getElementById('ai-chatbox');
    const aiInput = document.getElementById('ai-input');
    const aiOutput = document.getElementById('ai-output');

    if (!aiButton || !aiChatbox || !aiInput || !aiOutput) {
        console.error("ERROR: AI Assistant HTML elements not found. Check index.html IDs.");
        return; 
    }

    let isChatOpen = false;
    let isTyping = false;
    
    const initialMessage = "नमस्ते! मैं शरद का AI असिस्टेंट हूँ। मैं आपको उनके बारे में और वेब डेवलपमेंट के बुनियादी सवालों के जवाब दे सकता हूँ। पूछिए!";
    
    function typeMessage(element, message) {
        element.textContent = '';
        let i = 0;
        const speed = 20; 
        isTyping = true; 

        function type() {
            if (i < message.length) {
                element.textContent += message.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                isTyping = false;
            }
        }
        type();
    }

    function appendMessage(speaker, text, isTyped = false) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('chat-message', speaker.toLowerCase());

        const contentElement = document.createElement('span');
        messageContainer.appendChild(contentElement);
        aiOutput.appendChild(messageContainer);
        aiOutput.scrollTop = aiOutput.scrollHeight; 

        if (isTyped) {
            typeMessage(contentElement, text);
        } else {
            contentElement.textContent = text;
        }
    }

    function getAIResponse(userQuery) {
        // Simple search and response logic
        if (userQuery.includes("sharad") || userQuery.includes("नाम") || userQuery.includes("kon ho")) {
            response = "शरद राठौर एक उत्साही और परिणाम-उन्मुख वेब डेवलपर हैं। उन्हें फ्रंट-एंड और बैक-एंड दोनों तकनीकों का ज्ञान है।";
        } else if (userQuery.includes("skill") || userQuery.includes("कौशल") || userQuery.includes("kya aata hai")) {
            response = "शरद HTML5, CSS3, और JavaScript में मजबूत हैं। उनके मुख्य कौशल: React, Node.js (basics), PHP, और आधुनिक CSS फ्रेमवर्क हैं।";
        } else if (userQuery.includes("portfolio") || userQuery.includes("काम") || userQuery.includes("project")) {
            response = "शरद के सबसे हालिया काम देखने के लिए 'Portfolio' टैब पर क्लिक करें। उन्होंने UI/UX, परफॉर्मेंस और क्लीन कोड पर ध्यान केंद्रित किया है।";
        } else if (userQuery.includes("contact") || userQuery.includes("संपर्क") || userQuery.includes("number")) {
            response = "आप 'Contact' टैब पर क्लिक करके, या सीधे फ़ोन पर: +91 82183 12429 पर शरद से संपर्क कर सकते हैं।";
        } else if (userQuery.includes("html") || userQuery.includes("एचटीएमएल")) {
            response = "HTML (HyperText Markup Language) वेब पेज की संरचना बनाता है। यह वेबसाइट की नींव है।";
        } else if (userQuery.includes("css") || userQuery.includes("सीएसएस") || userQuery.includes("design")) {
            response = "CSS (Cascading Style Sheets) वेब पेज को स्टाइल और डिज़ाइन करने के लिए उपयोग किया जाता है।";
        } else if (userQuery.includes("नमस्ते") || userQuery.includes("hi") || userQuery.includes("hello")) {
            response = "नमस्ते! आप शरद के बारे में, या वेब डेवलपमेंट के बुनियादी सवालों के बारे में पूछ सकते हैं।";
        } else {
            response = "क्षमा करें, मैं केवल शरद के बारे में या वेब डेवलपमेंट के बुनियादी तकनीकी सवालों के बारे में ही जानकारी दे सकता हूँ।";
        }
        return response;
    }

    aiButton.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        aiChatbox.style.display = isChatOpen ? 'flex' : 'none';
        
        if (isChatOpen) {
            aiInput.focus();
            if (aiOutput.children.length === 0) {
                appendMessage("AI", initialMessage, true);
            }
        } 
    });

    aiInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (isTyping) return;

            const userQuery = aiInput.value.trim();
            aiInput.value = ''; 

            if (userQuery.length === 0) return;

            appendMessage("You", userQuery, false);

            const aiResponseText = getAIResponse(userQuery.toLowerCase());

            setTimeout(() => {
                appendMessage("AI", aiResponseText, true);
            }, 500); 
        }
    });
});
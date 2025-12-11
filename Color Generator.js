const bodyElement = document.getElementById('body-element');
const hexDisplay = document.getElementById('hex-display');
const generateBtn = document.getElementById('generate-btn');
const copyMessage = document.getElementById('copy-message');

/**
 * Generates a random 6-digit hex color code.
 */
function generateRandomHexColor() {
    const randomColor = Math.floor(Math.random() * 16777215);
    let hexColor = randomColor.toString(16).padStart(6, '0').toUpperCase();
    return `#${hexColor}`;
}

/**
 * Apply color to background & update display.
 */
function applyColor() {
    const newColor = generateRandomHexColor();
    bodyElement.style.backgroundColor = newColor;
    hexDisplay.textContent = newColor;
}

/**
 * Copies hex code to clipboard.
 */
function copyHexCode() {
    const hexCode = hexDisplay.textContent;

    const textarea = document.createElement('textarea');
    textarea.value = hexCode;
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        copyMessage.classList.remove('opacity-0');
        copyMessage.classList.add('opacity-100');

        setTimeout(() => {
            copyMessage.classList.remove('opacity-100');
            copyMessage.classList.add('opacity-0');
        }, 1500);

    } catch (err) {
        console.error('Copy Failed:', err);
    }

    document.body.removeChild(textarea);
}

// Event Listeners
generateBtn.addEventListener('click', applyColor);
hexDisplay.addEventListener('click', copyHexCode);

// Generate color on page load
window.onload = applyColor;

let currentTipPercentage = 15;

// Format currency
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

/* ---------------- FUNCTIONS ---------------- */

// Set predefined tip
function setTip(percentage, element) {
    currentTipPercentage = percentage;

    document.getElementById("custom-tip").value = "";

    document.querySelectorAll(".tip-button")
        .forEach(btn => btn.classList.remove("active"));

    element.classList.add("active");

    calculateTip();
}

// Custom tip input
function setCustomTip(value) {
    document.querySelectorAll(".tip-button")
        .forEach(btn => btn.classList.remove("active"));

    const num = parseFloat(value);
    if (!isNaN(num)) currentTipPercentage = num;

    calculateTip();
}

// Main calculation function
function calculateTip() {
    const bill = parseFloat(document.getElementById("bill-amount").value) || 0;
    const people = parseInt(document.getElementById("party-size").value) || 1;

    const tipAmount = bill * (currentTipPercentage / 100);
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / people;

    document.getElementById("tip-amount-display").textContent = formatter.format(tipAmount);
    document.getElementById("total-amount-display").textContent = formatter.format(totalAmount);
    document.getElementById("per-person-display").textContent = formatter.format(perPerson);
}

// Auto initialize
window.onload = calculateTip;

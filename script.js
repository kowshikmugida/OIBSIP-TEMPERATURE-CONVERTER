// Get DOM elements
const temperatureInput = document.getElementById('temperature');
const convertBtn = document.getElementById('convertBtn');
const resultsSection = document.getElementById('resultsSection');
const errorMessage = document.getElementById('errorMessage');
const celsiusResult = document.getElementById('celsiusResult');
const fahrenheitResult = document.getElementById('fahrenheitResult');
const kelvinResult = document.getElementById('kelvinResult');
const unitRadios = document.querySelectorAll('input[name="unit"]');

// Event listeners
convertBtn.addEventListener('click', convertTemperature);
temperatureInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convertTemperature();
    }
});

// Clear error when user starts typing
temperatureInput.addEventListener('input', () => {
    errorMessage.textContent = '';
});

// Main conversion function
function convertTemperature() {
    const inputValue = temperatureInput.value.trim();
    const selectedUnit = document.querySelector('input[name="unit"]:checked').value;

    // Validation
    if (!inputValue) {
        showError('Please enter a temperature value');
        return;
    }

    const temperature = parseFloat(inputValue);

    // Check if input is a valid number
    if (isNaN(temperature)) {
        showError('Please enter a valid number');
        return;
    }

    // Validate temperature values (absolute zero check)
    if (selectedUnit === 'kelvin' && temperature < 0) {
        showError('Kelvin cannot be below 0 K (absolute zero)');
        return;
    }

    if (selectedUnit === 'celsius' && temperature < -273.15) {
        showError('Celsius cannot be below -273.15°C (absolute zero)');
        return;
    }

    if (selectedUnit === 'fahrenheit' && temperature < -459.67) {
        showError('Fahrenheit cannot be below -459.67°F (absolute zero)');
        return;
    }

    // Clear previous error
    errorMessage.textContent = '';

    // Convert to all units
    let celsius, fahrenheit, kelvin;

    if (selectedUnit === 'celsius') {
        celsius = temperature;
        fahrenheit = (celsius * 9/5) + 32;
        kelvin = celsius + 273.15;
    } else if (selectedUnit === 'fahrenheit') {
        fahrenheit = temperature;
        celsius = (fahrenheit - 32) * 5/9;
        kelvin = celsius + 273.15;
    } else if (selectedUnit === 'kelvin') {
        kelvin = temperature;
        celsius = kelvin - 273.15;
        fahrenheit = (celsius * 9/5) + 32;
    }

    // Display results with proper formatting
    celsiusResult.textContent = formatTemperature(celsius);
    fahrenheitResult.textContent = formatTemperature(fahrenheit);
    kelvinResult.textContent = formatTemperature(kelvin);

    // Show results section
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Helper function to format temperature to 2 decimal places
function formatTemperature(value) {
    return parseFloat(value.toFixed(2));
}

// Error display function
function showError(message) {
    errorMessage.textContent = message;
    resultsSection.style.display = 'none';
}

// Optional: Focus on input when page loads
window.addEventListener('load', () => {
    temperatureInput.focus();
});
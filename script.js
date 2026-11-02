 // Selecting HTML elements

const amount = document.getElementById("amount");

const fromCurrency = document.getElementById("fromCurrency");

const toCurrency = document.getElementById("toCurrency");

const convertBtn = document.getElementById("convertBtn");

const swapBtn = document.getElementById("swap");

const result = document.getElementById("result");

const rateText = document.getElementById("rate");

const error = document.getElementById("error");


// Async function to fetch exchange rates

async function convertCurrency() {

    try {

        // Clear previous error
        error.innerText = "";

        // Get user input
        const enteredAmount = Number(amount.value);

        const from = fromCurrency.value;

        const to = toCurrency.value;

        // Validate amount
        if (!Number.isFinite(enteredAmount) || enteredAmount <= 0) {
            throw new Error("Please enter a valid amount");
        }

        // API URL
        const URL = `https://open.er-api.com/v6/latest/${from}`;

        // Fetch API data
        const response = await fetch(URL);

        // Check response
        if (!response.ok) {
            throw new Error("Failed to fetch exchange rates");
        }

        // Convert response into JavaScript object
        const data = await response.json();

        // Get exchange rate
        const exchangeRate = data.rates[to];

        if (data.result !== "success" || !exchangeRate) {
            throw new Error("Currency not supported");
        }

        // Calculate converted amount
        const convertedAmount = enteredAmount * exchangeRate;

        // Display result
        result.innerText =
            `${convertedAmount.toFixed(2)} ${to}`;

        rateText.innerText =
            `1 ${from} = ${exchangeRate} ${to}`;

    }

    catch (err) {

        result.innerText = "Conversion failed";

        rateText.innerText = "";

        error.innerText = err.message;

        console.log(err);

    }

}


// Convert button event

convertBtn.addEventListener("click", convertCurrency);


// Swap currencies

swapBtn.addEventListener("click", () => {

    const temp = fromCurrency.value;

    fromCurrency.value = toCurrency.value;

    toCurrency.value = temp;

    convertCurrency();

});


// Initial conversion

convertCurrency();
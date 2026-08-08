
const quoteText = document.getElementById("quoteText");
const authorName = document.getElementById("authorName");

const genQuote = document.getElementById("generateBtn");
getQuote();
async function getQuote() {
    try {
        const response = await fetch('https://dummyjson.com/quotes/random');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const newQuote = await response.json();
        quoteText.textContent = newQuote.quote;
        authorName.textContent = `-${newQuote.author}`;
    }
    catch (error) {
        console.error('Failed to fetch quote:', error);
        quoteText.textContent = error;
    }
}

genQuote.addEventListener("click", () => {
    getQuote();
})


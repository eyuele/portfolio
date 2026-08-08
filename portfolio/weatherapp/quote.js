
const quoteText = document.getElementById("quoteText");
const authorName = document.getElementById("authorName");

const genQuote = document.getElementById("generateBtn");
getQuote();
async function getQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const newQuote = await response.json();
        quoteText.textContent = newQuote.content;
        authorName.textContent = `-${newQuote.author}`;
    }
    catch (error) {
        console.error('Failed to fetch quote:', error);
    }
}

genQuote.addEventListener("click", () => {
    getQuote();
})


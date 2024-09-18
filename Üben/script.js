let apiQuotes = [];

// Funktion zum Abrufen der Zitate
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote(); // Zeigt direkt ein Zitat an
    } catch (error) {
        console.error("Fehler beim Abrufen der Zitate", error);
    }
}

// Funktion zum Anzeigen eines neuen Zitats
function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    const quoteText = document.getElementById('quote');
    const authorText = document.getElementById('author');
    const quoteBox = document.querySelector('.quote-box');

    // Quote und Author aktualisieren
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author || 'Unbekannt';

    // Anpassung bei langen Zitaten
    if (quote.text.length > 200) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Übergangseffekt bei Zitat-Box
    quoteBox.classList.remove('show'); // Vorherigen Effekt entfernen
    setTimeout(() => {
        quoteBox.classList.add('show'); // Neuen Übergangseffekt anzeigen
    }, 100);

    // Twitter-Link aktualisieren
    const twitterButton = document.getElementById('twitter');
    twitterButton.href = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;
}

// Event Listener für den Button
document.getElementById('new-quote').addEventListener('click', newQuote);

// Quotes beim Laden der Seite holen
getQuotes();
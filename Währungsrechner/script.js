
document.getElementById('waehrungsForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seite neu laden)

    // Eingabewerte holen
    const betrag = parseFloat(document.getElementById('betrag').value);
    const waehrung = document.getElementById('waehrung').value.toUpperCase(); // Großbuchstaben für die Währungscodes

    try {
        // Abrufen des aktuellen Wechselkurses von der API
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${betrag}&to=${waehrung}`);
        
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Wechselkurse.');
        }

        const data = await response.json();

        // Berechnung des umgerechneten Betrags
        const umgerechneterBetrag = data.rates[waehrung];

        // Ergebnis anzeigen
        const ergebnisDiv = document.getElementById('ergebnis');
        ergebnisDiv.textContent = `Der Betrag in ${waehrung} ist: ${umgerechneterBetrag.toFixed(2)}`;

    } catch (error) {
        // Fehlerbehandlung
        console.error('Fehler:', error);
        const ergebnisDiv = document.getElementById('ergebnis');
        ergebnisDiv.textContent = 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.';
    }
});
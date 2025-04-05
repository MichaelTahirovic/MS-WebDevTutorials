// inside script.js
// all of our quotes
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
    'Michael is the best and I love him so much.'
    ];
// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
let scoreTime = 0;
let scoreWPM = 0;
let scoreAdded = false;
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

showScoreboard();
function showScoreboard() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    updateScoreboard(scores);
}

document.getElementById('start').addEventListener('click', startGame);

function startGame() {
    // get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    // Put the quote into an array of words
    words = quote.split(' ');
    // Reset the word index for tracking
    wordIndex = 0;

    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(word => `<span>${word} </span>`);
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';

    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // set the event handler

    // start the timer
    startTime = new Date().getTime();
}

typedValueElement.addEventListener('input', checkMatch);

function checkMatch() {
    // get curent word to be typed
    const currentWord = words[wordIndex];
    // get current value of the input box
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        // end of sentence
        typedValueElement.value = '';
        // display success
        const elapsedTime = new Date().getTime() - startTime;
        scoreTime = elapsedTime / 1000;
        scoreWPM = (words.length / (elapsedTime / 1000) * 60).toFixed(2);
        const message = `Congratulations! You finished in ${scoreTime} seconds with a WPM of ${scoreWPM}.`;
        messageElement.innerText = message;
        scoreAdded = false;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        // end of word
        // clear the typedValueElement for the new word
        typedValueElement.value = '';
        // move to the next word
        wordIndex++;
        // reset the class name for all elements in quote
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        // highlight the next word
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        // currently correct
        // highlight the next word
        typedValueElement.className = '';
    } else {
        // error state
        typedValueElement.className = 'error';
    }
}

document.getElementById('submitName').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    let scores = JSON.parse(localStorage.getItem('scores')) || [];

    if (name && scoreTime && scoreAdded === false) {
        const score = {
            name: name,
            scoreTime: scoreTime,
            scoreWPM: scoreWPM,
        };

        scores.push(score);
        scores.sort((a, b) => a.scoreTime - b.scoreTime);

        if (scores.length > 10) {
            scores = scores.slice(0, 10);
        }

        localStorage.setItem('scores', JSON.stringify(scores));
        updateScoreboard(scores);
        scoreAdded = true;
    } else if (!scoreTime) {
        alert('Please play the game first to submit a score.');
    } else if (!name) {
        alert('Please enter your name.');
    } else if (scoreAdded) {
        alert('You have already submitted a score for this game. Please play again to submit a new score.');
    }
});

function updateScoreboard(scores) {
    const scoreboard = document.getElementById('leaderboard-body');
    scoreboard.innerHTML = '';

    if (scores.length > 0) {
        scores.forEach((score) => {
            const scoreItem = document.createElement('li');
            scoreItem.textContent = `${score.name}: ${score.scoreTime.toFixed(2)} seconds, ${score.scoreWPM} WPM`;
            scoreboard.appendChild(scoreItem);
        });
    } else {
        scoreboard.innerHTML = '<li>No scores yet.</li>';
    }
}
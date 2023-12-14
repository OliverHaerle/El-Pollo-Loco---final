let canvas;
let world;
let keyboard = new Keyboard();

/**
 * This function intializes the game. It hides unnecessary buttons and initiates intervals that check if the player wins/loses the game.
 * 
 */
function init() {
    const screenWidth = window.screen.width;
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    handleButtons();
    checkGameOverScreen();
    checkWinScreen();
    document.getElementById('story-div').classList.add('d-none');
    enemiesStartWalking();
    assignDisplayNone('start-screen');
    if (screenWidth < 1024) {
        document.getElementById('mobile-controls-container').classList.remove('d-none');
    }
}


/**
 * This function lets the user reload the site i.e. replay the game
 * 
 */
function playAgain() {
    window.location.replace('index.html');
}

/**
 *  This function hides the story-button and displays the mute-button
 * 
 */
function handleButtons() {
    document.getElementById('start-button').classList.add('d-none');
    document.getElementById('mute-button').classList.remove('d-none');
}

/**
 * This button displays the game's story
 * 
 */
function showStory() {
    document.getElementById('story-div').classList.toggle('d-none');
}

/**
 * This function repeatedly checks whether the player has won the game
 * 
 */
function checkWinScreen() {
    setInterval(() => {
        if (world.enemies[7].energy <= 0) {
            muteSounds();
            showReplayButton();
            setTimeout(() => {
                document.getElementById('win').classList.remove('d-none');
                showScore();
            }, 2000);
        }
    }, 1000);
};

/**
 * This function mutes all sounds
 * 
 */
function muteSounds() {
    world.character.sounds.forEach((sound) =>
    sound.muted = true);
}

/**
 * This function calculates and displays the final score. Depending on the score, a different message is displayed
 * 
 */
function showScore() {
    let score = 600 + world.character.coins * 100 - world.enemiesKilled * 100 + world.character.energy * 100;
    const message = document.getElementById('message');
    document.getElementById('score').innerHTML = `Your final score is: ${score}`
    if (score == 1600) {
        message.innerHTML = 'You saved all the chickens and collected all the coins!'
    } else if (score < 900) {
        message.innerHTML = "Don't harm the chickens and collect more coins!"
    } else {
        message.innerHTML = "Not bad! Read the story for more tips!"
    }
}

/**
 * This function checks for the two different ways the player can lose the game (player has no energy left/the endboss gets away)
 * 
 */
function checkGameOverScreen() {
    const mobilebuttons = document.getElementById('mobile-controls-container');
    setInterval(() => {
        if (world.character.energy == 0) {
            document.getElementById('game-over').classList.remove('d-none');
            showReplayButton();
            assignDisplayNone('mute-button');
            mobilebuttons.classList.add('d-none');
        } else if (world.enemies[7].x < 0) {
            document.getElementById('game-over-chicken-fled').classList.remove('d-none');
            showReplayButton();
            assignDisplayNone('mute-button');
            mobilebuttons.classList.add('d-none');
        }
    }, 1000);
}

/**
 * this function displays the replay button
 * @param {string} source- This is a contact's index on the list
 */
function showReplayButton() {
    setTimeout(() => {
        document.getElementById('play-again').classList.remove('d-none');
    }, 4000);
}

/**
 * This function assigns display-none to respective container
 * 
 */
function assignDisplayNone(source) {
    document.getElementById(source).classList.add('d-none');
}

/**
 * This function lets the chickens start walking
 * 
 */
function enemiesStartWalking() {
    world.enemies.forEach(enemy => {
        enemy.gameStarted = true;
    });
}

/**
 * The event listeners below handle the controls
 * 
 */
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        keyboard.UP = true;

    } else if (e.key === 'ArrowRight') {
        keyboard.RIGHT = true;

    } else if (e.key === 'ArrowDown') {
        keyboard.DOWN = true;

    } else if (e.key === 'ArrowLeft') {
        keyboard.LEFT = true;

    } else if (e.key === ' ') {
        keyboard.SPACE = true;

    } else if (e.key === 'd') {
        keyboard.D = true
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') {
        keyboard.UP = false;

    } else if (e.key === 'ArrowRight') {
        keyboard.RIGHT = false;

    } else if (e.key === 'ArrowDown') {
        keyboard.DOWN = false;

    } else if (e.key === 'ArrowLeft') {
        keyboard.LEFT = false;

    } else if (e.key === ' ') {
        keyboard.SPACE = false;
    } else if (e.key === 'd') {
        keyboard.D = false
    }
});

window.addEventListener("load", ()=>{
    document.getElementById("left-button").addEventListener("touchstart", (e)=>{
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById("left-button").addEventListener("touchend", (e)=>{
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById("right-button").addEventListener("touchstart", (e)=>{
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById("right-button").addEventListener("touchend", (e)=>{
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    
    document.getElementById("jump-button").addEventListener("touchstart", (e)=>{
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById("jump-button").addEventListener("touchend", (e)=>{
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById("throw-button").addEventListener("touchstart", (e)=>{
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById("throw-button").addEventListener("touchend", (e)=>{
        e.preventDefault();
        keyboard.D = false;
    });
})
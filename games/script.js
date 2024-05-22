// Function to load a game when a thumbnail is clicked
function loadGame(gameURL) {
    const gameFrame = document.getElementById("gameFrame");
    gameFrame.src = gameURL;

    // Hide the game thumbnails
    const gameThumbnails = document.getElementById("gameThumbnails");
    gameThumbnails.style.transform = "translateY(550px)"; // Adjust this value as needed
    gameThumbnails.style.transition = "transform 1s";

    // Show the game container (iframe) and move it slightly to the left
    const gameContainer = document.getElementById("gameContainer");
    gameContainer.classList.remove("hidden");
    gameContainer.style.transform = "translateY(-600px) translateX(-20px)"; // Adjust the values as needed
    gameContainer.style.transition = "transform 1s";
}


// Function to search for games by name
function searchGames() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const gameThumbnails = document.getElementById("gameThumbnails");

    // Loop through game thumbnails and show/hide based on search input
    gameThumbnails.querySelectorAll(".game-thumbnail").forEach(thumbnail => {
        const gameName = thumbnail.getAttribute("data-game-url").toLowerCase();
        const displayStyle = (searchInput.length === 0 || gameName.includes(searchInput)) ? "block" : "none";
        thumbnail.style.display = displayStyle;
    });
}

// Add an event listener to the search input
document.getElementById("searchInput").addEventListener("input", searchGames);

// Add click event listeners to game thumbnails
const thumbnails = document.querySelectorAll(".game-thumbnail");
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", function () {
        const gameURL = this.getAttribute("data-game-url");
        if (gameURL) {
            loadGame(gameURL);
        }
    });
});

// Function to adjust the layout based on screen width
function adjustLayout() {
    const gameThumbnails = document.getElementById("gameThumbnails");
    const thumbnails = document.querySelectorAll(".game-thumbnail");

    if (window.innerWidth >= 768) {
        gameThumbnails.classList.remove("single-column");
        thumbnails.forEach(thumbnail => {
            thumbnail.style.width = "calc(20% - 0px)";
        });
    } else {
        gameThumbnails.classList.add("single-column");
        thumbnails.forEach(thumbnail => {
            thumbnail.style.width = "100%";
        });
    }
}

// Call the adjustLayout function initially and on window resize
window.addEventListener("load", adjustLayout);
window.addEventListener("resize", adjustLayout);

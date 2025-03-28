var hole = document.getElementById("hole");
var block = document.getElementById("block");
var bird = document.getElementById("bird");
var game = document.getElementById("game");
var result = document.getElementById("result");
var text = document.getElementById("text");

var score = 0;
var jumping = 0;
var gravity = 2; // Slower fall speed

// Generate random hole position every time
hole.addEventListener("animationiteration", function () {
    var random = -((Math.random() * 250) + 100); // More variety in hole positions
    hole.style.top = random + "px";
    score++;
});

// Bird falls due to gravity
var fall = setInterval(function () {
    var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));

    if (jumping == 0) {
        bird.style.top = (birdTop + gravity) + "px";
    }

    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top")) + 500;
    var holeBottom = holeTop + 130; // Define safe passing area

    // Collision Detection: Bird loses only if it touches the pillars (not the safe zone)
    if ((birdTop > 450) || 
        (blockLeft < 50 && blockLeft > -50 && 
        (birdTop < holeTop || birdTop > holeBottom))) {
            result.style.display = "block";
            text.innerText = `Your Final Score: ${score}`;
            game.style.display = "none";
            clearInterval(fall); // Stop game loop
        }
}, 20); // Smoother motion

// Handle Up & Down Movement
window.addEventListener("keydown", function (event) {
    var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));

    if (event.key === "ArrowUp" || event.key === " ") { // Jump with Spacebar or ArrowUp
        if (birdTop > 10) {
            bird.style.top = (birdTop - 50) + "px"; // Move Up
        }
    } else if (event.key === "ArrowDown") { // Move Down
        if (birdTop < 450) {
            bird.style.top = (birdTop + 50) + "px"; // Move Down
        }
    }
});
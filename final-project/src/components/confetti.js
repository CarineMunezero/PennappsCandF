let confettiColors = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#00ffff",
  "#ff00ff",
];
let confettiPieces = [];

function createConfettiPiece(x, y) {
  return {
    x: x,
    y: y,
    xVelocity: Math.random() * 2 - 1,
    yVelocity: Math.random() * 2 - 1,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
  };
}

function updateConfettiPiece(piece) {
  piece.x += piece.xVelocity;
  piece.y += piece.yVelocity;

  if (
    piece.x < 0 ||
    piece.x > window.innerWidth ||
    piece.y < 0 ||
    piece.y > window.innerHeight
  ) {
    // If the piece has moved off screen, reset it to the top and give it a new random velocity and color.
    piece.x = Math.random() * window.innerWidth;
    piece.y = 0;
    piece.xVelocity = Math.random() * 2 - 1;
    piece.yVelocity = Math.random() * 2 - 1;
    piece.color =
      confettiColors[Math.floor(Math.random() * confettiColors.length)];
  }
}

export function startConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create the initial confetti pieces.
  for (let i = 0; i < 100; i++) {
    confettiPieces.push(
      createConfettiPiece(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      )
    );
  }

  function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach((piece) => {
      context.fillStyle = piece.color;
      context.fillRect(piece.x, piece.y, 10, 10);
      updateConfettiPiece(piece);
    });

    requestAnimationFrame(update);
  }

  update();
}

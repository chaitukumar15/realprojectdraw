const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let isErasing = false;
let penSize = 5;
let penColor = "#000000";
let bgColor = "#ffffff";

// Set canvas size dynamically
canvas.width = window.innerWidth * 0.8;
canvas.height = 400;
canvas.style.backgroundColor = bgColor;

const penButton = document.getElementById("pen");
const eraserButton = document.getElementById("eraser");
const clearButton = document.getElementById("clear");
const penSizeInput = document.getElementById("pen-size");
const penColorInput = document.getElementById("pen-color");
const bgColorInput = document.getElementById("bg-color");

// Functions for drawing and erasing
function startDrawing(e) {
  isDrawing = true;
  ctx.beginPath();
  const x = e.clientX ? e.clientX : e.touches[0].clientX;
  const y = e.clientY ? e.clientY : e.touches[0].clientY;
  ctx.moveTo(x - canvas.offsetLeft, y - canvas.offsetTop);
}

function draw(e) {
  if (!isDrawing) return;
  const x = e.clientX ? e.clientX : e.touches[0].clientX;
  const y = e.clientY ? e.clientY : e.touches[0].clientY;

  if (isErasing) {
    ctx.clearRect(x - canvas.offsetLeft - penSize / 2, y - canvas.offsetTop - penSize / 2, penSize, penSize);
  } else {
    ctx.lineTo(x - canvas.offsetLeft, y - canvas.offsetTop);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }
}

function stopDrawing() {
  isDrawing = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.backgroundColor = bgColor;
}

// Event listeners for mouse and touch
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);

// Tool buttons
penButton.addEventListener("click", () => {
  isErasing = false;
  penButton.classList.add("active");
  eraserButton.classList.remove("active");
});

eraserButton.addEventListener("click", () => {
  isErasing = true;
  eraserButton.classList.add("active");
  penButton.classList.remove("active");
});

clearButton.addEventListener("click", clearCanvas);

// Update pen size, color, and background color
penSizeInput.addEventListener("input", (e) => {
  penSize = e.target.value;
});

penColorInput.addEventListener("input", (e) => {
  penColor = e.target.value;
});

bgColorInput.addEventListener("input", (e) => {
  bgColor = e.target.value;
  canvas.style.backgroundColor = bgColor;
});
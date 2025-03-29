/*
 Selecting elements
Finds HTML elements using their id and stores them in JavaScript variables so we can interact with them.
gridContainer stores the grid where drawing happens.
clearButton stores the button to clear the grid.
eraserButton stores the eraser tool button.
resizeButton stores the button to resize the grid.
colorPicker stores the color selector input.
*/
const gridContainer = document.getElementById("grid-container");
const clearButton = document.getElementById("clearButton");
const eraserButton = document.getElementById("eraserButton");
const resizeButton = document.getElementById("resizeButton");
const colorPicker = document.getElementById("colorPicker");

/* 
currentColor stores the selected drawing color.
gridSize is set to 16 (default size of the grid).
isDrawing tracks whether the user is drawing (true when the mouse is clicked).
isErasing tracks whether the eraser is active.
*/
let currentColor = colorPicker.value;
let gridSize = 16;  // Default grid size
let isDrawing = false;
let isErasing = false;

/*Function to create grid
 Clears the grid (gridContainer.innerHTML = "").
Sets grid size dynamically using CSS Grid properties.
Example:
If size = 16, it creates 16 rows and 16 columns.
*/
function createGrid(size) {
    gridContainer.innerHTML = ""; // Clear existing grid
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    /*
    Creates individual squares inside the grid
    Adds the class "grid-square" to style them
     Example:
     If size = 16, the loop runs 16 × 16 = 256 times to create 256 squares
    */
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");

        /*
        Mouse events for drawing
        When the user clicks on a square (mousedown event):
        Sets isDrawing = true
        If eraser is active, color becomes white
        If eraser is NOT active, color becomes currentColor
        */
        square.addEventListener("mousedown", () => {
            isDrawing = true;
            square.style.backgroundColor = isErasing ? "white" : currentColor;
        });

        // While moving the mouse (mouseenter event):
        // If isDrawing = true, it colors the square
        square.addEventListener("mouseenter", () => {
            if (isDrawing) {
                square.style.backgroundColor = isErasing ? "white" : currentColor;
            }
        });

        // Stops drawing (mouseup event)
        square.addEventListener("mouseup", () => {
            isDrawing = false;
        });

        // Adds each square to the grid
        gridContainer.appendChild(square);
    }
}
// Function to clear grid
// Finds all grid squares and resets them to white
function clearGrid() {
    document.querySelectorAll(".grid-square").forEach(square => {
        square.style.backgroundColor = "white";
    });
}

// Function to toggel eraser
// If eraser is ON, button turns red.
// f eraser is OFF, button turns white.
function toggleEraser() {
    isErasing = !isErasing;
    eraserButton.style.backgroundColor = isErasing ? "red" : "white";
}

/*
Function to resize grid
Asks the user for a new grid size.
Converts input from text to a number.
*/
function resizeGrid() {
    let newSize = prompt("Enter new grid size (max 64):", gridSize);
    newSize = parseInt(newSize);

    /*
    Validates input (must be between 1 and 64).
    If valid, creates a new grid with the new size.
    */
    if (isNaN(newSize) || newSize < 1 || newSize > 64) {``
        alert("Please enter a number between 1 and 64.");
    } else {
        gridSize = newSize;
        createGrid(gridSize);
    }
}

/*
Event Listeners
Runs functions when the user clicks buttons:
"Clear" button → Clears the grid.
"Eraser" button → Toggles eraser mode.
"Resize Grid" button → Resizes the grid.
"Color Picker" → Changes drawing color.
*/
clearButton.addEventListener("click", clearGrid);
eraserButton.addEventListener("click", toggleEraser);
resizeButton.addEventListener("click", resizeGrid);
colorPicker.addEventListener("input", () => currentColor = colorPicker.value);

// Initialize grid
createGrid(gridSize);

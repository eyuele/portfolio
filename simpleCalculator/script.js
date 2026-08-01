
const display = document.getElementById("calcin");

function appendToDisplay(buttonInput) {
    display.value += buttonInput;
}


function clearDisplay() {
    display.value = "";
}

function calc() {
    try {
        display.value = eval(display.value)
    }
    catch (error) {
        display.value = "Error"
    }
}
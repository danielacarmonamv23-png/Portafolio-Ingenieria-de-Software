const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");

let expression = "";
let justCalculated = false;

function updateDisplay(value = expression) {
  if (value === "") {
    display.textContent = "0";
    return;
  }

  const visualValue = value
    .replace(/\*/g, " × ")
    .replace(/\//g, " ÷ ")
    .replace(/\+/g, " + ")
    .replace(/-/g, " − ");

  display.textContent = visualValue;
}

function appendValue(value) {
  if (justCalculated && /[0-9.]/.test(value)) {
    expression = "";
    justCalculated = false;
  }

  if (value === "%") {
    if (expression === "" || /[+\-*/.]$/.test(expression)) return;
    expression += "/100";
  } else if (/[+\-*/]/.test(value)) {
    if (expression === "" && value !== "-") return;

    if (/[+\-*/]$/.test(expression)) {
      expression = expression.slice(0, -1) + value;
    } else {
      expression += value;
    }
    justCalculated = false;
  } else if (value === ".") {
    const currentNumber = expression.split(/[+\-*/]/).pop();
    if (!currentNumber.includes(".")) {
      expression += currentNumber === "" ? "0." : ".";
    }
    justCalculated = false;
  } else {
    expression += value;
    justCalculated = false;
  }

  updateDisplay();
}

function clearCalculator() {
  expression = "";
  justCalculated = false;
  updateDisplay();
}

function deleteLast() {
  if (justCalculated) {
    clearCalculator();
    return;
  }

  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  if (!expression) return;

  if (/[+\-*/.]$/.test(expression)) {
    expression = expression.slice(0, -1);
  }

  try {
    // La expresión solo puede contener números y operadores insertados por los botones.
    const result = Function('"use strict"; return (' + expression + ')')();

    if (!Number.isFinite(result)) {
      throw new Error("Resultado no válido");
    }

    expression = String(Number(result.toFixed(10)));
    justCalculated = true;
    display.textContent = expression;
  } catch (error) {
    display.textContent = "Error";
    expression = "";
    justCalculated = true;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === "clear") clearCalculator();
    else if (action === "delete") deleteLast();
    else if (action === "calculate") calculate();
    else appendValue(value);
  });
});

document.addEventListener("keydown", (event) => {
  const allowed = "0123456789.+-*/%";

  if (allowed.includes(event.key)) {
    appendValue(event.key);
  } else if (event.key === "Enter" || event.key === "=") {
    calculate();
  } else if (event.key === "Backspace") {
    deleteLast();
  } else if (event.key === "Escape") {
    clearCalculator();
  }
});

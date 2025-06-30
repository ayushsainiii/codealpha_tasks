const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let expression = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value === "C") {
      expression = "";
    } else if (value === "←") {
      expression = expression.slice(0, -1);
    } else if (value === "=") {
      try {
        expression = eval(expression).toString();
      } catch {
        expression = "Error";
      }
    } else {
      expression += value;
    }

    display.value = expression;
  });
});

// Bonus: Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if ("0123456789+-*/.".includes(key)) {
    expression += key;
  } else if (key === "Enter") {
    try {
      expression = eval(expression).toString();
    } catch {
      expression = "Error";
    }
  } else if (key === "Backspace") {
    expression = expression.slice(0, -1);
  } else if (key.toLowerCase() === "c") {
    expression = "";
  }

  display.value = expression;
});

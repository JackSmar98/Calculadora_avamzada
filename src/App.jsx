import React, { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (operator === "+") {
      return firstOperand + inputValue;
    } else if (operator === "-") {
      return firstOperand - inputValue;
    } else if (operator === "*") {
      return firstOperand * inputValue;
    } else if (operator === "/") {
      return firstOperand / inputValue;
    }

    return inputValue;
  };

  const calculateResult = () => {
    if (!operator || firstOperand === null) {
      return;
    }

    const result = performCalculation();
    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="calculator-display">{display}</div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button className="key-clear" onClick={clearDisplay}>
                AC-
              </button>
            </div>
            <div className="digit-keys">
              <button onClick={() => inputDigit("7")}>7</button>
              <button onClick={() => inputDigit("8")}>8</button>
              <button onClick={() => inputDigit("9")}>9</button>
              <button onClick={() => inputDigit("4")}>4</button>
              <button onClick={() => inputDigit("5")}>5</button>
              <button onClick={() => inputDigit("6")}>6</button>
              <button onClick={() => inputDigit("1")}>1</button>
              <button onClick={() => inputDigit("2")}>2</button>
              <button onClick={() => inputDigit("3")}>3</button>
              <button onClick={() => inputDigit("0")}>0</button>
              <button onClick={inputDecimal}>.</button>
              <button onClick={calculateResult}>=</button>
            </div>
          </div>
          <div className="operator-keys">
            <button onClick={() => handleOperator("/")}>÷</button>
            <button onClick={() => handleOperator("*")}>×</button>
            <button onClick={() => handleOperator("-")}>−</button>
            <button onClick={() => handleOperator("+")}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

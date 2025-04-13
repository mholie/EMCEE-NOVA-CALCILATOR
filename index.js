
import React, { useState } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";

function CalculatorApp() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleCalculate = () => {
    try {
      const evalResult = eval(
        input.replace(/sin\(/g, "Math.sin(")
             .replace(/cos\(/g, "Math.cos(")
             .replace(/tan\(/g, "Math.tan(")
             .replace(/sqrt\(/g, "Math.sqrt(")
             .replace(/log\(/g, "Math.log(")
             .replace(/\^/g, "**")
      );
      setResult(evalResult.toString());
    } catch {
      setResult("Error");
    }
  };

  const scientificButtons = ["sin(", "cos(", "tan(", "sqrt(", "log(", "^"];
  const basicButtons = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "+", "="];

  return (
    <div style={{ fontFamily: 'Arial', padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h2>AI Scientific Calculator</h2>
      <div style={{ border: '1px solid #ccc', padding: 10, fontSize: 18 }}>
        {input || "0"}
        <div style={{ fontSize: 14, color: '#666' }}>= {result || ""}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 10 }}>
        {scientificButtons.map((char) => (
          <button key={char} onClick={() => handleClick(char)}>{char}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 10 }}>
        {basicButtons.map((char) => (
          <button key={char} onClick={() => (char === "=" ? handleCalculate() : handleClick(char))}>{char}</button>
        ))}
        <button style={{ gridColumn: 'span 4', backgroundColor: '#f55', color: '#fff' }} onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<CalculatorApp />);

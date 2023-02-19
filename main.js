"use strict";

function getData(form) {
  var formData = new FormData(form);

  const truthTable = formData
    .get("truth-table")
    .split("\n")
    .map((el) => el.split(":"));
  const logicGates = formData.getAll("logic-gates");
  const isValid = truthTable.every((el, idx, arr) => {
    return (
      el[0].length === arr[idx - 1 > 0 ? idx - 1 : 0][0].length &&
      el[1].length === arr[idx - 1 > 0 ? idx - 1 : 0][1].length &&
      !el[0].match(/\D|[^0-1]/) &&
      !el[1].match(/\D|[^0-1]/) &&
      truthTable.length === Math.pow(2, truthTable[0][0].length)
    );
  });
  const Error = !truthTable.every(
    (el, idx, arr) =>
      el[0].length === arr[idx - 1 > 0 ? idx - 1 : 0][0].length &&
      el[1].length === arr[idx - 1 > 0 ? idx - 1 : 0][1].length
  )
    ? "Each row must be same size"
    : !truthTable.every(
        (el) => !el[0].match(/\D|[^0-1]/) && !el[1].match(/\D|[^0-1]/)
      )
    ? "Allowed only 1 and 0"
    : isValid && !truthTable.length === Math.pow(2, truthTable[0][0].length)
    ? `Must be covered all possible varians: ${Math.pow(
        2,
        truthTable[0][0].length
      )}, current: ${truthTable.length}`
    : "";
  const numberOfInputs = isValid ? truthTable[0][0].length : 0;
  const numberOfOutputs = isValid ? truthTable[0][1].length : 0;
  return {
    truthTable,
    logicGates,
    isValid,
    Error,
    IO: [numberOfInputs, numberOfOutputs],
  };
}

function applyLogicGate(numInputs, gateType) {
  const numCombinations = Math.pow(2, numInputs);
  const outputArray = [];

  for (let i = 0; i < numCombinations; i++) {
    const inputBits = i.toString(2).padStart(numInputs, "0");
    let output = inputBits + " " + parseInt(inputBits, 2) + ": ";

    if (gateType === "AND") {
      output += parseInt(inputBits, 2) & parseInt("1".repeat(numInputs), 2);
    } else if (gateType === "OR") {
      output += parseInt(inputBits, 2);
    } else if (gateType === "NOT") {
      output += parseInt(inputBits, 2);
    } else {
      // Handle unsupported gate type
    }

    outputArray.push(output);
  }

  return outputArray;
}

function applyBitwiseOperations(a, b) {
  const results = [];

  // AND
  results.push(a & b);

  // OR
  results.push(a | b);

  // XOR
  results.push(a ^ b);

  // NOT A
  results.push(~a & 0b1111);

  // NOT B
  results.push(~b & 0b1111);

  // CMP A
  results.push(a >= b ? a : 0);

  // SUB A
  results.push(a - b > 0 ? a - b : 0);

  return results;
}

function applyAllBitwiseOperations() {
  const results = [];
  const gateLabels = ["AND", "OR", "XOR", "NOT A", "NOT B", "CMP A", "SUB A"];

  for (let a = 0; a <= 15; a++) {
    for (let b = 0; b <= 15; b++) {
      const bitwiseResults = applyBitwiseOperations(a, b);
      const labeledResults = [a, b];

      for (let i = 0; i < bitwiseResults.length; i++) {
        labeledResults.push(`${gateLabels[i]}: ${bitwiseResults[i]}`);
      }

      results.push(labeledResults);
    }
  }

  return results;
}

function displayAllBitwiseOperations() {
  const allLabeledResults = applyAllBitwiseOperations();

  const resultDiv = document.createElement("div");
  resultDiv.classList.add("logic-output");

  let firstRun = true;

  for (let i = 0; i < allLabeledResults.length; i++) {
    const resultSetDiv = document.createElement("div");
    resultSetDiv.classList.add("input-output-set");

    const resultInputParagraph = document.createElement("p");
    resultInputParagraph.textContent = `a = ${allLabeledResults[i][0]}, b = ${allLabeledResults[i][1]}`;
    resultSetDiv.appendChild(resultInputParagraph);

    const resultOutputParagraph = document.createElement("p");
    resultOutputParagraph.classList.add("output-wrapper");

    // Create a span element for each output value
    for (let j = 2; j < allLabeledResults[i].length; j++) {
      const span = document.createElement("span");
      span.textContent = allLabeledResults[i][j];
      span.setAttribute(
        "data-category",
        allLabeledResults[i][j].substring(
          0,
          allLabeledResults[i][j].indexOf(":")
        )
      );
      resultOutputParagraph.appendChild(span);
    }

    resultSetDiv.appendChild(resultOutputParagraph);

    if (i % 16 === 0 && !firstRun) {
      const separator = document.createElement("div");
      separator.classList.add("separator");
      resultDiv.appendChild(separator);
    }

    resultDiv.appendChild(resultSetDiv);

    firstRun = false;
  }

  const existingOutputDiv = document.querySelector(".logic-output");
  if (existingOutputDiv) {
    existingOutputDiv.innerHTML = resultDiv.innerHTML;
  } else {
    document.body.appendChild(resultDiv);
  }
}

window.onload = function () {
  displayAllBitwiseOperations();
};

document.getElementById("logic-tt").addEventListener("submit", function (e) {
  e.preventDefault();
  const data = getData(e.target);
  console.log(`${JSON.stringify(data)}`);
});

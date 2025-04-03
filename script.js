// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select elements
  const inputField = document.getElementById("numberfield");
  const checkButton = document.getElementById("checkbutton");
  const resultDisplay = document.getElementById("result");

  // Function to check if a number is prime
  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  // Function to compute factorial
  function factorial(n) {
    if (n < 0) return "Undefined";
    let fact = 1;
    for (let i = 2; i <= n; i++) {
      fact *= i;
    }
    return fact;
  }

  // Event listener for button click
  checkButton.addEventListener("click", () => {
    const num = parseInt(inputField.value);
    if (isNaN(num)) {
      resultDisplay.textContent = "Please enter a valid number.";
      return;
    }

    // Check prime and factorial
    const primeStatus = isPrime(num) ? "a Prime number" : "not a Prime number";
    const factorialValue = factorial(num);

    // Display results
    resultDisplay.innerHTML = `The number <strong>${num}</strong> is ${primeStatus}.<br>Factorial: <strong>${factorialValue}</strong>`;
  });
});

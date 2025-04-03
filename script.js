// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select elements
  const inputField = document.getElementById("numberfield");
  const checkButton = document.getElementById("checkbutton");
  const primeButton = document.getElementById("prime-button");
  const factorialButton = document.getElementById("factorial-button");
  const resultDisplay = document.getElementById("result");
  const inputDisplay = document.getElementById("input");
  const headerDisplay = document.getElementById("header");
  let performFactorial = false;
  let performPrime = false;

  // Function to check if a number is prime

  function isPrime(n) {
    if (n <= 1) return false; // Numbers less than or equal to 1 are not prime
    if (n === 2) return true; // 2 is prime
    if (n % 2 === 0) return false; // Even numbers greater than 2 are not prime

    for (let i = 3; i * i <= n; i += 2) {
      // Check odd numbers only up to the square root of n
      if (n % i === 0) return false;
    }
    return true;
  }

  // Function to compute factorial
  function factorial(n) {
    if (n < 0) return "Undefined"; // Factorial is not defined for negative numbers
    if (n === 0 || n === 1) return 1; // 0! and 1! are both 1

    let fact = 1;
    for (let i = 2; i <= n; i++) {
      fact *= i;
    }
    return fact;
  }

  factorialButton.addEventListener("click", () => {
    if (!performFactorial) {
      factorialButton.classList.add("selected");
      performFactorial = true;
    } else {
      factorialButton.classList.remove("selected");
      performFactorial = false;
    }
  });

  primeButton.addEventListener("click", () => {
    if (!performPrime) {
      primeButton.classList.add("selected");
      performPrime = true;
    } else {
      primeButton.classList.remove("selected");
      performPrime = false;
    }
  });

  // Event listener for button click
  checkButton.addEventListener("click", () => {
    resultDisplay.className = "visible";
    const num = parseInt(inputField.value);
    inputField.value = "";

    if (isNaN(num) && performPrime && performFactorial) {
      resultDisplay.textContent = "Please enter a valid number.";
      return;
    }

    // Check prime and factorial
    const primeStatus = isPrime(num) ? "a Prime number" : "not a Prime number";
    const factorialValue = factorial(num);

    // Display results
    inputDisplay.className = "visible";
    resultDisplay.className = "visible";
    inputDisplay.innerHTML = `<strong>${num}</strong>`;
    if (performFactorial && performPrime) {
      resultDisplay.innerHTML = `The number <strong>${num}</strong> is ${primeStatus}.<br>The Factorial of <strong>${num}</strong> is <strong>${factorialValue}</strong>.`;
      headerDisplay.innerHTML = "Factorial and Prime";
    } else if (performFactorial) {
      resultDisplay.innerHTML = `The Factorial of <strong>${num}</strong> is <strong>${factorialValue}</strong>`;
      headerDisplay.innerHTML = "Factorial of a number";
    } else if (performPrime) {
      resultDisplay.innerHTML = `The number <strong>${num}</strong> is <strong>${primeStatus}</strong>`;
      headerDisplay.innerHTML = "Prime of a number";
    } else {
      resultDisplay.innerHTML = `What can i do for you today?`;
    }
  });
});

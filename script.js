// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select necessary elements
  const inputField = document.getElementById("numberfield");
  const checkButton = document.getElementById("checkbutton");
  const primeButton = document.getElementById("prime-button");
  const factorialButton = document.getElementById("factorial-button");
  const resultDisplay = document.getElementById("result");
  const inputDisplay = document.getElementById("input");
  const headerDisplay = document.getElementById("header");

  // Flags to track selected operations
  let performFactorial = false;
  let performPrime = false;

  // Global variable to track the current typewriter timeout
  let typewriterTimeout = null;

  /**
   * Checks whether a given number is prime.
   * @param {number} n - The number to check.
   * @returns {boolean} - True if prime, otherwise false.
   */
  function isPrime(n) {
    if (!Number.isInteger(n)) return false;
    if (n <= 1) return false; // Numbers ≤ 1 are not prime
    if (n === 2) return true; // 2 is the smallest prime number
    if (n % 2 === 0) return false; // Even numbers > 2 are not prime

    // Check divisibility for odd numbers up to √n
    for (let i = 3; i * i <= n; i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  }

  /**
   * Computes the factorial of a given number.
   * @param {number} n - The number to compute factorial for.
   * @returns {string|bigint} - Factorial value or error message for invalid/too large numbers.
   */
  function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) return "Undefined"; // Factorial is not defined for negative numbers and non-integers
    if (n > 1000)
      return "a number too large! Please enter a number less than or equal to 1000.";
    if (n === 0 || n === 1) return 1n; // Base case: 0! and 1! = 1

    let fact = 1n;
    for (let i = 2; i <= n; i++) {
      fact *= BigInt(i);
    }
    return fact;
  }

  // Toggle factorial button selection
  factorialButton.addEventListener("click", () => {
    factorialButton.classList.toggle("selected");
    performFactorial = !performFactorial;
  });

  // Toggle prime button selection
  primeButton.addEventListener("click", () => {
    primeButton.classList.toggle("selected");
    performPrime = !performPrime;
  });

  //Typewriter effect for the result display
  function typeWriterEffect(text, speed) {
    // Clear any existing typewriter effect
    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
      typewriterTimeout = null;
    }

    let index = 0; //index to keep track of the letters
    resultDisplay.innerHTML = ""; // Clear existing content

    function type() {
      if (index < text.length) {
        resultDisplay.innerHTML += text.charAt(index); //adds the letter to the result display
        index++;
        typewriterTimeout = setTimeout(type, speed); //calls the type function again after the speed
      } else {
        resultDisplay.style.borderRight = "none"; //removes the blinking cursor effect
        typewriterTimeout = null;
      }
    }
    type();
  }

  // Event listener for checking number properties
  checkButton.addEventListener("click", () => {
    inputDisplay.innerHTML = ""; // Hide input display initially
    inputDisplay.className = "invisible";
    if (inputField.value !== "") {
      inputDisplay.className = "visible";
      inputDisplay.innerHTML = `<strong>${inputField.value}</strong>`;
    }

    if (inputField.value.trim() === "") {
      resultDisplay.className = "visible";
      typeWriterEffect("The input is empty.", 30);
      return;
    }

    //Prevent non-numeric input
    if (!/^-?\d+(\.\d+)?$/.test(inputField.value)) {
      resultDisplay.className = "visible";
      typeWriterEffect("Please enter a valid number.", 30);
      return;
    }

    //Convert to number
    const num = parseFloat(inputField.value);

    inputField.value = ""; // Clear input field after submission
    resultDisplay.className = "visible";

    const primeStatus = isPrime(num) ? "a Prime number" : "not a Prime number";
    const factorialValue = factorial(num);

    // Compute results based on selected operations
    if (performFactorial && performPrime) {
      resultDisplay.innerHTML = `The number ${num} is ${primeStatus} and the factorial of ${num} is ${factorialValue}`;
      typeWriterEffect(resultDisplay.innerHTML, 20);
      headerDisplay.innerHTML = "Factorial and Prime";
    } else if (performFactorial) {
      resultDisplay.innerHTML = `The Factorial of ${num} is ${factorialValue}`;
      typeWriterEffect(resultDisplay.innerHTML, 20);
      headerDisplay.innerHTML = "Factorial of a number";
    } else if (performPrime) {
      resultDisplay.innerHTML = `The number ${num} is ${primeStatus}`;
      typeWriterEffect(resultDisplay.innerHTML, 20);
      headerDisplay.innerHTML = "Prime of a number";
    } else {
      resultDisplay.innerHTML = `What can I do for you today?`;
      typeWriterEffect(resultDisplay.innerHTML, 20);
      headerDisplay.innerHTML = "What can I help with?";
    }
  });
});

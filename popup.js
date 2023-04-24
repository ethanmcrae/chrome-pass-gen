document.addEventListener("DOMContentLoaded", function () {
  const lengthInput = document.getElementById("length");
  const lengthDisplay = document.getElementById("length-display");
  const specialCharsInput = document.getElementById("special-chars");
  const generateButton = document.getElementById("generate");

  // Update the password length display
  lengthInput.addEventListener("input", function () {
    lengthDisplay.textContent = lengthInput.value;
  });

  // Generate a random password and copy to clipboard
  generateButton.addEventListener("click", function () {
    const passwordLength = parseInt(lengthInput.value);
    const includeSpecialChars = specialCharsInput.checked;

    const password = generatePassword(passwordLength, includeSpecialChars);
    copyToClipboard(password);
    window.close(); // Close the popup after generating the password
  });
});

function generatePassword(length, includeSpecialChars) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const specialChars = '!@#$%^&*()-_=+[{]}|;:",<.>/?`~';
  const allChars = includeSpecialChars ? chars + specialChars : chars;

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
}

function copyToClipboard(text) {
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

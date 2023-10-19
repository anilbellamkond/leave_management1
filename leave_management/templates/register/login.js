// Add a focus event to the employee id input field to highlight the field
document.getElementById('employee_id').addEventListener('focus', function() {
    this.classList.add('focused');
  });
  
  // Add a blur event to the employee id input field to remove the highlight
  document.getElementById('employee_id').addEventListener('blur', function() {
    this.classList.remove('focused');
  });
  
  // Add a focus event to the username input field to highlight the field
  document.getElementById('username').addEventListener('focus', function() {
    this.classList.add('focused');
  });
  
  // Add a blur event to the username input field to remove the highlight
  document.getElementById('username').addEventListener('blur', function() {
    this.classList.remove('focused');
  });
  
  // Add a focus event to the password input field to highlight the field
  document.getElementById('password').addEventListener('focus', function() {
    this.classList.add('focused');
  });
  
  // Add a blur event to the password input field to remove the highlight
  document.getElementById('password').addEventListener('blur', function() {
    this.classList.remove('focused');
  });
  

// This is just a placeholder for generating random quotations.
const quotations = [
    "Your Success is Our Priority",
    "Innovation and Excellence",
    "Unlocking Human Potential",
    "Empowering Minds, Transforming Lives"
];

document.addEventListener("DOMContentLoaded", function () {
    const quoteElement = document.getElementById("quote");

    // Generate a random quotation and display it.
    const randomIndex = Math.floor(Math.random() * quotations.length);
    quoteElement.textContent = `"${quotations[randomIndex]}"`;
});

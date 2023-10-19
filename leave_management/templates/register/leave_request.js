// Validate the form before submitting it
const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
  // Check if all required fields are filled in
  const requiredFields = ['employee_name', 'leave_type', 'from_date', 'to_date', 'reason'];

  for (const field of requiredFields) {
    const input = document.querySelector(`input[name="${field}"]`);

    if (input.value.trim() === '') {
      event.preventDefault();
      input.classList.add('error');
      alert(`Please fill in the ${field} field.`);
      return;
    }
  }

  // Check if the from date is before the to date
  const fromDate = new Date(document.querySelector('input[name="from_date"]').value);
  const toDate = new Date(document.querySelector('input[name="to_date"]').value);

  if (fromDate > toDate) {
    event.preventDefault();
    alert('The from date must be before the to date.');
    return;
  }

  // Check if the file is a valid PDF, DOC, or DOCX file
  const file = document.querySelector('input[name="file"]').files[0];

  if (file && !file.type.match(/pdf|doc|docx/)) {
    event.preventDefault();
    alert('The file must be a PDF, DOC, or DOCX file.');
    return;
  }

  // Submit the form if all validation checks pass
  form.submit();
});

// Remove the error class from inputs when they are focused
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('focus', function() {
    this.classList.remove('error');
  });
});




document.addEventListener('DOMContentLoaded', function() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const fileInput = document.getElementById('fileInput');
    const form = document.querySelector('form');
  
    // Function to check if the date difference is greater than 3 days
    function isDateDifferenceGreaterThan3Days(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = Math.abs(end - start);
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
      return daysDiff > 3;
    }
  
    // Function to check the start date vs end date
    function checkStartDateVsEndDate() {
      const startDate = new Date(startDateInput.value);
      const endDate = new Date(endDateInput.value);
  
      if (startDate > endDate) {
        alert('Start Date cannot be greater than End Date');
      }
    }
  
    // Function to check the date difference and display the file input accordingly
    function checkDateDifference() {
      if (isDateDifferenceGreaterThan3Days(startDateInput.value, endDateInput.value)) {
        fileInput.style.display = 'block';
      } else {
        fileInput.style.display = 'none';
      }
  
      return true;
    }
  
    endDateInput.addEventListener('change', checkDateDifference);
    startDateInput.addEventListener('change', checkDateDifference);
    endDateInput.addEventListener('change', checkStartDateVsEndDate);
  });
  




















// document.addEventListener('DOMContentLoaded', function() {
//         const startDateInput = document.getElementById('startDate');
//         const endDateInput = document.getElementById('endDate');
        
//         const fileInput = document.getElementById('fileInput');
//         const form = document.querySelector('form');
    
        
        
//         // Function to check if the date difference is greater than 3 days
//         function isDateDifferenceGreaterThan3Days(startDate, endDate) {
//             const start = new Date(startDate);
//             const end = new Date(endDate);
//             const timeDiff = Math.abs(end - start);
//             const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            
//             return daysDiff > 3;
//         } 

//         function checkDateDifference() {
//             if (isDateDifferenceGreaterThan3Days(startDateInput.value, endDateInput.value)) {
//                 // Append the file input below the "Reason" textarea
//                 fileInput.style.display = 'block';
//                 form.onsubmit = null;
//             } else {
//                 // Remove the file input if it exists
//                 fileInput.removeAttribute('required');
//                 fileInput.style.display = 'none'; 
//                 form.onsubmit = function(event) {
//                     event.preventDefault();
//                 };
//             }
//             return true;
//         }

        
//         endDateInput.addEventListener('change', checkDateDifference); 
//         startDateInput.addEventListener('change', checkDateDifference);

//         function checkStartDateVsEndDate() {
//             const startDate = new Date(startDateInput.value);
//             const endDate = new Date(endDateInput.value);

//             if (startDate > endDate) {
//                 alert('Start Date cannot be greater than End Date');
//             }
//         }

//         endDateInput.addEventListener('change', checkStartDateVsEndDate); 
        

//     })
try {
document.addEventListener('DOMContentLoaded', function() {
  const startDateInput = document.getElementById('startDate');
  const endDateInput = document.getElementById('endDate');
  const fileInput = document.getElementById('fileInput');
  const leaveTypeInput = document.getElementById('leave_types');
  const warning1 = document.getElementById('warning1')

  const form = document.querySelector('form');


  // Function to check if the date difference is greater than 3 days
  function isDateDifferenceGreaterThan3Days(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end - start);
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff > 3;
  }  


  function isDateDifferenceGreaterThan2Days(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end - start);
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff > 2;
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
     fileInput.required = true;
    } else {
      fileInput.style.display = 'none';
      fileInput.required = false;
    }

    if(isDateDifferenceGreaterThan2Days(startDateInput.value, endDateInput.value) && leaveTypeInput.value === "Casual Leave" ){
      warning1.style.display = 'block';
      
    }
    else{
      warning1.style.display = 'none';
    }

    console.log(leaveTypeInput.value)

    return true;
  }

  endDateInput.addEventListener('change', checkDateDifference);
  startDateInput.addEventListener('change', checkDateDifference);
  leaveTypeInput.addEventListener('change', checkDateDifference);
  endDateInput.addEventListener('change', checkStartDateVsEndDate);
});



setTimeout(function() {
  var notification = document.getElementById('notification');
  if (notification) {
      notification.style.display = 'none';
  }
}, 7000);



}


catch(error){
  console.error("error please :" +error )
}
// document.addEventListener('DOMContentLoaded', function() {
//     const startDateInput = document.getElementById('startDate');
//     const endDateInput = document.getElementById('endDate');
//     const fileInput = document.getElementById('fileInput');
//     const form = document.querySelector('form');
  
//     // Function to check if the date difference is greater than 3 days
//     function isDateDifferenceGreaterThan3Days(startDate, endDate) {
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       const timeDiff = Math.abs(end - start);
//       const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
//       return daysDiff > 3;
//     }
  
//     // Function to check the start date vs end date
//     function checkStartDateVsEndDate() {
//       const startDate = new Date(startDateInput.value);
//       const endDate = new Date(endDateInput.value);
  
//       if (startDate > endDate) {
//         alert('Start Date cannot be greater than End Date');
//       }
//     }
  
//     // Function to check the date difference and display the file input accordingly
//     function checkDateDifference() {
//       if (isDateDifferenceGreaterThan3Days(startDateInput.value, endDateInput.value)) {
//         fileInput.style.display = 'block';
//       } else {
//         fileInput.style.display = 'none';
//       } 

//       var leaveType = document.getElementById("leave_type").value;

//       if (leaveType === "Casual Leave") {
//         // Get the start and end dates
//         var startDate = new Date(document.getElementById("startDate").value);
//         var endDate = new Date(document.getElementById("endDate").value);

//         // Calculate the date difference in days
//         var timeDifference = endDate - startDate;
//         var dateDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

//         // Check if the difference is greater than 2 days
//         if (dateDifference > 2) {
//             alert("Casual Leave cannot exceed more than two days.");
//             return false; // Prevent form submission
//         }
//     }
  
//       return true;
//     }
  
//     endDateInput.addEventListener('change', checkDateDifference);
//     startDateInput.addEventListener('change', checkDateDifference);
//     endDateInput.addEventListener('change', checkStartDateVsEndDate);
//   });
  

//   function checkDateDifference() {
//     // Get the selected leave type
//     var leaveType = document.getElementById("leave_type").value;

//     // Check if the selected leave type is "Casual Leave"
//     if (leaveType === "Casual Leave") {
//         // Get the start and end dates
//         var startDate = new Date(document.getElementById("startDate").value);
//         var endDate = new Date(document.getElementById("endDate").value);

//         // Calculate the date difference in days
//         var timeDifference = endDate - startDate;
//         var dateDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

//         // Check if the difference is greater than 2 days
//         if (dateDifference > 2) {
//             alert("Casual Leave cannot exceed more than two days.");
//             return false; // Prevent form submission
//         }
//     }

//     return true; // Allow form submission for other cases
// }


















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
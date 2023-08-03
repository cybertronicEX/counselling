//-------------ADD-------------------------------------------------------
// Get the modal
var modal = document.getElementById("modal-form");

var editModal = document.getElementById("edit-modal-form");

// Get the button that opens the modal
var addButton = document.querySelector(".button-container button");

// Get the <span> element that closes the modal
var closeSpan = document.querySelector(".close");

// When the Add button is clicked, open the modal form
function openModal() {
  modal.style.display = "block";
}

// When the Close (x) button is clicked, close the modal form
function closeModal() {
  modal.style.display = "none";
}

// When the user submits the form, add the counsellor details to the table
function addCounsellor() {
  // Get the input values from the form
  var counsellorId = document.getElementById("counsellor-id").value;
  var NIC = document.getElementById("NIC").value;
  var FullName = document.getElementById("FullName").value;
  var Address = document.getElementById("Address").value;
  var PhoneNo = document.getElementById("PhoneNo").value;
  var DOB = document.getElementById("DOB").value;
  var Gender = document.getElementById("Gender").value;
  var Education = document.getElementById("Education").value;
  var WorkHours = document.getElementById("WorkHours").value;
  // Get other input values as needed

  // Create a new table row with the input values
  var newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td contenteditable="true">${counsellorId}</td>
    <td contenteditable="true">${NIC}</td>
    <td contenteditable="true">${FullName}</td>
    <td contenteditable="true">${Address}</td>
    <td contenteditable="true">${PhoneNo}</td>
    <td contenteditable="true">${DOB}</td>
    <td contenteditable="true">${Gender}</td>
    <td contenteditable="true">${Education}</td>
    <td contenteditable="true">${WorkHours}</td>
    <!-- Add other table data cells here with corresponding input values -->
  `;

  // Append the new row to the table body
  var tableBody = document.querySelector("#counsellor-table tbody");
  tableBody.appendChild(newRow);

//   // Add event listener to the "Add" button to refresh the data after adding a new counsellor
//   document.querySelector('.button-container .Add').addEventListener('click', () => {
//   fetchCounsellorDetails();
// });
  // Close the modal form
  closeModal();

  // Prevent the default form submission behavior
  return false;
}
//--------------------------------------------------------------------------------------------------
// document.addEventListener('DOMContentLoaded', function() {
//   // Function to fetch data from the server and populate the table
//   function fetchCounsellorData() {
//     // Make an AJAX call to the PHP file that retrieves data from the database
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', 'counsellerDetails.php', true);
//     xhr.onload = function() {
//       if (xhr.status === 200) {
//         // Parse the JSON response received from the server
//         var data = JSON.parse(xhr.responseText);

//         // Generate table rows dynamically using the fetched data
//         var tableBody = document.querySelector("#counsellor-table tbody");
//         data.forEach(function(row) {
//           var newRow = document.createElement("tr");
//           newRow.innerHTML = `
//             <td contenteditable="true">${row.counsellor_id}</td>
//             <td contenteditable="true">${row.nic}</td>
//             <td contenteditable="true">${row.full_name}</td>
//             <td contenteditable="true">${row.address}</td>
//             <td contenteditable="true">${row.phone_number}</td>
//             <td contenteditable="true">${row.dob}</td>
//             <td contenteditable="true">${row.gender}</td>
//             <td contenteditable="true">${row.education}</td>
//             <td contenteditable="true">${row.work_hours}</td>
//           `;
//           tableBody.appendChild(newRow);
//         });
//       } else {
//         console.error('Error fetching data from the server.');
//       }
//     };
//     xhr.send();
//   }

//   // Call the function to fetch and populate the table on page load
//   fetchCounsellorData();
// });
//--------------------------------GET------------------------------------------------------------------

// Function to fetch Counsellor details from the server and populate the table
function fetchCounsellorDetails() {
  fetch('counsellerDetails.php')
    .then(response => response.json())
    .then(data => {
      // Clear the existing table rows
      const tableBody = document.querySelector('#counsellor-table tbody');
      tableBody.innerHTML = '';

      // Loop through the fetched data and create table rows
      data.forEach(counsellor => {
        const row = `
          <tr>
            <td>${counsellor.counsellor_id}</td>
            <td>${counsellor.nic}</td>
            <td>${counsellor.full_name}</td>
            <td>${counsellor.address}</td>
            <td>${counsellor.phone_number}</td>
            <td>${counsellor.dob}</td>
            <td>${counsellor.gender}</td>
            <td>${counsellor.education}</td>
            <td>${counsellor.work_hours}</td>
            <td>
              <button class="editRow"  onclick="editRow(this.parentNode.parentNode)">Edit</button>
              <button class="delete" onclick="deleteRow(this)">Delete</button>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
      });

      // Update the total counsellor count
      document.getElementById('total-counsellors').textContent = data.length;

      // Calculate and update the total part-time and full-time counsellor counts
      const partTimeCount = data.filter(counsellor => counsellor.work_hours === 'Part_Time').length;
      const fullTimeCount = data.length - partTimeCount;
      document.getElementById('total-part-time').textContent = partTimeCount;
      document.getElementById('total-full-time').textContent = fullTimeCount;
    })
    .catch(error => console.error('Error fetching data:', error));
}
//-----------------------EDIT------------------------------------------------


// Function to handle the "Edit" button click
function openEditModal() {
  editModal.style.display = "block";
}
function editRow(row) {
  // const row = button.closest('tr');
  const counsellorId = row.querySelector('td:nth-child(1)').textContent;
  // const counsellorId = this.dataset.counsellorId;
    console.log("Selected counsellor ID:", counsellorId);

  // const requestData = {
  //   counsellor_id: counsellorId
  // };

  // fetch('counsellerUpdate.php', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(requestData)
  // })

   // Use URLSearchParams to add the counsellorId as a query parameter
  //  const urlParams = new URLSearchParams({ counsellor_id: counsellorId });

   fetch(`counsellerDetails.php?counsellor_id=${counsellorId}` )
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(data) && data.length > 0) {
      // Populate the edit form with the existing data
      // document.getElementById('editCounsellorId').value = data[0].counsellor_id;
      // document.getElementById('editNIC').value = data[0].NIC;
      // document.getElementById("editFullName").value  = data[0].FullName;
      // document.getElementById("editAddress").value = data[0].Address;
      // document.getElementById("editPhoneNo").value = data[0].PhoneNo;
      // document.getElementById("editDOB").value = data[0].DOB;
      // document.getElementById("editGender").value = data[0].Gender;
      // document.getElementById("editEducation").value = data[0].Education;
      // document.getElementById("editWorkHours").value = data[0].WorkHours;
      document.getElementById('editCounsellorId').value = counsellorId;
      document.getElementById('editNIC').value = row.querySelector('td:nth-child(2)').textContent;
      document.getElementById("editFullName").value = row.querySelector('td:nth-child(3)').textContent;
      document.getElementById("editAddress").value = row.querySelector('td:nth-child(4)').textContent;
      document.getElementById("editPhoneNo").value = row.querySelector('td:nth-child(5)').textContent;
      document.getElementById("editDOB").value = row.querySelector('td:nth-child(6)').textContent;
      document.getElementById("editGender").value = row.querySelector('td:nth-child(7)').textContent;
      document.getElementById("editEducation").value = row.querySelector('td:nth-child(8)').textContent;
      document.getElementById("editWorkHours").value = row.querySelector('td:nth-child(9)').textContent;
    

      // Show the edit modal form
      document.getElementById("edit-modal-form").style.display = 'block';
      }
      else {
        console.error('No data found for the given counsellor ID.');
      }
    })
    
    .catch(error => console.error('Error fetching data:', error));
}

// Function to close the edit modal form
function closeEditModal() {
  document.getElementById('edit-modal-form').style.display = 'none';
}

// Function to save the edited counsellor data
function saveEditedCounsellor() {
  const editedCounsellorId = document.getElementById('editCounsellorId').value;
  const editedNIC = document.getElementById('editNIC').value;
  const editedFullName = document.getElementById('editFullName').value;
  const editedAddress = document.getElementById('editAddress').value;
  const editedPhoneNo = document.getElementById('editPhoneNo').value;
  const editedDOB = document.getElementById('editDOB').value;
  const editedGender = document.getElementById('editGender').value;
  const editedEducation = document.getElementById('editEducation').value;
  const editedWorkHours = document.getElementById('editWorkHours').value;
  // Get other edited data fields

  const editedData = {
    counsellor_id: editedCounsellorId,
    nic: editedNIC,
    full_name: editedFullName,
    address: editedAddress,
    phone_number: editedPhoneNo,
    dob: editedDOB,
    gender: editedGender,
    education: editedEducation,
    work_hours: editedWorkHours
  };
  

  console.log(editedData);

  // Send the edited data to the server to update the record in the database
  fetch('counsellerUpdate.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editedData
    )
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Data updated successfully.') {
        // Refresh the table to show the updated data
        fetchCounsellorDetails();
        // Close the edit modal form
        closeEditModal();
        // Show a success message to the user
        alert('Data updated successfully.');
      } else {
        alert('Failed to update data.');
      }
    })
    .catch(error => console.error('Error updating data:', error));

  // Prevent the form from submitting through HTML form submission
  return false;
}


//----------------------------DELETE-------------------------------------------
// Function to handle the "Delete" button click
function deleteRow(button) {
  const row = button.closest('tr');
  // const counsellorId = row.cells[0].textContent; // Assuming the first cell contains the Counsellor ID
  const counsellorId = row.querySelector('td:nth-child(1)').textContent;
  // Send a DELETE request to the server to delete the counsellor
  fetch('counsellerDetails.php', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({counsellor_id:counsellorId})
  })
    .then(response => response.json())
    .then(data => {
      console.log('Data response:', data);
      // If the data was deleted successfully, remove the row from the table
      if (data.message === 'Data deleted successfully.') {
        
        fetchCounsellorDetails();
      }
      else {
        alert('Failed to delete data.');
      }
    })
    .catch(error => console.error('Error deleting data:', error));
}

// Call the function to fetch initial data on page load
fetchCounsellorDetails();



// // Function to open the modal for adding a new counsellor
// function openModal() {
//   const modal = document.getElementById('modal-form');
//   modal.style.display = 'block';
// }

// // Function to close the modal
// function closeModal() {
//   const modal = document.getElementById('modal-form');
//   modal.style.display = 'none';
// }

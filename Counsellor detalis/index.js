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

function addCounsellors() {
  //const counsellor_id = document.getElementById('counsellor_id').value
  const nic = document.getElementById('nic').value;
  const fullname = document.getElementById('fullname').value;
  const address = document.getElementById('address').value;
  const phoneno = document.getElementById('phoneno').value;
  const dob = document.getElementById('dob').value;
  const gender = document.getElementById('gender').value;
  const education = document.getElementById('education').value;
  const workhours = document.getElementById('workhours').value;

  const requestData = {
    // counsellorId:counsellor_id,
    nic: nic,
    fullname: fullname,
    address: address,
    phoneno: phoneno,
    dob: dob,
    gender: gender,
    education: education,
    workhours: workhours
  };

  fetch('counsellerAdd.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
   .then(response => response.json())
  // .then(response => {
  //   console.log('Raw Response:', response);
  //   return response.json();
  // })
  .then(data => {
    console.log('Data:', data);
    if (data.message === 'Data stored successfully.') {
    
      alert('Failed to store data.');
      // Optionally, you can refresh the page or perform other actions
    } else {
      
      closeModal();
      fetchCounsellorDetails();

      alert('Data stored successfully.');
    }
  })
  .catch(error => {
    console.error('Error storing data:', error);
    //alert('An error occurred while storing data.'+ error.message);
    if (error instanceof TypeError && error.message.includes('unexpected token')) {
      alert('Error: Unexpected response from the server. Please check your PHP script.');
    } else {
      console.log('An error occurred while storing data: ' + error.message);
    }
  });
  return false;
}


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
              <button class="Add"  onclick="editRow(this.parentNode.parentNode)">Edit</button>
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

function searchUsers() {
  const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
  const tableRows = document.querySelectorAll('#counsellor-table tbody tr');

  tableRows.forEach(row => {
    const full_name = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
    if (full_name.includes(searchInput)) {
      row.style.display = ''; // Show matching rows
    } else {
      row.style.display = 'none'; // Hide non-matching rows
    }
  });
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

 
   fetch(`counsellerDetails.php?counsellor_id=${counsellorId}` )
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(data) && data.length > 0) {
      
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
  const confirmed = window.confirm("Are you sure you want to delete this record?");
  
  if (confirmed) {
    fetch('counsellerDelete.php', {
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
          alert('Data deletion error.');
          
        }
        else {
          alert('successfully deleted data.');
          fetchCounsellorDetails();
        }
      })
      .catch(error => console.error('Error deleting data:', error));
  }
}
// Call the function to fetch initial data on page load
fetchCounsellorDetails();



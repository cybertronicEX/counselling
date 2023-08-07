function fetchUserDetails() {
  fetch('userDetails.php')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched data:', data);
      // Clear the existing table rows
      const tableBody = document.querySelector('#user-table tbody');
      tableBody.innerHTML = '';

      // Loop through the fetched data and create table rows
      data.forEach(user => {
        
        const row = `
          <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.address}</td>
            <td>${user.phone}</td>
            <td>${user.dob}</td>
            <td>${user.gender}</td>
            <td>${user.relationship}</td>
            <td>${user.occupation}</td>
            <td>${user.username}</td>
            <td>${user.password}</td>
            <td>
              <button class="editRow"  onclick="edituserPassword(this.parentNode.parentNode)">edit</button>
              <button class="delete" onclick="deleteRow(this)">Delete</button>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
      });
      searchUsers();
    })
    .catch(error => console.error('Error fetching data:', error));
}

function searchUsers() {
  const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
  const tableRows = document.querySelectorAll('#user-table tbody tr');

  tableRows.forEach(row => {
    const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    if (name.includes(searchInput)) {
      row.style.display = ''; // Show matching rows
    } else {
      row.style.display = 'none'; // Hide non-matching rows
    }
  });
}
//-----------------------EDIT------------------------------------------------
function openEditModal() {
  editModal.style.display = "block";
}
function edituserPassword(row) {
  console.log("Row HTML:", row.innerHTML);
  // const row = button.closest('tr');
  const id = row.querySelector('td:nth-child(1)').textContent;
  const name = row.querySelector('td:nth-child(2)').textContent;
  const address= row.querySelector('td:nth-child(3)').textContent;
  const phone= row.querySelector('td:nth-child(4)').textContent;
  const dob= row.querySelector('td:nth-child(5)').textContent;
  const gender= row.querySelector('td:nth-child(6)').textContent;
  const relationship= row.querySelector('td:nth-child(7)').textContent;
  const occupation= row.querySelector('td:nth-child(8)').textContent;
  const username= row.querySelector('td:nth-child(9)').textContent;
  // // const counsellorId = this.dataset.counsellorId;
    console.log("Selected counsellor ID:", id);
    // console.log("Selected counsellor Name:", name);
    // console.log("Selected login time:", logintime);
   fetch(`userDetails.php?id=${id}&name=${name}&address=${address}&phone=${phone}&dob=${dob}&gender=${gender}&relationship=${relationship}&occupation=${occupation}&username=${username}` )
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(data) && data.length > 0) {
     
      document.getElementById('id').value = id;
      document.getElementById('name').value = name;
      document.getElementById("address").value = address;
      document.getElementById("phone").value = phone;
      document.getElementById("dob").value = dob;
      document.getElementById("gender").value = gender;
      document.getElementById("relationship").value = relationship;
      document.getElementById("occupation").value = occupation;
      document.getElementById("username").value = username;
      // document.getElementById("username").value = row.querySelector('td:nth-child(9)').textContent;
      document.getElementById("password").value = row.querySelector('td:nth-child(10)').textContent;

      // Show the edit modal form
      document.getElementById("edit-modal-form").style.display = 'block';
      }
      else {
        console.error('No data found for the given session ID.');
      }
    })
    
    .catch(error => console.error('Error fetching data:', error));
}

// Function to close the edit modal form
function closeEditModal() {
  document.getElementById('edit-modal-form').style.display = 'none';
}

// Function to save the edited counsellor data
function editUser() {
  const editedId = document.getElementById('id').value;
  const editedName = document.getElementById('name').value;
  const editedAddress = document.getElementById('address').value;
  const editedPhone = document.getElementById('phone').value;
  const editedDob = document.getElementById('dob').value;
  const editedGender = document.getElementById('gender').value;
  const editedRelationship = document.getElementById('relationship').value;
  const editedOccupation = document.getElementById('occupation').value;
  const editedUsername = document.getElementById('username').value;
  const editedPassword = document.getElementById('password').value;
  
  
  // Get other edited data fields

  const editedData = {
    id: editedId,
    name: editedName,
    address: editedAddress,
    phone: editedPhone,
    dob: editedDob,
    gender: editedGender,
    relationship: editedRelationship,
    occupation: editedOccupation,
    username: editedUsername,
    password: editedPassword

  };
  

  console.log(editedData);

  // Send the edited data to the server to update the record in the database
  fetch('userAdminEdit.php', {
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
        fetchUserDetails();
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

function deleteRow(button) {
  const row = button.closest('tr');
  const id = row.querySelector('td:nth-child(1)').textContent;
  // Send a DELETE request to the server to delete the counsellor
  const confirmed = window.confirm("Are you sure you want to delete this record?");
  
  if (confirmed) {  
    fetch('userDelete.php', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
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
          fetchUserDetails();
        }
      })
      .catch(error => console.error('Error deleting data:', error));
  }
}

fetchUserDetails();
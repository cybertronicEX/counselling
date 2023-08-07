  

function fetchAdminLogs() {
  fetch('AdminDetails.php')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched data:', data);
      // Clear the existing table rows
      const tableBody = document.querySelector('#admin-logs-table tbody');
      tableBody.innerHTML = '';

      // Loop through the fetched data and create table rows
      data.forEach(log => {
        
        const row = `
          <tr>
            <td>${log.id}</td>
            <td>${log.email}</td>
            <td>${log.login_time}</td>
            <td>${log.notes}</td>
            <td>
              <button class="editRow"  onclick="AddNote(this.parentNode.parentNode)">AddNote</button>

            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

function searchUsers() {
  const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
  const tableRows = document.querySelectorAll('#admin-logs-table tbody tr');

  tableRows.forEach(row => {
    const email = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    if (email.includes(searchInput)) {
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
function AddNote(row) {
  console.log("Row HTML:", row.innerHTML);
  // const row = button.closest('tr');
  const id = row.querySelector('td:nth-child(1)').textContent;
  const name = row.querySelector('td:nth-child(2)').textContent;
  const logintime= row.querySelector('td:nth-child(3)').textContent;
  // // const counsellorId = this.dataset.counsellorId;
    console.log("Selected counsellor ID:", id);
    // console.log("Selected counsellor Name:", name);
    // console.log("Selected login time:", logintime);
   fetch(`AdminDetails.php?id=${id}&name=${name}&logintime=${logintime}` )
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(data) && data.length > 0) {
     
      document.getElementById('id').value = id;
      document.getElementById('name').value = name;
      document.getElementById("logintime").value = logintime;
      document.getElementById("notes").value = row.querySelector('td:nth-child(4)').textContent;

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
function adminNotes() {
  const editedId = document.getElementById('id').value;
  const editedName = document.getElementById('name').value;
  const editedLoginTime = document.getElementById('logintime').value;
  const editedNotes = document.getElementById('notes').value;
  
  // Get other edited data fields

  const editedData = {
    id: editedId,
    name: editedName,
    logintime: editedLoginTime,
    notes: editedNotes
  };
  

  console.log(editedData);

  // Send the edited data to the server to update the record in the database
  fetch('AdminNotes.php', {
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
        fetchAdminLogs();
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

fetchAdminLogs();
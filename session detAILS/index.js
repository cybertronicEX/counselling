function fetchSessions() {
  fetch('SessionDetails.php')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched data:', data);
      // Clear the existing table rows
      const tableBody = document.querySelector('#sessions-table tbody');
      tableBody.innerHTML = '';

      // Loop through the fetched data and create table rows
      data.forEach(session => {
        
        const row = `
          <tr>
            <td>${session.id}</td>
            <td>${session.date}</td>
            <td>${session.time}</td>
            <td>${session.user}</td>
            <td>${session.counsellor}</td>
            <td>${session.status}</td>
            <td>
              <button class="editRow"  onclick="changeStatus(this.parentNode.parentNode)">change status</button>

            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
      });
      searchUsers()
    })
    .catch(error => console.error('Error fetching data:', error));
}

function searchUsers() {
  const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
  const tableRows = document.querySelectorAll('#sessions-table tbody tr');

  tableRows.forEach(row => {
    const counsellor = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
    if (counsellor.includes(searchInput)) {
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
function changeStatus(row) {
  console.log("Row HTML:", row.innerHTML);
  // const row = button.closest('tr');
  const id = row.querySelector('td:nth-child(1)').textContent;
  const date = row.querySelector('td:nth-child(2)').textContent;
  const time= row.querySelector('td:nth-child(3)').textContent;
  const user= row.querySelector('td:nth-child(4)').textContent;
  const counsellor= row.querySelector('td:nth-child(5)').textContent;
  // // const counsellorId = this.dataset.counsellorId;
    console.log("Selected counsellor ID:", id);
    // console.log("Selected counsellor Name:", name);
    // console.log("Selected login time:", logintime);
   fetch(`SessionDetails.php?id=${id}&date=${date}&time=${time}&user=${user}&counsellor=${counsellor}` )
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(data) && data.length > 0) {
     
      document.getElementById('id').value = id;
      document.getElementById('date').value = date;
      document.getElementById("time").value = time;
      document.getElementById("user").value = user;
      document.getElementById("counsellor").value = counsellor;
      document.getElementById("status").value = row.querySelector('td:nth-child(6)').textContent;

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
function editSessions() {
  const editedId = document.getElementById('id').value;
  const editedDate = document.getElementById('date').value;
  const editedTime = document.getElementById('time').value;
  const editedUser = document.getElementById('user').value;
  const editedCounsellor = document.getElementById('counsellor').value;
  const editedStatus = document.getElementById('status').value;
  
  // Get other edited data fields

  const editedData = {
    id: editedId,
    date: editedDate,
    time: editedTime,
    user: editedUser,
    counsellor: editedCounsellor,
    status: editedStatus
  };
  

  console.log(editedData);

  // Send the edited data to the server to update the record in the database
  fetch('SessionStatus.php', {
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
        fetchSessions();
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

fetchSessions();
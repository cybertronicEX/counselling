function edit() {
    var inputs = document.querySelectorAll('input');
    var textarea = document.querySelector('textarea');
    var select = document.querySelectorAll('select');
  
    inputs.forEach(function (input) {
      input.removeAttribute('readonly');
    });
  
    textarea.removeAttribute('readonly');
  
    select.forEach(function (select) {
      select.removeAttribute('disabled');
    });
  }
  
  function submit() {
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var gender = document.getElementById('gender').value;
    var nic = document.getElementById('nic').value;
    var dob = document.getElementById('dob').value;
    var maritalStatus = document.getElementById('marital-status').value;
    var bio = document.getElementById('bio').value;
    var education = document.getElementById('education').value;
  
    console.log('Name: ' + name);
    console.log('Phone Number: ' + phone);
    console.log('Email Address: ' + email);
    console.log('Gender: ' + gender);
    console.log('NIC: ' + nic);
    console.log('Date of Birth: ' + dob);
    console.log('Marital Status: ' + maritalStatus);
    console.log('Bio: ' + bio);
    console.log('Education Qualification: ' + education);
  
    // Disable the form fields after submitting
    var inputs = document.querySelectorAll('input');
    var textarea = document.querySelector('textarea');
    var select = document.querySelectorAll('select');
  
    inputs.forEach(function (input) {
      input.setAttribute('readonly', 'readonly');
    });
  
    textarea.setAttribute('readonly', 'readonly');
  
    select.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });
  }
  
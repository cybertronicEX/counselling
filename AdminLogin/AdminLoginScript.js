// Sign Up Page JavaScript
document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);

    fetch('signup.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('signup-status').textContent = data;
    })
    .catch(error => console.error('Error:', error));
});

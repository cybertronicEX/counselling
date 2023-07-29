document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('login-status').textContent = data;
    })
    .catch(error => console.error('Error:', error));
});

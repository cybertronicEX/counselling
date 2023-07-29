<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check login credentials (Replace this with your authentication logic)
    if ($username === 'user' && $password === 'password') {
        echo 'Login successful! Welcome, ' . htmlspecialchars($username);
    } else {
        echo 'Invalid username or password.';
    }
}
?>

<?php
session_start();

if (isset($_SESSION['email'])) {
    $email = $_SESSION['email'];
    // Other session data can be retrieved and added here

    $sessionData = array('email' => $email); // Add other session data to this array
    echo json_encode($sessionData);
} else {
    echo json_encode(array('error' => 'Not logged in'));
}
?>

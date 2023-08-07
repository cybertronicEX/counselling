<?php 

// Function to update counsellor details in the database
function updateUserDetails($id, $name, $address, $phone, $dob, $gender, $relationship, $occupation, $username, $password) {
    // Replace these with your actual database credentials
    $host = "localhost";
    $usernames = "admin1";
    $passwords = "123";
    $dbname = "adminlogin";

    // Create a connection to the database
    $conn = new mysqli($host, $usernames, $passwords, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL query to update data
    $stmt = $conn->prepare("UPDATE userdetails SET password=? WHERE id=?");
    if (!$stmt) {
        // die("Error preparing SQL query: " . $conn->error);
        die(json_encode(array("message" => "Failed to update data.")));

    }
    
    $stmt->bind_param("si", $password, $id);

    // Execute the query
    if ($stmt->execute()) {
        $stmt->close();
        $conn->close();
        return true; // Data updated successfully
    } else {
        $stmt->close();
        $conn->close();
        // die("Error executing SQL query: " . $conn->error);
        die(json_encode(array("message" => "Failed to update data.")));

        return false; // Failed to update data
    }
}

// Check if the form is submitted and call the function to update data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $requestData = file_get_contents('php://input');
    $postData = json_decode($requestData, true);
    $id = $postData["id"]; // Use $postData to get the data sent in the JSON body
    $name = $postData["name"];
    $address = $postData["address"];
    $phone = $postData["phone"];
    $dob = $postData["dob"];
    $gender = $postData["gender"];
    $relationship = $postData["relationship"];
    $occupation = $postData["occupation"];
    $username = $postData["username"];
    $password = $postData["password"];

    // Call the function to update data and check the result
    if (updateUserDetails($id, $name, $address, $phone, $dob, $gender, $relationship, $occupation, $username, $password)) {
        echo json_encode(array("message" => "Data updated successfully."));
    } else {
        echo json_encode(array("message" => "Failed to update data."));
    }
}


?>
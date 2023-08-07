<?php
   
// Function to update counsellor details in the database
function updateSession($id, $date, $time ,$user ,$counsellor ,$status) {
    // Replace these with your actual database credentials
    $host = "localhost";
    $username = "admin1";
    $password = "123";
    $dbname = "adminlogin";

    // Create a connection to the database
    $conn = new mysqli($host, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Extract values from the $data array
    // $id = $data["id"];
    // $name = $data["name"];
    // $logintime = $data["logintime"];
    // $notes = $data["notes"];

    // Prepare the SQL query to update data
    $stmt = $conn->prepare("UPDATE sessions  SET status=? WHERE id=?");
    if (!$stmt) {
        die("Error preparing SQL query: " . $conn->error);
    }
    
    $stmt->bind_param("si", $status, $id);

    // Execute the query
    if ($stmt->execute()) {
        $stmt->close();
        $conn->close();
        return true; // Data updated successfully
    } else {
        $stmt->close();
        $conn->close();
        die("Error executing SQL query: " . $conn->error);
        return false; // Failed to update data
    }
}

// Check if the form is submitted and call the function to update data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $requestData = file_get_contents('php://input');
    $postData = json_decode($requestData, true);
    $id = $postData["id"];
    $date = $postData["date"];
    $time = $postData["time"];
    $user = $postData["user"];
    $counsellor = $postData["counsellor"];
    $status = $postData["status"];

    
    // Call the function to update data and check the result
    if (updateSession($id, $date ,$time, $user ,$counsellor ,$status)) {
        echo json_encode(array("message" => "Data updated successfully."));
    } else {
        echo json_encode(array("message" => "Failed to update data."));
    }
}



?>
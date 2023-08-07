<?php
//------------------------------DELETE----------------------------------------------------
    // Function to delete Counsellor details from the MySQL database
    function deleteCounsellor($counsellorId) {
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

        // Prepare the SQL query to delete data
        $stmt = $conn->prepare("DELETE FROM counsellers WHERE counsellor_id = ?");
        $stmt->bind_param("i", $counsellorId);

        // Execute the query
        if ($stmt->execute()) {
            $stmt->close();
            $conn->close();
            return true; // Data deleted successfully
        } else {
            $stmt->close();
            $conn->close();
            return false; // Failed to delete data
        }
    }

    // Check if the DELETE request is sent and call the function to delete data
    if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
        // Get the counsellor ID from the DELETE request body
        $data = json_decode(file_get_contents("php://input"), true);
        $counsellorId = $data["counsellor_id"];

        // Call the function to delete data and check the result
        if (deleteCounsellor($counsellorId)) {
            header('Content-Type: application/json');
            echo json_encode(array("message" => "Data deleted successfully php."));
            // echo json_encode(array("message" => "Data deleted successfully."));
        } else {
            header('Content-Type: application/json');
            echo json_encode(array("message" => "Failed to delete data php."));
        }
    }

    ?>

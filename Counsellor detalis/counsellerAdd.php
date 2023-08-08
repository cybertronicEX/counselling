<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
    //--------------------------ADD----------------------------------------
    // Function to store Counsellor details in the MySQL database
    function storeCounsellorDetails( $nic, $fullname, $address, $phoneno, $dob, $gender, $education, $workhours) {
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

        // Prepare the SQL query to insert data
        $stmt = $conn->prepare("INSERT INTO counsellers ( nic, full_name, address, phone_number, dob, gender, education, work_hours) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssissss", $nic, $fullname, $address, $phoneno, $dob, $gender, $education, $workhours);

        // Execute the query
        if ($stmt->execute()) {
            $stmt->close();
            $conn->close();
            return true; // Data stored successfully
        } else {
            $error = "Error: " . $stmt->error;
            $stmt->close();
            $conn->close();
            return false; // Failed to store data
        }
    }

    // Check if the form is submitted and call the function to store data
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // $counsellorId = $_POST["counsellor-id"];
        $requestData = file_get_contents('php://input');
        $postData = json_decode($requestData, true);
        $nic = $postData["nic"];
        $fullname = $postData["fullname"];
        $address = $postData["address"];
        $phoneno = $postData["phoneno"];
        $dob = $postData["dob"];
        $gender = $postData["gender"];
        $education = $postData["education"];
        $workhours = $postData["workhours"];

        file_put_contents('debug.log', print_r($postData, true)); // Log the POST data to a file

        // Call the function to store data and check the result
        if (storeCounsellorDetails( $nic, $fullname, $address, $phoneno, $dob, $gender, $education, $workhours)){
            header('Content-Type: application/json');
            echo json_encode(array("message" => "Data stored successfully php."));
            // header("Refresh:0.1 ; URL=index.html");
        } else {
            echo json_encode(array("message" => "Failed to store data php."));
        }
        exit;
    }
?>
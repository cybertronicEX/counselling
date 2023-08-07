<?php 
function getUsers() {
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

        // Prepare the SQL query to select all data from the table
        $sql = "SELECT * FROM userdetails";

        // Execute the query and fetch the result
        $result = $conn->query($sql);

        // Check if any data was fetched
        if ($result->num_rows > 0) {
            $data = array();
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $result->free_result();
            $conn->close();
            return $data; // Return the fetched data as an array of rows
        } else {
            $conn->close();
            return array(); // Return an empty array if no data found
        }
    }
    $userDetails = getUsers();

    // Return the data as JSON response
    header('Content-Type: application/json');
    echo json_encode($userDetails);
    file_put_contents('debug.log', print_r($userDetails, true));
?>
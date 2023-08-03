    <?php
    //--------------------------ADD----------------------------------------
    // Function to store Counsellor details in the MySQL database
    function storeCounsellorDetails( $nic, $fullName, $address, $phoneNo, $dob, $gender, $education, $workHours) {
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
        $stmt->bind_param("sssissss", $nic, $fullName, $address, $phoneNo, $dob, $gender, $education, $workHours);

        // Execute the query
        if ($stmt->execute()) {
            $stmt->close();
            $conn->close();
            return true; // Data stored successfully
        } else {
            $stmt->close();
            $conn->close();
            return false; // Failed to store data
        }
    }

    // Check if the form is submitted and call the function to store data
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // $counsellorId = $_POST["counsellor-id"];
        $nic = $_POST["nic"];
        $fullName = $_POST["full_name"];
        $address = $_POST["address"];
        $phoneNo = $_POST["phone_number"];
        $dob = $_POST["dob"];
        $gender = $_POST["gender"];
        $education = $_POST["education"];
        $workHours = $_POST["work_hours"];

        // Call the function to store data and check the result
        if (storeCounsellorDetails( $nic, $fullName, $address, $phoneNo, $dob, $gender, $education, $workHours)) {
            echo json_encode(array("message" => "Data stored successfully."));
            header("Refresh:0.1 ; URL=index.html");
        } else {
            echo json_encode(array("message" => "Failed to store data."));
        }
    }

    //---------------------------GET---------------------------------------

    // Function to fetch all Counsellor details from the MySQL database
    function getCounsellorDetails() {
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
        $sql = "SELECT * FROM counsellers";

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
        // Call the function to get Counsellor details
        $counsellorData = getCounsellorDetails();

        // Return the data as JSON response
        header('Content-Type: application/json');
        echo json_encode($counsellorData);



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
        $stmt->bind_param("s", $counsellorId);

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

    //------------------------------------EDIT-----------------------------------------
    // Function to update Counsellor details in the MySQL database
    
// // Function to update counsellor details in the database
// function updateCounsellorDetails($counsellorId, $nic, $fullName, $address, $phoneNo, $dob, $gender, $education, $workHours) {
//     // Replace these with your actual database credentials
//     $host = "localhost";
//     $username = "admin1";
//     $password = "123";
//     $dbname = "adminlogin";

//     // Create a connection to the database
//     $conn = new mysqli($host, $username, $password, $dbname);

//     // Check connection
//     if ($conn->connect_error) {
//         die("Connection failed: " . $conn->connect_error);
//     }

//     // Prepare the SQL query to update data
//     $stmt = $conn->prepare("UPDATE counsellers SET nic=?, full_name=?, address=?, phone_number=?, dob=?, gender=?, education=?, work_hours=? WHERE counsellor_id=?");
//     $stmt->bind_param("sssissssi", $nic, $fullName, $address, $phoneNo, $dob, $gender, $education, $workHours, $counsellorId);

//     // Execute the query
//     if ($stmt->execute()) {
//         $stmt->close();
//         $conn->close();
//         return true; // Data updated successfully
//     } else {
//         $stmt->close();
//         $conn->close();
//         return false; // Failed to update data
//     }
// }

// // Check if the form is submitted and call the function to update data
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $requestData = file_get_contents('php://input');
//     $postData = json_decode($requestData, true);
//     $counsellorId = $postData["counsellor_id"]; // Use $postData to get the data sent in the JSON body
//     $nic = $postData["nic"];
//     $fullName = $postData["full_name"];
//     $address = $postData["address"];
//     $phoneNo = $postData["phone_number"];
//     $dob = $postData["dob"];
//     $gender = $postData["gender"];
//     $education = $postData["education"];
//     $workHours = $postData["work_hours"];

//     // Call the function to update data and check the result
//     if (updateCounsellorDetails($counsellorId, $nic, $fullName, $address, $phoneNo, $dob, $gender, $education, $workHours)) {
//         echo json_encode(array("message" => "Data updated successfully."));
//     } else {
//         echo json_encode(array("message" => "Failed to update data."));
//     }
// }





    ?>

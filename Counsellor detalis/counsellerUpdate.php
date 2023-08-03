  <?php 


// // Function to fetch Counsellor details by ID from the MySQL database
// function getCounsellorDetailsById($counsellorId) {
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

//     // Prepare the SQL query to select data by counsellor ID
//     $stmt = $conn->prepare("SELECT * FROM counsellers WHERE counsellor_id = ?");
//     $stmt->bind_param("s", $counsellorId);

//     // Execute the query and fetch the result
//     $stmt->execute();
//     $result = $stmt->get_result();

//     // Check if any data was fetched
//     if ($result->num_rows > 0) {
//         $data = $result->fetch_assoc();
//         $stmt->close();
//         $conn->close();
//         return $data; // Return the fetched data as an associative array
//     } else {
//         $stmt->close();
//         $conn->close();
//         return null; // Return null if no data found for the given ID
//     }
// }

// // Check if the POST request is sent and call the function to get data by ID
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $requestData = file_get_contents('php://input');
//     $postData = json_decode($requestData, true);
//     $counsellorId = $postData["counsellor_id"];

//     // Call the function to get counsellor data by ID
//     $counsellorData = getCounsellorDetailsById($counsellorId);

//     // Return the data as JSON response
//     header('Content-Type: application/json');
//     echo json_encode($counsellorData);
// }



// Function to update counsellor details in the database
function updateCounsellorDetails($counsellorId, $nic, $fullName, $address, $phoneNo, $dob, $gender, $education, $workHours) {
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

    // Prepare the SQL query to update data
    $stmt = $conn->prepare("UPDATE counsellers SET nic=?, full_name=?, address=?, phone_number=?, dob=?, gender=?, education=?, work_hours=? WHERE counsellor_id=?");
    if (!$stmt) {
        die("Error preparing SQL query: " . $conn->error);
    }
    
    $stmt->bind_param("sssissssi", $nic, $fullName, $address, $phoneNo, $dob, $gender, $education, $workHours, $counsellorId);

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
    $counsellorId = $postData["counsellor_id"]; // Use $postData to get the data sent in the JSON body
    $nic = $postData["nic"];
    $fullName = $postData["full_name"];
    $address = $postData["address"];
    $phoneNo = $postData["phone_number"];
    $dob = $postData["dob"];
    $gender = $postData["gender"];
    $education = $postData["education"];
    $workHours = $postData["work_hours"];

    // Call the function to update data and check the result
    if (updateCounsellorDetails($counsellorId, $nic, $fullName, $address, $phoneNo, $dob, $gender, $education, $workHours)) {
        echo json_encode(array("message" => "Data updated successfully."));
    } else {
        echo json_encode(array("message" => "Failed to update data."));
    }
}




?>
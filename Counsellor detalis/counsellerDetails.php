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



    ?>

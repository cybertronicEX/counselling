

<?php
$host = "localhost"; // Replace with your MySQL server host
$username = "admin"; // Replace with your database username
$password = "admin"; // Replace with your database password
$dbname = "adminlogin"; // Replace with your database name

$email = $_POST['email'];
$password =$_POST['password'];
// Create a connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo "<h2>invalid password</h2>";
    die("Connection failed: " . $conn->connect_error);

}
else{
    $stmt = $conn->prepare("select * from adminlogin where email = ?");
    $stmt->bind_param("s" ,$email);
    $stmt->execute();
    $stmt_result = $stmt->get_result();

    $loginTime = date('Y-m-d H:i:s');
    $stmt = $conn->prepare("INSERT INTO login_logout_history (email, login_time) VALUES (?, ?)");
    $stmt->bind_param("ss", $email, $loginTime);
    $stmt->execute();
    $stmt->close();

    if($stmt_result->num_rows > 0){
        $data = $stmt_result->fetch_assoc();
        if($data['password']=== $password){
            // echo "<h2>login successful</h2>";
            // echo "<script type='text/javascript'>alert('login successful');</script>";
            header("Location: ../Admin_Navigation.html");
            exit;
        }else{
            echo "<h2>invalid credentials</h2>";
        }
    }else{
        echo "<h2>invalid credentials</h2>";
    }
}
?>
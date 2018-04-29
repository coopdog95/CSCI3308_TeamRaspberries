<?php
$servername = "den1.mysql6.gear.host";
$username = "proj";
$password = "password.";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully ";




$sql = "SELECT sensorID FROM fake_sensorInfo; ";

echo " ran sql ";

echo sql;

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "sensorID: " . $row["sensorID"].  "<br>";
    }
} else {
    echo "0 results";
}

 
$conn->close();


?>

<!-- 

+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| sensorID  | int(11)      | NO   | PRI | NULL    | auto_increment |
| testDate  | date         | YES  |     | NULL    |                |
| testTime  | time         | YES  |     | NULL    |                |
| temp      | int(11)      | YES  |     | NULL    |                |
| humidity  | int(11)      | YES  |     | NULL    |                |
| userID    | int(10)      | YES  |     | NULL    |                |
| latitude  | decimal(9,6) | YES  |     | NULL    |                |
| longitude | decimal(9,6) | YES  |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+ -->
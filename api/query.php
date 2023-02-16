<?php
 header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Headers: Content-Type, x-requested-with');

    $host = 'localhost';
    $db   = 'caseform';
    $user = 'root';
    $pass = '1234';
    $charset = 'utf8mb4';

    try{
        $connect = new PDO("mysql:host=$host;dbname=$db;charset=utf8",$user,$pass);
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $connect->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $connect->query("SET NAMES utf8");
        $connect->query("SET CHARACTER SET utf8");
        $connect->query("SET COLLATION_CONNECTION = 'utf8_general_ci'");
    
      
        
    }catch(PDOException $e){
        echo $e->getMessage();
    
    }
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $data = json_decode(file_get_contents('php://input'), true);
        $firstName = $data['firstName'];
        $lastName = $data['lastName'];
        $email = $data['email'];
        $phone = $data['phone'];
        $address = $data['address'];


        $sql = "INSERT INTO `users` (`first_name`, `last_name`, `email`, `phone`, `address`) VALUES ('$firstName', '$lastName', '$email', '$phone', '$address')";
   
$connect->exec($sql);

    }

    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $sql = "SELECT * FROM `users`";
        $stmt = $connect->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    }


    ?>

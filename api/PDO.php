
<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
  header('Access-Control-Allow-Headers: Content-Type');

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
        echo "Connected";
      
        
    }catch(PDOException $e){
        echo $e->getMessage();
    
    }

    echo file_get_contents('php://input');

?>
    
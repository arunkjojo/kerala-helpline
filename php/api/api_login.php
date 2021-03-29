<?php 
include './cors.php';
include_once './users_data.php';

$request = file_get_contents("php://input");
$data = json_decode($request);
$res=false;
// var_dump($data);

if($_SERVER["REQUEST_METHOD"] == "POST" && $data->mobile!='' && $data->password!=''){

    $sql="SELECT id, `name`, `password`, mobile, `type` FROM `users` WHERE `mobile`=?  AND `password`=? and status = 1 LIMIT 1";

    $stmt = $con->prepare($sql);


    $mobile = $data->mobile;
    $pass=md5($data->password);
    $stmt->bind_param("ss", $mobile,$pass );
    $stmt->execute();
    $stmt->bind_result($id, $name, $password, $mobile, $type);
    $stmt->store_result();
    if($stmt->num_rows == 1)  //To check if the row exists
    {
        if($stmt->fetch()) //fetching the contents of the row
        {
            $aut=authenticity($id);
            echo $aut;
            $stmt->close();
            exit();
       }
    }  else {       
        $stmt->close();
        header("HTTP/1.1 401 Unauthorized");
        exit;
    }
}
else{
    header("HTTP/1.1 401 Unauthorized");
    exit;
}
include_once './database_close.php';
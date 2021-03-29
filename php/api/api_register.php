<?php 
include './cors.php';
include_once './users_data.php';
// include_once './database.php';


$request = file_get_contents("php://input");
$data = json_decode($request);
// var_dump($data);

if($_SERVER["REQUEST_METHOD"] == "POST" && $data->user!='' && $data->mobile!='' && $data->password!='' && $data->usrtype!='' && $data->dist!=''){
    
    $stmt1_sql="INSERT INTO `users`(`name`, `password`, `mobile`, `type`) VALUES (?,?,?,?)";

    $stmt1 = $con->prepare($stmt1_sql);

    $stmt1->bind_param("ssss", $user,$password,$mobile,$usrtype );

    $pass= $data->password;
    
    $password=md5($pass);
    
    $usrtype = $data->usrtype;

    $user = $data->user;

    $mobile = $data->mobile;


    $res1=$stmt1->execute();

    
    if($res1){

        // var_dump($res1);

        $user_id = $stmt1->insert_id;

        // echo "<br/>".$user_id."<br/>";

        $stmt2_sql="INSERT INTO `user_details`(`user_id`, `district_id`) VALUES (?,?)";

        $stmt2 = $con->prepare($stmt2_sql);

        $stmt2->bind_param("ii", $userid,$district);

        $district = $data->dist;
        
        $userid=$user_id;

        $res2=$stmt2->execute();


        if($res2){

            // var_dump($res2);

            $aut=authenticity($user_id);

            echo $aut;
            // var_dump($aut);

        }
        else{
            $stmt2->error;
        }
    }
    else{
        $stmt1->error;
    }

}
else{
    header("HTTP/1.1 401 Unauthorized");
    exit;
}

include_once './database_close.php';
?>
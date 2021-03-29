<?php

    include_once './database.php';
    
    function authenticity($user_id){

        global $con;

        $sql = "SELECT * FROM `users` WHERE `id`=?";

        $stmt = $con->prepare($sql);

        $stmt->bind_param("i", $userid);

        $userid=$user_id;

        $res=$stmt->execute();

        // var_dump($res);

        if($res){

            $result= $stmt->get_result();

            $user= $result->fetch_assoc();

            return(
                json_encode([
                    "status"=>true,
                    "user"=>[
                        "id"=>$user['id'],
                        "name"=>$user['name'],
                        "mobile"=>$user['mobile'],
                        "type"=>$user['type']
                    ]
                ])
            );
        }
    }

    
    // include_once './database_close.php';
?>
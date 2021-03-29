<?php 
include_once './cors.php';
include_once './database.php';

    $stmt_sql="SELECT post.id,post.user_id,post.message,post.post_date,post.post_time,post.longitude,post.latitude,post.veryfied_user_id,post_assects.image_video,post_assects.type FROM `post` left join post_assects ON post_assects.post_id=post.id ORDER BY post_date DESC,post_time DESC";

    $stmt = $con->prepare($stmt_sql);

    $res=$stmt->execute();

    $post=array();

    
    if($res){
        $result= $stmt->get_result();
        
        while($row = $result->fetch_assoc()) {
            // var_dump($row);
            array_push($post,$data=[
                "id"=>$row["id"],
                "user_id"=>$row["user_id"],
                "message"=>$row["message"],
                "post_date"=>$row["post_date"],
                "post_time"=>$row["post_time"],
                "longitude"=>$row["longitude"],
                "latitude"=>$row["latitude"],
                "veryfied_user_id"=>$row["veryfied_user_id"],
                "image_video"=>$row["image_video"],
                "type"=>$row["type"]
            ]);
        }

    }

    echo json_encode($post);
    
include_once './database_close.php';
import React from 'react'
import axios from 'axios';
import { Image } from "react-bootstrap";
import Addpost from './Addpost';
import moment from 'moment';
class Posts extends React.Component{
    constructor()
    {
        super()
        this.state={
            post:[]
        }
    }

    componentDidMount()
    {
        axios.get('http://api.helplinekerala.com/postdata.php')
        .then( response =>{
            // handle success
            // console.log(response.data);
            this.setState({post:response.data});
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        // .then(function () {
        //     // always executed
          
        // });
    }
    
    render(){
        const postItems = this.state.post.map((post, index) =>
            <div key={index} className="post">
                <Image src={post.image_video} />
                <p>{post.message}</p>
                {/* <p>
                    {post.post_date+'T'+post.post_time}
                </p> */}
                <p>
                    {moment(post.post_date+'T'+post.post_time).fromNow()}
                </p>
                <p>latitude:{post.latitude} longitude:{post.longitude}</p>
            </div>
        );
        return(
            <div className="container">
                <Addpost/>
                <div className="row">
                    <div>
                        {postItems}
                    </div>
                </div>
            </div>
        )
    }
}
export default Posts
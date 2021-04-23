import React from 'react';
import moment from 'moment';
import axios from 'axios';
import Cookies from 'js-cookie';

// import { Image } from "react-bootstrap";

class Posts extends React.Component{
    
    constructor()
    {
        super()
        this.state={
            posts:[]
        }
        
    }

    
    componentDidMount()
    {
        const user = Cookies.getJSON("user");
        return axios.post('http://api.helplinekerala.com/get_posts.php',{
            user_id:user.id
        })
        .then( response =>{
            // handle success
            console.log(response.data);
            this.setState({posts:response.data});
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
        
    }
    
    render(){
        
        var postItems = this.state.posts.map((post, i) =>
            <div className="col-sm-6 col-lg-4 mb-4" key={i}>
                <div className="card">
                {(post.image_video)? <svg className="bd-placeholder-img card-img-top" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/><text x="50%" y="50%" fill="#dee2e6" dy=".3em">{post.image_video}</text></svg>: ""}

                    <div className="card-body">
                    <p className="card-text">{post.message}</p>
                    <p className="card-text"><small className="text-muted">Created At {moment(post.post_date+' '+post.post_time, "DD-MM-YYYY hh:mm:ss a").fromNow()}</small></p>
                    <p className="card-text"><small className="text-muted">latitude:{post.latitude} longitude:{post.longitude}</small></p>
                    <p className="card-text"><small className="text-muted">Views:{post.view_list}</small></p>
                    </div>
                
                    <div className="border-top d-flex card-footer">
                        <div className="card-post__author d-flex">
                            <p className="card-post__author-avatar card-post__author-avatar--small"> Written by {post.user_name}</p>
                                <div className="d-flex flex-column justify-content-center ml-3">
                                    <span className="card-post__author-name">{post.user_name}</span>
                                    <small className="text-muted">{post.post_date}</small>
                                </div>
                            </div>
                            <div className="my-auto ml-auto">
                                <button className="btn btn-white btn-sm">
                                    <i className="far fa-bookmark mr-1"></i> Bookmark
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        );
        console.log(postItems);
        return(
            <div className="container">
                <div className="row" data-masonry='{"percentPosition": true }'>
                    {postItems}
                </div>
            </div>
        )
    }
}
export default Posts
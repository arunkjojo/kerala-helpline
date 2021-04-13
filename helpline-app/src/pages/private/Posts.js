import React from 'react';
import axios from 'axios';
// import { Image } from "react-bootstrap";
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
            // <div key={index} className="post">
            //     <Image src={post.image_video} />
            //     <p>{post.message}</p>
            //     <p>
            //         {post.post_date+'T'+post.post_time}
            //     </p>
            //     <p>
            //         {moment(post.post_date+'T'+post.post_time).fromNow()}
            //     </p>
            //     <p>latitude:{post.latitude} longitude:{post.longitude}</p>
            // </div>
            <div className="col-sm-6 col-lg-4 mb-4">
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
                            <a className="card-post__author-avatar card-post__author-avatar--small"> Written by {post.user_name}</a>
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
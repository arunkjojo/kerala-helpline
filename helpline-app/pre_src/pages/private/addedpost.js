import React from 'react';
// import axios from 'axios';
import Cookies from 'js-cookie';
import toastr from 'toastr';
import pako from 'pako';
class Addpost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            message : '',
            view_list : '',
            assets : '',
            type : '',
            latitudeValue : '',
            longitudeValue : '',
            file:'',
            fileName:''
        }
        this.user = JSON.parse(Cookies.get('user'));
        // this.addPost = this.addPost.bind(this);
        
    }

    componentDidMount() {
        if("geolocation" in navigator)
            toastr.success("Location are available");
        else
            toastr.primary("Location not available");
        navigator.geolocation.getCurrentPosition((position)=> {
            let lat=position.coords.latitude;
            let lon=position.coords.longitude;
            // console.log(position);
            // console.log("Latitude is :", lat);
            // console.log("Longitude is :", lon);
            this.setState({ 
                latitudeValue : lat,
                longitudeValue : lon
            });
        });
        
    }

    assetsSelect = (e) => {
        // this.setState({
        //     assets : e.target.files[0],
        //     type : e.target.files[0].type.split('/')[0]
        // });
        // console.log(e.target.files[0].name,e.target.files[0].type.split('/')[0]);

        const file = e.target.files[0];
        const fileType=e.target.files[0].type.split('/')[0];
        this.setState({
            file : file,
            type : fileType
        });
    }

    inputSet = (e)=>{
        // console.log(e.target.name+' '+e.target.value);
        this.setState({ [e.target.name] : (e.target.value)});
        // console.log(this.state);
        
    }

    addPost = (e)=>{
        e.preventDefault();
        var dat={
            user_id : this.user.id,
            message : this.state.message,
            assets : this.state.assets,
            type : this.state.type,
            view_list : this.state.view_list,
            latitudeValue : this.state.latitudeValue,
            longitudeValue : this.state.longitudeValue
        }
        // console.log(dat);
        if((!dat.latitudeValue) && (!dat.longitudeValue)){
            toastr.warning("Enable your location, it useful to HELPERS", "Enable your location!");
        }
        if((dat.message==='') && (dat.assets==='')){
            toastr.warning("What you need", "Inform to HELPERS!");
        }
        if(dat.view_list===''){
            toastr.warning("Who can see your request?", "Who can see?");
        }
        if(dat.user_id !== '' && dat.latitudeValue !== '' && dat.longitudeValue !== '' && (dat.message !== '' || dat.assets !== '')){
            if(this.state.file){
                const data = new FormData();
                const reader = new FileReader();
        
                reader.onload = (e) => {
                    const fileAsArray = new Uint8Array((this.state.file as any).result as ArrayBuffer);
                    const compressedFileArray = pako.deflate(fileAsArray);
                    const compressedFile = compressedFileArray.buffer;
                    const dataToUpload = new Blob([compressedFile], {type: file.type});
                    let fileToUpload = new Blob([dataToUpload], {type: file.type});
                    data.append('file', fileToUpload, file.name);
                    console.log(data);
                }
            }

            axios.post('http://api.helplinekerala.com/add_post.php',dat)
            .then( response =>{
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        }
    }

    render(){
          
        return(
            <div className="container">
                <form className="form-group">
                    <div className="form-group">
                        <label htmlFor="message">Enter your message</label><br/>
                        <textarea cols="110" onChange={this.inputSet} className="form-control" placeholder="Type your message" id="message" autoFocus autoComplete name="message"></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="assets">Image / Video</label><br/>
                        <input type="file" accept="allowedMimes" ref="inputFile" onChange={this.assetsSelect} id="assets" name="assets"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="viewList">Who can see this post</label><br/>
                        <div id="viewList" className="form-group">
                            <label htmlFor="all">
                                <input type="checkbox" onClick={this.inputSet} placeholder="All" id="all" value="All" name="view_list"/>
                                All
                            </label><br/>
                            <label htmlFor="police">
                                <input type="checkbox" onClick={this.inputSet} placeholder="Police" id="police" value="Police" name="view_list"/>
                                Police
                            </label><br/>
                            <label htmlFor="fire_force">
                                <input type="checkbox" onClick={this.inputSet} placeholder="Fire force" id="fire_force" value="Fire force" name="view_list"/>
                                Fire force
                            </label><br/>
                            <label htmlFor="rapid_force">
                                <input type="checkbox" onClick={this.inputSet} placeholder="Rapid force" id="rapid_force" value="Rapid force" name="view_list"/>
                                Rapid force
                            </label><br/>
                            <label htmlFor="medical">
                                <input type="checkbox" onClick={this.inputSet} placeholder="Medical" id="medical" value="Medical Related" name="view_list"/>
                                Medical Related
                            </label><br/>
                            <label htmlFor="gov_authority">
                                <input type="checkbox" onClick={this.inputSet} placeholder="Government Authority" id="gov_authority" value="Government Authority" name="view_list"/>
                                Government Authority
                            </label><br/>
                            <label htmlFor="common_citizen">
                                <input type="checkbox" onClick={this.inputSet} placeholder="Government Authority" id="common_citizen" value="Common Citizen" name="view_list"/>
                                Common Citizen
                            </label>
                        </div>
                        
                    </div>
                    <div className="form-group">
                        <button onClick={this.handleSubmission} className="form-control btn btn-success">Post</button>
                    </div>
                </form>
            </div>
        );
    }
  
}
export default Addpost;
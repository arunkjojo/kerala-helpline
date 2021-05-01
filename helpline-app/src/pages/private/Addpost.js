import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import toastr from 'toastr';
// import pako from 'pako';
class Addpost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            message : '',
            type : '',
            assets : '',
            all : '',
            police : '',
            fire_force : '',
            rapid_force : '',
            medical : '',
            gov_authority : '',
            common_citizen : '',
            latitudeValue : '',
            longitudeValue : ''
        }

        // this.addPost = this.addPost.bind(this);
        this.user = JSON.parse(Cookies.get('user'));
        this.uploadData = this.uploadData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
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
        // const file = e.target.files[0];
        // const fileType=e.target.files[0].type.split('/')[0];
        // const data = new FormData();
        // const reader = new FileReader();

        // let fileToUpload = null;
        // let filename = null;
        // let filetype = null;

        // reader.onload = (e) => {
        //     const fileAsArray = new Uint8Array((e.target).result);
        //     const compressedFileArray = pako.deflate(fileAsArray);
        //     const compressedFile = compressedFileArray.buffer;
        //     const dataToUpload = new Blob([compressedFile], {type: file.type});
        //     fileToUpload = new Blob([dataToUpload], {type: file.type});
        //     data.append('file', fileToUpload, file.name);
        //     filename = file.name;
        //     filetype = file.type;
        //     console.log(data);
            
        //     this.setState({
        //         file : fileToUpload,
        //         filetype : filetype,
        //         filename: filename
        //     });
        // };
        // reader.readAsArrayBuffer(file);

        this.setState({
            assets:e.target.files[0],
            filetype:e.target.files[0].type.split('/')[0]
        })

    }

    inputSet = (e)=>{
        // console.log(e.target.name+' '+e.target.value);
        this.setState({ [e.target.name] : (e.target.value)});
        // console.log(this.state);
    }

    inputCheckBox=(e)=>{
        // console.log(e.target.name,e.target.checked,e.target.value);
        const name =e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        
        if(name === 'all' && value === true){
            this.setState({
                all : true,
                police : true,
                fire_force : true,
                rapid_force : true,
                medical : true,
                gov_authority : true,
                common_citizen : true
            });
        }else if(name === 'all' && value === false){

            this.setState({
                all : false,
                police : false,
                fire_force : false,
                rapid_force : false,
                medical : false,
                gov_authority : false,
                common_citizen : false
            });

        }else{

            this.setState({ [name] : (value)});
            
            if((name === 'police' || name === 'fire_force' || name === 'rapid_force' || name === 'medical' || name === 'gov_authority' || name === 'common_citizen') && value ===false){
                
                this.setState({all:false});
            }else {
                switch (name) {
                    case 'police':
                        if(value === true){
                            if((this.state.fire_force && this.state.rapid_force && this.state.medical && this.state.gov_authority && this.state.common_citizen)===true){
                                this.setState({all:true});
                            }
                        }
                    break;
                    case 'fire_force':
                        if(value === true){
                            if((this.state.police && this.state.rapid_force && this.state.medical && this.state.gov_authority && this.state.common_citizen)===true){
                                this.setState({all:true});
                            }
                        }
                    break;
                    case 'rapid_force':
                        if(value === true){
                            if((this.state.fire_force && this.state.police && this.state.medical && this.state.gov_authority && this.state.common_citizen)===true){
                                this.setState({all:true});
                            }
                        }
                    break;
                    case 'medical':
                        if(value === true){
                            if((this.state.fire_force && this.state.rapid_force && this.state.police && this.state.gov_authority && this.state.common_citizen)===true){
                                this.setState({all:true});
                            }
                        }
                    break;
                    case 'gov_authority':
                        if(value === true){
                            if((this.state.fire_force && this.state.rapid_force && this.state.medical && this.state.police && this.state.common_citizen)===true){
                                this.setState({all:true});
                            }
                        }
                    break;
                    case 'common_citizen':
                    if(value === true){
                        if((this.state.fire_force && this.state.rapid_force && this.state.medical && this.state.gov_authority && this.state.police)===true){
                            this.setState({all:true});
                        }
                    }
                    break;
                    default:
                        if((this.state.police && this.state.fire_force && this.state.rapid_force && this.state.medical && this.state.gov_authority && this.state.common_citizen)===true){
                            this.setState({all:true});
                        }
                    break;
                    
                }
            }
            
        }
        // console.log(this.state);
    }
    
    // addPost=(e)=>{
    //     e.preventDefault();
    //     var dat={
    //         user_id : this.user.id,
    //         message : this.state.message,
    //         assets : this.state.assets,
    //         type : this.state.type,
    //         allUser : this.state.all,
    //         police : this.state.police,
    //         fireForce : this.state.fire_force,
    //         rapidForce : this.state.rapid_force,
    //         medicalRelated : this.state.medical,
    //         govAuthority : this.state.gov_authority,
    //         commonCitizen : this.state.common_citizen,
    //         latitudeValue : this.state.latitudeValue,
    //         longitudeValue : this.state.longitudeValue
    //     }
    //     if((dat.message==='') && (dat.assets==='')){
    //         toastr.warning("What you need", "Inform to HELPERS!");
    //     }
    //     if(dat.view_list===''){
    //         toastr.warning("Who can see your request?", "Who can see?");
    //     }
    //     if(dat.user_id !== '' && dat.latitudeValue !== '' && dat.longitudeValue !== '' && (dat.message !== '' || dat.assets !== '')){
    //         if(this.state.file){
    //             dat.file = this.state.file
    //         }
    //         // const compressed = pako.deflate(JSON.stringify(dat));
    //         axios.post('http://api.helplinekerala.com/add_post.php',compressed)
    //         .then( response =>{
    //             // handle success
    //             console.log(response);
    //             // if(response.data.status){
    //             //     window.location.replace("/app");
    //             // }
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         })
    //     }
    // }

    onSubmit=(e)=>{
        e.preventDefault();
        this.uploadData();
    }

    uploadData=()=>{

        const formData = new FormData();
        
        formData.append('user_id',this.user.id)
        formData.append('assets',this.state.assets)
        formData.append('fileType',this.state.type)
        formData.append('message',this.state.message)
        formData.append('latitudeValue',this.state.latitudeValue)
        formData.append('longitudeValue',this.state.longitudeValue)
        formData.append('allUser',this.state.all)
        formData.append('commonCitizen',this.state.common_citizen)
        formData.append('police',this.state.police)
        formData.append('fireForce',this.state.fire_force)
        formData.append('rapidForce',this.state.rapid_force)
        formData.append('medicalRelated',this.state.medical)
        formData.append('govAuthority',this.state.gov_authority)

            axios.post('http://api.helplinekerala.com/add_post.php', formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then(response=>{
                console.log(response);
                if(response.data.status){
                    window.location.replace("/app");
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    render(){
          
        return(
            <div className="container">
                <form className="form-group" onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label htmlFor="message">Enter your message</label><br/>
                        <textarea cols="110" onChange={this.inputSet} className="form-control" placeholder="Type your message" id="message" autoFocus autoComplete name="message"></textarea>
                        {/* <input type="text"  placeholder="Type your message" id="message" name="message"/> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="assets">Image / Video</label><br/>
                        <input type="file" accept="allowedMimes" ref="inputFile" onChange={this.assetsSelect} id="assets" name="assets"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="viewList">Who can see this post</label><br/>
                        <div id="viewList" className="form-group">
                            <label htmlFor="all">
                                <input type="checkbox" checked={this.state.all} onClick={this.inputCheckBox} placeholder="All" id="all" value="All" name="all"/>
                                All
                            </label><br/>
                            <label htmlFor="police">
                                <input type="checkbox" checked={this.state.police} onClick={this.inputCheckBox} placeholder="Police" id="police" value="Police" name="police"/>
                                Police
                            </label><br/>
                            <label htmlFor="fire_force">
                                <input type="checkbox" checked={this.state.fire_force} onClick={this.inputCheckBox} placeholder="Fire force" id="fire_force" value="Fire force" name="fire_force"/>
                                Fire force
                            </label><br/>
                            <label htmlFor="rapid_force">
                                <input type="checkbox" checked={this.state.rapid_force} onClick={this.inputCheckBox} placeholder="Rapid force" id="rapid_force" value="Rapid force" name="rapid_force"/>
                                Rapid force
                            </label><br/>
                            <label htmlFor="medical">
                                <input type="checkbox" checked={this.state.medical} onClick={this.inputCheckBox} placeholder="Medical" id="medical" value="Medical Related" name="medical"/>
                                Medical Related
                            </label><br/>
                            <label htmlFor="gov_authority">
                                <input type="checkbox" checked={this.state.gov_authority} onClick={this.inputCheckBox} placeholder="Government Authority" id="gov_authority" value="Government Authority" name="gov_authority"/>
                                Government Authority
                            </label><br/>
                            <label htmlFor="common_citizen">
                                <input type="checkbox" checked={this.state.common_citizen} onClick={this.inputCheckBox} placeholder="Common Citizen" id="common_citizen" value="Common Citizen" name="common_citizen"/>
                                Common Citizen
                            </label>
                        </div>
                        
                    </div>
                    <div className="form-group">
                        <button onClick={this.addPost} className="form-control btn btn-success">Post</button>
                    </div>
                </form>
            </div>
        );
    }
  
}
export default Addpost;
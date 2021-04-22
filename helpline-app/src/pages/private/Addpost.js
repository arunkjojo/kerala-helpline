import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import toastr from 'toastr';
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

        
        this.user = JSON.parse(Cookies.get('user'));
        this.addPost = this.addPost.bind(this);
        
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
        this.setState({
            assets : e.target.files[0].name,
            type : e.target.files[0].type.split('/')[0]
        });
        // console.log(e.target.files[0].name,e.target.files[0].type.split('/')[0]);
    }

    inputSet = (e)=>{
        // console.log(e.target.name+' '+e.target.value);
        this.setState({ [e.target.name] : (e.target.value)});
        // console.log(this.state);
    }

    inputCheckBox=(e)=>{
        const name =e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ [name] : (value)});
    }
    
    addPost = (e)=>{
        e.preventDefault();
        var dat={
            user_id : this.user.id,
            message : this.state.message,
            assets : this.state.assets,
            type : this.state.type,
            all : this.state.all,
            police : this.state.police,
            fireForce : this.state.fire_force,
            rapidForce : this.state.rapid_force,
            medical : this.state.medical,
            govAuthority : this.state.gov_authority,
            commonCitizen : this.state.common_citizen,
            latitudeValue : this.state.latitudeValue,
            longitudeValue : this.state.longitudeValue
        }
        // console.log(dat);
        // if((!dat.latitudeValue) && (!dat.longitudeValue)){
        //     toastr.warning("Enable your location, it useful to HELPERS", "Enable your location!");
        // }
        if((dat.message==='') && (dat.assets==='')){
            toastr.warning("What you need", "Inform to HELPERS!");
        }
        if(dat.view_list===''){
            toastr.warning("Who can see your request?", "Who can see?");
        }
        if(dat.user_id !== '' && dat.latitudeValue !== '' && dat.longitudeValue !== '' && (dat.message !== '' || dat.assets !== '')){
            axios.post('http://api.helplinekerala.com/add_post.php',dat)
            .then( response =>{
                // handle success
                // console.log(response.data.status);
                if(response.data.status){
                    window.location.replace("/app");
                }
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
                        {/* <input type="text"  placeholder="Type your message" id="message" name="message"/> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="assets">Image / Video</label><br/>
                        <input type="file" onChange={this.assetsSelect} id="assets" name="assets" accept="image/*,video/*"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="viewList">Who can see this post</label><br/>
                        <div id="viewList" className="form-group">
                            <label htmlFor="all">
                                <input type="checkbox" onClick={this.inputCheckBox} placeholder="All" id="all" value="All" name="all"/>
                                All
                            </label><br/>
                            <label htmlFor="police">
                                <input type="checkbox" onClick={this.inputCheckBox} placeholder="Police" id="police" value="Police" name="police"/>
                                Police
                            </label><br/>
                            <label htmlFor="fire_force">
                                <input type="checkbox" onClick={this.inputCheckBox} placeholder="Fire force" id="fire_force" value="Fire force" name="fire_force"/>
                                Fire force
                            </label><br/>
                            <label htmlFor="rapid_force">
                                <input type="checkbox" onClick={this.inputCheckBox} placeholder="Rapid force" id="rapid_force" value="Rapid force" name="rapid_force"/>
                                Rapid force
                            </label><br/>
                            <label htmlFor="medical">
                                <input type="checkbox" onClick={this.inputCheckBox} placeholder="Medical" id="medical" value="Medical Related" name="medical"/>
                                Medical Related
                            </label><br/>
                            <label htmlFor="gov_authority">
                                <input type="checkbox" onClick={this.inputCheckBox} placeholder="Government Authority" id="gov_authority" value="Government Authority" name="gov_authority"/>
                                Government Authority
                            </label><br/>
                            <label htmlFor="common_citizen">
                                <input type="checkbox" onClick={this.inputCheckBox} placeholder="Government Authority" id="common_citizen" value="Common Citizen" name="common_citizen"/>
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
import React, {Component} from 'react';
// import toastr from 'toastr';
import Auth from '../../helper/Auth';
import axios from 'axios';
import Cookies from 'js-cookie';
import style from "./../../userStyle.css";
import { Image } from "react-bootstrap";

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";

class Profile extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            userName : "",
            mobileNumber : "",
            userType : "",
            password : "",
            showPassword: false,
            district : "",
            localbody : "",
            area : "",
            profile_pic : "",
            localbodies: []
        }
        this.profileForm = this.profileForm.bind(this);
    }

    componentDidMount()
    {
        const user = Cookies.getJSON("user");
        return axios.get('http://api.helplinekerala.com/get_user.php',{
            params: {
                id:user.id
            }
        })
        .then( response =>{
            // handle success
            // console.log(response.data);
            this.setState({
                userName:response.data.userName,
                mobileNumber : response.data.mobileNumber,
                userType : response.data.userType,
                showPassword: false,
                district : response.data.district,
                localbody : response.data.localbody,
                area : response.data.area,
                profile_pic : response.data.profile_pic,
            });
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }
    inputSet = (e)=>{
        // console.log(e.target.name+' '+e.target.value);
        this.setState({ [e.target.name] : (e.target.value)});
        
        // console.log(this.state);
    }

    profileImageChange = (e)=>{
        // console.log(e.target.name+' '+e.target.value);
        this.setState({ [e.target.name] : (e.target.value)});
        
        // console.log(this.state);
    }

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword });
    };
      
    handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    localbodySet = (val) =>{
        this.setState({[val.target.name]: (val.target.value)});
        this.setState({
            localbody: ""
        });
        var district_id=val.target.value;
        // console.log(this.state);
        Auth.localBody(district_id).then(response=>{
            this.setState({localbodies:response.data});
            // console.log(this.state.localbodies);
            // this.setState({localbodies:response.data});
        })
        .catch(error => {
            console.error(error);
        })
    }
    
    profileForm = (e)=>{
        e.preventDefault();
        // var dat={
        //     user : this.state.userName,
        //     mobile : this.state.mobileNumber,
        //     usrtype : this.state.userType,
        //     password : this.state.password,
        //     dist : this.state.district,
        //     localbody : this.state.localbody,
        //     area : this.state.area,
        //     blood : this.state.blood
        // }
        // if(dat.user && dat.mobile && dat.password && dat.usrtype && dat.dist && dat.localbody && dat.area && dat.blood){
        //     if(dat.user.length < 1){
        //         toastr.warning("Name must be enter", "Enter Your Name");
        //     }
        //     if(dat.mobile.length !== 10){
        //         toastr.warning("Enter Valid Mobile number", "Invalid Mobile Details");
        //     }
        //     if(dat.usrtype.length < 1){
        //         toastr.warning("User type must be select", "Enter User Type");
        //     }
        //     if(dat.password.length < 8){
        //         toastr.warning("Password must be minimum 8 characters", "Invalid password");
        //     }
        //     if(dat.password.length > 16){
        //         toastr.warning("Password must be maximum 16 characters", "Invalid password");
        //     }
        //     if(dat.dist.length ===0){
        //         toastr.warning("Your district must be select", "Select Your District");
        //     }
        //     if(dat.localbody.length ===0){
        //         toastr.warning("Your local body must be select", "Select Your Local Body");
        //     }
        //     if(dat.area.length < 1){
        //         toastr.warning("Your area must be enter", "Enter Your Area");
        //     }
        //     if(dat.blood.length ===0){
        //         toastr.warning("Your blood group must be select", "Select Your Blood Group");
        //     }
        //     if(dat.user.length > 0 && dat.usrtype.length > 0 && dat.dist.length > 0 && dat.localbody.length > 0 && dat.area.length > 1 && dat.blood.length > 0 && (dat.password.length >=8  && dat.password.length <= 16) && dat.mobile.length === 10){
        //         Auth.profile(dat).then(response=>{
        //             console.log(response.data.user);
        //             if(Auth.isAuth()){
        //                 window.location.replace("/app");
        //             }
        //         })
        //         .catch(error => {
        //             toastr.error("The provided credentials are already exist, Please try Login", "Already Exist");
        //         });
        //     }
        // }else{
        //     toastr.error("Please enter the full details", "Enter Details");
        // }

        console.log(this.state);
    
    }

    
    render(){
        let localList = this.state.localbodies.length > 0 && this.state.localbodies.map(function (lb,i) {
            return <option key={i} value={`${lb.id}`}>{lb.name}</option>;
        })
        
        return(
            <div className="container">
                <form className="form-group" noValidate>
                    <div className="form-group">
                        <Image src={this.state.profile_pic} style={style} className="profilePic" roundedCircle />
                        {/* <label htmlFor="pro_img">Profile Image</label><br/> 
                        <Input type="file" value={this.state.profile_pic} onChange={this.profileImageChange} className="form-control" id="profile_pic" name="profile_pic" placeholder="Upload Profile Image"/> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Name</label>
                        <Input type="text" autoFocus value={this.state.userName} onKeyPress={(event) => {if (!/[A-Za-z]/.test(event.key)) {event.preventDefault();}}} onChange={this.inputSet}  className="form-control" id="username" name="userName" placeholder="Enter your Name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <Input type="number" value={this.state.mobileNumber} onChange={this.inputSet} className="form-control" id="mobile" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} name="mobileNumber" placeholder="Enter your Mobile number" required noValidate/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass">New Password</label>
                        <Input 
                            type={
                                this.state.showPassword ? "text" : "password"
                            } 
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            } 
                            onChange={this.inputSet} value={this.state.password} className="form-control" placeholder="Enter Password" required noValidate id="pass" name="password" 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="user_type">Change Account Type</label>
                        <Select onChange={this.inputSet} className="form-control" id="user_type" name="userType" required noValidate>
                            <option selected disabled>Choose your Account Type</option>
                            <option value="Common Citizen">Common Citizen</option>
                            <option value="Police">Police</option>
                            <option value="Fire Force">Fire Force</option>
                            <option value="Rapid Force">Rapid Force</option>
                            <option value="Government Authority">Government Authority</option>
                            <option value="Medical Related">Medical Related</option>
                        </Select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="district">Update Your District</label>
                        <Select onChange={this.localbodySet} className="form-control" id="district" name="district" required noValidate>
                            <option selected disabled>Select Your District</option>
                            <option value="1">Thiruvananthapuram</option>
                            <option value="2">Kollam</option>
                            <option value="3">Alappuzha</option>
                            <option value="4">Pathanamthitta</option>
                            <option value="5">Kottayam</option>
                            <option value="6">Idukki</option>
                            <option value="7">Ernakulam</option>
                            <option value="8">Thrissur</option>
                            <option value="9">Palakkad</option>
                            <option value="10">Malappuram</option>
                            <option value="11">Kozhikode</option>
                            <option value="12">Wayanad</option>
                            <option value="13">Kannur</option>
                            <option value="14">Kasaragod</option>
                        </Select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="localbody">Choose localbody</label>
                        <Select onChange={this.inputSet} className="form-control" id="localbody" name="localbody" required noValidate>
                            <option selected disabled>Select your localbody</option>
                            { localList }
                        </Select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="area">Update Your Location</label>
                        <Input type="text" value={this.state.area} onChange={this.inputSet} className="form-control" id="area" name="area" placeholder="Enter your Location" required noValidate/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="blood">Your Blood Group</label>
                        <Select onChange={this.inputSet} className="form-control" id="blood" name="blood" required noValidate>
                            <option selected disabled>Select Your Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </Select>
                    </div>
                    <div className="form-group">
                        <button onClick={this.profileForm} className="form-control btn btn-success">Save Profile</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Profile;
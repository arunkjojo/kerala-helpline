import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import toastr from 'toastr';
import Auth from '../../helper/Auth';


import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName : "",
            mobileNumber : "",
            userType : "",
            password : "",
            district : "",
            localbody : "",
            area : "",
            blood : "",
            showPassword: false,
            localbodies: []
        }
        this.registerForm = this.registerForm.bind(this);
        if(Auth.isAuth()){
            this.props.history.push('/app');
        }
    }

    inputSet = (e)=>{
        // console.log(e.target.name+' '+e.target.value);
        this.setState({ [e.target.name] : (e.target.value)});
        
        console.log(this.state);
    }
    validation =(ev)=>{
        const txt = /[A-Za-z]/;
        let nm=ev.target.value.split('');
        let usnm = nm.pop();
        if(!txt.test(usnm)){
            let Username = nm.join('');
            this.setState({userName:Username});
            toastr.error("Name must be letters", "Invalid User Name");
        }
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
        console.log(this.state);
        Auth.localBody(district_id).then(response=>{
            this.setState({localbodies:response.data});
            // console.log(this.state.localbodies);
            // this.setState({localbodies:response.data});
        })
        .catch(error => {
            console.error(error);
        })
    }
    
    registerForm = (e)=>{
        e.preventDefault();
        var dat={
            user : this.state.userName,
            mobile : this.state.mobileNumber,
            usrtype : this.state.userType,
            password : this.state.password,
            dist : this.state.district,
            localbody : this.state.localbody,
            area : this.state.area,
            blood : this.state.blood
        }
        // console.log('outside of 1st if ', dat);
        if(dat.user && dat.mobile && dat.password && dat.usrtype && dat.dist && dat.localbody && dat.area && dat.blood){
            if(dat.user.length < 1){
                toastr.warning("Name must be enter", "Enter Your Name");
            }
            if(dat.mobile.length !== 10){
                toastr.warning("Enter Valid Mobile number", "Invalid Mobile Details");
            }
            if(dat.usrtype.length < 1){
                toastr.warning("User type must be select", "Enter User Type");
            }
            if(dat.password.length < 8){
                toastr.warning("Password must be minimum 8 characters", "Invalid password");
            }
            if(dat.password.length > 16){
                toastr.warning("Password must be maximum 16 characters", "Invalid password");
            }
            if(dat.dist.length ===0){
                toastr.warning("Your district must be select", "Select Your District");
            }
            if(dat.localbody.length ===0){
                toastr.warning("Your local body must be select", "Select Your Local Body");
            }
            if(dat.area.length < 1){
                toastr.warning("Your area must be enter", "Enter Your Area");
            }
            if(dat.blood.length ===0){
                toastr.warning("Your blood group must be select", "Select Your Blood Group");
            }
            // console.log('inside of 1st if ');
            console.log('user '+dat.user.length+' usrtype '+dat.usrtype.length+' dist '+dat.dist.length+' localbody '+dat.localbody.length+' area '+dat.area.length+' blood '+dat.blood.length+' password '+dat.password.length+' mobile '+dat.mobile.length);

            if(dat.user.length > 0 && dat.usrtype.length > 0 && dat.dist.length > 0 && dat.localbody.length > 0 && dat.area.length > 1 && dat.blood.length > 0 && (dat.password.length >=8  && dat.password.length <= 16) && dat.mobile.length === 10){
                console.log('inside of 2nd if ',dat);
                // Auth.register(dat).then(response=>{
                //     console.log(response.data.user);
                //     if(Auth.isAuth()){
                //         this.props.history.push('/app');
                //     }
                // })
                // .catch(error => {
                //     toastr.error("The provided credentials are already exist, Please try Login", "Already Exist");
                //     // console.error(error);
                // });
            }
            // console.log(dat);
        }else{
            toastr.error("Please enter the full details", "Enter Details");
        }
    
    }

    
    render(){
        let localList = this.state.localbodies.length > 0 && this.state.localbodies.map(function (lb,i) {
            return <option key={i} value={`${lb.id}`}>{lb.name}</option>;
        })
        
        return(
            <div className="container">
                <form className="form-group" noValidate>
                    <div className="form-group">
                        <label htmlFor="username">Name</label>
                        <Input type="text" autoFocus value={this.state.userName} onChange={this.inputSet} onKeyPress={this.validation} className="form-control" id="username" name="userName" placeholder="Enter your Name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <Input type="number" onChange={this.inputSet} className="form-control" id="mobile" name="mobileNumber" placeholder="Enter your Mobile number" required noValidate/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass">Password</label>
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
                            onChange={this.inputSet} className="form-control" placeholder="Enter Password" required noValidate id="pass" name="password" 
                        />
                        {/* <input type="password" onChange={this.inputSet} className="form-control" id="pass" name="password" placeholder="Enter Password" required noValidate/> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="user_type">Account Type</label>
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
                        <label htmlFor="district">Your District</label>
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
                        <label htmlFor="area">Your Location</label>
                        <Input type="text" onChange={this.inputSet} className="form-control" id="area" name="area" placeholder="Enter your Location" required noValidate/>
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
                        <button onClick={this.registerForm} className="form-control btn btn-success">Register</button>
                    </div>
                </form>
                <div className="container">
                    <Link to="/login">I am already register in this application, Login</Link>
                </div>
            </div>
        );
    }
}

export default Register;
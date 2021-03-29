import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import toastr from 'toastr';
import Auth from './helper/Auth';


class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName : "",
            mobileNumber : "",
            userType : "",
            password : "",
            district : "",
            adhaar : "",
            taluk : "",
            panchayath : ""
        }
        this.registerForm = this.registerForm.bind(this);
        if(Auth.isAuth()){
            this.props.history.push('/home');
        }
    }


    inputSet = (e)=>{
        // console.log(e.target.name+' '+e.target.value);
        // debugger;
            this.setState({ [e.target.name] : (e.target.value)});
        
    }


    registerForm = (e)=>{
        e.preventDefault();
        var dat={
            user : this.state.userName,
            mobile : this.state.mobileNumber,
            usrtype : this.state.userType,
            password : this.state.password,
            dist : this.state.district,
            adhaar : this.state.adhaar,
            taluk : this.state.taluk,
            panchayath : this.state.panchayath
        }
        console.error(dat);
        if(dat.user && dat.mobile && dat.password && dat.usrtype && dat.dist && dat.adhaar && dat.taluk && dat.panchayath){
            if(dat.user.length < 1){
                toastr.warning("Name must be enter", "Enter Your Name");
            }
            if(dat.usrtype.length < 1){
                toastr.warning("User type must be select", "Enter User Type");
            }
            if(dat.adhaar.length < 1){
                toastr.warning("Adhaar Number must be enter", "Enter Your adhaar number");
            }if(dat.adhaar.length > 12){
                toastr.warning("Enter Valid Adhaar Number", "Enter Your adhaar number");
            }
            if(dat.dist.length < 1){
                toastr.warning("Your district must be select", "Enter Your District");
            }
            if(dat.dist.length < 1){
                toastr.warning("Your district must be select", "Enter Your District");
            }
            if(dat.mobile.length < 10){
                toastr.warning("Mobile number must be minimum 10 digit", "Invalid Mobile Details");
            }if(dat.mobile.length > 10){
                toastr.warning("Enter Valid Mobile number", "Invalid Mobile Details");
            }
            if(dat.user.length > 1 && dat.usrtype.length > 1 && dat.dist.length > 1 && dat.taluk.length > 1 && dat.adhaar.length === 16 && dat.password.length >= 8 && dat.mobile.length === 10){
                
                Auth.register(dat).then(response=>{
                    // console.log(response.data.user);
                    if(Auth.isAuth()){
                        this.props.history.push('/home');
                    }
                })
                .catch(error => {
                    toastr.error("The entered information's are already exist, Please try Login", "Already Exist");
                    // console.error(error);
                });
            }
            console.log(dat);
        }else{
            toastr.error("Please enter the full details", "Enter Details");
        }
    
    }

    
    render(){
        return(
            <div className="container">
                <form className="form-group" noValidate>
                    <div className="form-group">
                        <label htmlFor="username">Name</label>
                        <input type="text" autoFocus onChange={this.inputSet} className="form-control" id="username" name="userName" placeholder="Enter your Name" onKeyPress={event => (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass">Password</label>
                        <input type="password" onChange={this.inputSet} className="form-control" id="pass" name="password" placeholder="Enter Password" pattern = "/[A-Za-z0-9!@#$%*^_-/.,;:\|]/" required noValidate/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input type="number" onChange={this.inputSet} className="form-control" id="mobile" name="mobileNumber" placeholder="Enter your Mobile number" pattern = "/[0-9]/" required noValidate/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="adhaar">Adhaar Number</label>
                        <input type="number" onChange={this.inputSet} className="form-control" id="adhaar" name="adhaar" placeholder="Enter your Adhaar number" pattern = "/[0-9]/" required noValidate/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="user_type">Account Type</label>
                        <select onChange={this.inputSet} className="form-control" id="user_type" name="userType" required noValidate>
                            <option selected disabled>Choose your Account Type</option>
                            <option value="User">User</option>
                            <option value="Police">Police</option>
                            <option value="Fire Force">Fire Force</option>
                            <option value="Rapid Force">Rapid Force</option>
                            <option value="Panjayath">Panjayath</option>
                            <option value="Hospital">Hospital</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="district">Your District</label>
                        <select onChange={this.inputSet} className="form-control" id="district" name="district" required noValidate>
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
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="taluk">Your Taluk</label>
                        {/* <input onChange={this.inputSet} placeholder="Enter your Taluk" className="form-control" id="taluk" name="taluk" required noValidate/> */}
                        <select onChange={this.inputSet} className="form-control" id="taluk" pattern="/[A-Za-z]/" name="taluk" required noValidate>
                            <option selected disabled>Select Your Taluk</option>
                            <option value="1">Manjeshwaram</option>
                            <option value="2">Kasaragod</option>
                            <option value="3">Vellarikkund</option>
                            <option value="4">Hosdurg</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="panchayath">Your Panchayath</label>
                        <input onChange={this.inputSet} placeholder="Enter your Panchayath" className="form-control" id="panchayath" name="panchayath" pattern = "[A-Za-z]"required noValidate/>
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
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import toastr from 'toastr';
import Auth from '../../helper/Auth';

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
            address : "",
            localbodies: []
        }
        this.registerForm = this.registerForm.bind(this);
        if(Auth.isAuth()){
            this.props.history.push('/home');
        }
    }


    inputSet = (e)=>{
        // console.log(e.target.name+' '+e.target.value);
        this.setState({ [e.target.name] : (e.target.value)});
        console.log(this.state);
        
    }

    localbodySet = (val) =>{
        this.setState({[val.target.name]: (val.target.value)});
        this.setState({
            localbody: ""
        });
        var district_id=val.target.value;
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
            blood : this.state.blood,
            address : this.state.address
        }
        // console.log(dat);
        if(dat.user && dat.mobile && dat.password && dat.usrtype && dat.dist && dat.localbody && dat.area && dat.blood && dat.address){
            if(dat.user.length < 1){
                toastr.warning("Name must be enter", "Enter Your Name");
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
            if(dat.dist.length < 1){
                toastr.warning("Your district must be select", "Select Your District");
            }
            if(dat.localbody.length < 1){
                toastr.warning("Your local body must be select", "Select Your Local Body");
            }
            if(dat.area.length < 1){
                toastr.warning("Your area must be enter", "Enter Your Area");
            }
            if(dat.blood.length < 1){
                toastr.warning("Your blood group must be select", "Select Your Blood Group");
            }
            if(dat.address.length < 1){
                toastr.warning("Your address must be enter", "Enter Your Address");
            }
            if(dat.mobile.length !== 10){
                toastr.warning("Enter Valid Mobile number", "Invalid Mobile Details");
            }
            if(dat.user.length > 0 && dat.usrtype.length > 0 && dat.dist.length > 0 && dat.localbody.length > 0 && dat.area.length > 1 && dat.blood.length > 0 && dat.address.length > 1 && dat.password.length >= 8 && dat.mobile.length === 10){
                
                Auth.register(dat).then(response=>{
                    // console.log(response.data.user);
                    if(Auth.isAuth()){
                        this.props.history.push('/home');
                    }
                })
                .catch(error => {
                    toastr.error("The provided credentials are already exist, Please try Login", "Already Exist");
                    // console.error(error);
                });
            }
            // console.log(dat);
        }else{
            toastr.error("Please enter the full details", "Enter Details");
        }
    
    }

    
    render(){
        let localList = this.state.localbodies.length > 0 && this.state.localbodies.map(function (lb,i) {
            return <option key={i} value={lb.id}>{lb.name}</option>;
        })
        
        return(
            <div className="container">
                <form className="form-group" noValidate>
                    <div className="form-group">
                        <label htmlFor="username">Name</label>
                        <input type="text" autoFocus onChange={this.inputSet} className="form-control" id="username" name="userName" placeholder="Enter your Name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input type="number" onChange={this.inputSet} className="form-control" id="mobile" name="mobileNumber" placeholder="Enter your Mobile number" required noValidate/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass">Password</label>
                        <input type="password" onChange={this.inputSet} className="form-control" id="pass" name="password" placeholder="Enter Password" required noValidate/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="user_type">Account Type</label>
                        <select onChange={this.inputSet} className="form-control" id="user_type" name="userType" required noValidate>
                            <option selected disabled>Choose your Account Type</option>
                            <option value="Common Citizen">Common Citizen</option>
                            <option value="Police">Police</option>
                            <option value="Fire Force">Fire Force</option>
                            <option value="Rapid Force">Rapid Force</option>
                            <option value="Government Authority">Government Authority</option>
                            <option value="Medical Related">Medical Related</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="district">Your District</label>
                        <select onChange={this.localbodySet} className="form-control" id="district" name="district" required noValidate>
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
                        <label htmlFor="localbody">Choose localbody</label>
                        <select onChange={this.inputSet} className="form-control" id="localbody" name="localbody" required noValidate>
                            <option selected disabled>Select your localbody</option>
                            { localList }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="area">Your Area</label>
                        <input type="text" onChange={this.inputSet} className="form-control" id="area" name="area" placeholder="Enter your Area" required noValidate/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="blood">Your Blood Group</label>
                        <select onChange={this.inputSet} className="form-control" id="blood" name="blood" required noValidate>
                            <option selected disabled>Select Your Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Your Address</label>
                        <textarea rows="100%" cols="auto" onChange={this.inputSet} className="form-control" id="address" name="address" placeholder="Enter your Address" required noValidate></textarea>
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
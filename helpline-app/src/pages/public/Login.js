import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import toastr from 'toastr';
import Auth from '../../helper/Auth';

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

// import history from './helper/history';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      mobileNumber : "",
      password: "",
      showPassword: false
    }
    this.loginForm = this.loginForm.bind(this);
    if(Auth.isAuth()){
      this.props.history.push('/app');
    }
  }

  inputSet = (e)=>{
    // console.log(e.target.name+' '+e.target.value);
    if(e.target.value && e.target.name){
      this.setState({ [e.target.name] : (e.target.value)});
    }
    console.log(this.state);
  }

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword });
  };
  
  handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  loginForm = (e)=>{
    e.preventDefault();
    var dat={
      mobile : this.state.mobileNumber,
      password : this.state.password
    }
    
    if(dat.mobile && dat.password){
    // eslint-disable-next-line react-hooks/rules-of-hooks
      if(dat.password.length < 8){
        toastr.warning("Password must be minimum 8 characters", "Invalid Password Details");
      }if(dat.password.length > 16){
        toastr.warning("Password must be maximum 16 characters", "Invalid Password Details");
      }if(dat.mobile.length !== 10){
        toastr.warning("Please enter correct mobile number", "Invalid Mobile Details");
      }if(dat.password.length > 7 && dat.password.length < 17 && dat.mobile.length===10){
        // console.log(dat.mobile+' '+dat.password);
        Auth.login(dat).then(response=>{
          console.log(response.data.user);
          if(Auth.isAuth()){
            this.props.history.push('/app/');
          }
        }).catch(error => {
          
          // Override global options
          toastr.error("The provided credentials are invalid, Please try again or Signup", "Invalid Details");

          // console.error("error", error);
        });
      }
    }
    
  }
  
  render(){
    return(
      <div className="container">
        <form className="form-group">
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <Input type="number" autoFocus onChange={this.inputSet} className="form-control" id="mobile" name="mobileNumber"/>
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
              onChange={this.inputSet} className="form-control" id="pass" name="password" />
          </div>
          <div className="form-group">
            <button onClick={this.loginForm} className="form-control btn btn-success">Login</button>
          </div>
        </form>
        <div className="container">
          <Link to="./forgotpassword">Forgot Password</Link>
        </div>
      </div>
      
    );
  }
  
}
export default Login;
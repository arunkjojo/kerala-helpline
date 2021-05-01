import React,{Component} from 'react';
import toastr from 'toastr';
import Auth from '../../helper/Auth';
// import history from './helper/history';

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

class ForgotPassword extends Component{
  constructor(props){
    super(props);
    this.state = {
      mobileNumber : "",
      password: ""
    }
    this.forgotForm = this.forgotForm.bind(this);
    if(Auth.isAuth()){
      this.props.history.push('/app/');
    }
  }

  inputSet = (e)=>{
    // console.log(e.target.name+' '+e.target.value);
    if(e.target.value && e.target.name){
      this.setState({ [e.target.name] : (e.target.value)});
    }
    // console.log(this.state);
  }

    forgotForm = (e)=>{
    e.preventDefault();
    var dat={
      mobile : this.state.mobileNumber,
      password : this.state.password
    }
    
    if(dat.mobile && dat.password){
      if(dat.password.length < 8){
        toastr.warning("Password must be minimum 8 characters", "Invalid Details");
      } 
      if(dat.mobile.length<10){
        toastr.warning("Mobile number must be 10 digits", "Invalid Details");
      }
      if(dat.password.length >= 8 && dat.mobile.length===10){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        // console.log(dat.mobile+' '+dat.password);
        Auth.forgotPassword(dat).then(response=>{
          //console.log(response.data.user);
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
            <Input type="text" onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} autoFocus onChange={this.inputSet} placeholder="Enter Registered Mobile" autoComplete="off" className="form-control" id="mobile" name="mobileNumber"/>
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
              onChange={this.inputSet} placeholder="Enter New Password" className="form-control" id="pass" name="password" />
          </div>
          <div className="form-group">
            <button onClick={this.forgotForm} className="form-control btn btn-success">Reset Password</button>
          </div>
        </form>
      </div>
      
    );
  }
  
}
export default ForgotPassword;
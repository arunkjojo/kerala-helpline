import React,{Component} from 'react';
import toastr from 'toastr';
import Auth from './helper/Auth';
// import history from './helper/history';

class ForgotPassword extends Component{
  constructor(props){
    super(props);
    this.state = {
      mobileNumber : "",
      password: ""
    }
    this.forgotForm = this.forgotForm.bind(this);
    if(Auth.isAuth()){
      this.props.history.push('/home');
    }
  }

  inputSet = (e)=>{
    // console.log(e.target.name+' '+e.target.value);
    if(e.target.value && e.target.name){
      this.setState({ [e.target.name] : (e.target.value)});
    }
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
      if(dat.password.length >= 8 && dat.mobile.length>=10){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        // console.log(dat.mobile+' '+dat.password);
        Auth.forgotPassword(dat).then(response=>{
          //console.log(response.data.user);
          if(Auth.isAuth()){
            this.props.history.push('/home');
          }
        }).catch(error => {
          
          // Override global options
          toastr.error("The entered information's are invalid, Please try again or Signup", "Invalid Details");

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
            <input type="number"  autoFocus onChange={this.inputSet} className="form-control" id="mobile" name="mobileNumber"/>
          </div>
          <div className="form-group">
            <label htmlFor="pass">Password</label>
            <input type="password" onChange={this.inputSet} className="form-control" id="pass" name="password" />
          </div>
          <div className="form-group">
            <button onClick={this.forgotForm} className="form-control btn btn-info">Reset Password</button>
          </div>
        </form>
      </div>
      
    );
  }
  
}
export default ForgotPassword;
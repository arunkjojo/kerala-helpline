import axios from 'axios';
import Cookies from 'js-cookie';
 class Auth{
    constructor(){
        this.user = {};
        this.authenticated=false;
    }
    register(cred){
        return axios.post("http://api.helplinekerala.com/register.php",cred)
        .then(response=>{
            // console.log("register user", response);
            Cookies.set('user', response.data.user, { expires: 7 });
            return response;
        })
        .catch(error => {
            this.authenticated = false;
            throw error;
        })
    }
    login(cred){
        return axios.post("http://api.helplinekerala.com/login.php",cred)
        .then(response=>{
            // console.log("login user", response.data.user);
            Cookies.set('user', response.data.user, { expires: 7 });
            return response;
        })
        .catch(error => {
            this.authenticated = false;
            throw error;
        })
    }
    forgotPassword(cred){
        return axios.post("http://api.helplinekerala.com/forgot_password.php",cred)
        .then(response=>{
            // console.log("forgotPassword user", response.data.user);
            Cookies.set('user', response.data.user, { expires: 7 });
            return response;
        })
        .catch(error => {
            this.authenticated = false;
            throw error;
        })
    }
    logout(){
        Cookies.remove('user');
        this.authenticated=false; 
        // console.log(Cookies.get('user'));
    }

    isAuth(){
        var status=Cookies.get('user');
        // console.log(status+' '+typeof(status)+' '+typeof(Cookies.get('user')));
        if(status) {
            this.user = JSON.parse(Cookies.get('user'));
            // console.log(this.user);
            this.authenticated = true;
        }
        return this.authenticated;
    }

    localBody(id){
        return axios.post("http://api.helplinekerala.com/localbody.php",{
            did: id,
          })
        .then(response=>{
            return response;
        })
        .catch(error => {
            throw error;
        })
    }
}
export default new Auth();
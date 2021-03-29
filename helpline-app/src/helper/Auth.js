import axios from 'axios';
import Cookies from 'js-cookie';
 class Auth{
    constructor(){
        this.user = {};
        this.authenticated=false;
    }
    register(cred){
        return axios.post("http://localhost/api/api_register.php",cred)
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
        return axios.post("http://localhost/api/api_login.php",cred)
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
        return axios.post("http://localhost/api/api_forgotpassword.php",cred)
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
}
export default new Auth();
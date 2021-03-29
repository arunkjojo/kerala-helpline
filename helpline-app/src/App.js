import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Logout from './Logout';
import Register from './Register';
import Home from './pages/home/Home';
import Public from './pages/public/Public';
import history from './helper/history';
import Auth from './helper/Auth';

class App extends React.Component{
  
  render(){
    // console.log("auth status", Auth.isAuth());
    return(
      
      <Router  history={history}>
        <div className="container">
          <div className="container">
            <Link to="/login">Login</Link>&nbsp;&nbsp;&nbsp;
            <Link to="/home">Home</Link>&nbsp;&nbsp;&nbsp;
            {Auth.isAuth() && <Link to="/logout">Logout</Link>}
          </div>
            
          <Switch>
            <Route path="/" exact component={Public}/> 
            <Route path="/login" component={Login}/>
            <Route path="/forgotpassword" component={ForgotPassword}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/register" component={Register}/>
            <ProtectedRoute path="/home" component={Home}/>
            {/* <Route path="/home" component={Home}/> */}
          </Switch>
        </div>
      </Router>
    );
  }
  
}
export default App;
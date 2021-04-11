import React from 'react';

import {
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Register from './Register';
import Home from './Home';
import './public.css';

class Public extends React.Component{
 
  render(){
      // redirect to login if not auth, else go to home
    return(
      <div className="d-flex h-100 text-center text-white bg-dark">
    
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
          <div>
            <h3 className="float-md-start mb-0">Helpline Kerala</h3>
            <nav className="nav nav-masthead justify-content-center float-md-end">
              <Link className="nav-link"  to="/">Home</Link>
              <Link className="nav-link"  to="/login">Login</Link>
              <Link className="nav-link"  to="/register">Register</Link>
            </nav>
          </div>
        </header>

        <main className="px-3">
          <Switch>
            <Route path="/" exact component={Home}/> 
            <Route path="/login" component={Login}/>
            <Route path="/forgotpassword" component={ForgotPassword}/>
            <Route path="/register" component={Register}/>
          </Switch>
        </main>

        <footer className="mt-auto text-white-50">
          <p>Cover template for <a href="https://getbootstrap.com/" className="text-white">Bootstrap</a>, by <a href="https://twitter.com/mdo" className="text-white">@mdo</a>.</p>
        </footer>
      </div>
      </div>
    );
  }
  
}
export default Public;
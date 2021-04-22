import React from 'react';
import {Switch,Route,Link} from 'react-router-dom';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Register from './Register';
import Home from './Home';
import './public.css';

class Public extends React.Component{

  componentDidMount() {
    document.getElementById('body').className='public';
  }

  componentWillUnmount() {
    document.getElementById('body').className='';
  }
 
  render(){
      // redirect to login if not auth, else go to home
    return(
      <div className="d-flex h-100 text-center text-white bg-blue">
    
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
          <div>
            <h3 className="float-md-start mb-0">Helpline Kerala</h3>
            <nav className="nav nav-masthead justify-content-center float-md-end">
              <Link className="nav-link active"  to="/public">Home</Link>
              <Link className="nav-link"  to="/public/login">Login</Link>
              <Link className="nav-link"  to="/public/register">Register</Link>
            </nav>
          </div>
        </header>

        <main className="px-3">
          <Switch>
            <Route path="/public/" exact component={Home}/> 
            <Route path="/public/login" component={Login}/>
            <Route path="/public/forgotpassword" component={ForgotPassword}/>
            <Route path="/public/register" component={Register}/>
          </Switch>
        </main>

        <footer className="mt-auto text-white-50">
          <p>Project work done at <p  className="text-white">IHRD Manjeswar</p>, by 
          {/* <a target="_blank" href="https://twitter.com/arunkbil" className="text-white">@arunjojo</a>,  */}
          <p className="text-white">@arunjojo</p>,@ravikiran.p and @prajina.k</p>
        </footer>
      </div>
      </div>
    );
  }
  
}
export default Public;
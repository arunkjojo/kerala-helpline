import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Public from './pages/public/Public';
import Private from './pages/private/Private';
import Auth from './helper/Auth';

class App extends React.Component{
  
  render(){
    // console.log("auth status", Auth.isAuth());
    return(
      
      <BrowserRouter>
        <Switch>
          <Route path="/public"> 
            <Public/>
          </Route>
          
          <Route path="/app"> 
            {Auth.isAuth() ? <Private/> : <Redirect to="/" />}
          </Route>
          

          <Route exact path="/">
          {Auth.isAuth() ? <Redirect to="/app" /> : <Redirect to="/public" />}
        </Route>
        </Switch>
      </BrowserRouter>
    );
  }
  
}
export default App;
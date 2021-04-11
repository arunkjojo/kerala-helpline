import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Home from './pages/home/Home';
import Public from './pages/public/Public';
import Auth from './helper/Auth';

class App extends React.Component{
  
  render(){
    // console.log("auth status", Auth.isAuth());
    return(
      
      <BrowserRouter>
          <Public/>
          <Switch>
            <ProtectedRoute path="/home" component={Home}/>
          </Switch>
      </BrowserRouter>
    );
  }
  
}
export default App;
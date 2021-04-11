import React from 'react';
import Posts from './Posts';
import Addpost from './Addpost';
import Logout from './Posts';
import ProtectedRoute from './ProtectedRoute';
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';

class Private extends React.Component{
  
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <header className="mb-auto">
          <div>
            <h3 className="float-md-start mb-0">Helpline Kerala</h3>
            <nav className="nav nav-masthead justify-content-center float-md-end">
              <Link className="nav-link active"  to="/home">Home</Link>
              <Link className="nav-link"  to="/logout">Logout</Link>
              <Link className="nav-link"  to="/create">Add Post</Link>
            </nav>
          </div>
        </header>
        <main className="px-3">
          <Switch>
            <ProtectedRoute path="/home" exact component={Posts}/> 
            <ProtectedRoute path="/create" component={Addpost}/>
            <ProtectedRoute path="/logout" component={Logout}/>
          </Switch>
        </main>
      </div>  
    );
  }
  
}
export default Private;
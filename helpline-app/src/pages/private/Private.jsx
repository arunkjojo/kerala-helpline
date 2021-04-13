import React from 'react';
import Posts from './Posts';
import Addpost from './Addpost';
import Logout from './Logout';
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

  componentDidMount() {
    document.getElementById('body').className='private';
  }

  componentWillUnmount() {
    document.getElementById('body').className='';
  }

  render(){
    return(
      <div>
        <header>
          <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div class="container-fluid">
              <a className="nav-link active" >Helpline Kerala</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                  <li class="nav-item">
                    <Link className="nav-link active"  to="/app/home">Home</Link>
                  </li>
                  <li class="nav-item">
                  <Link className="nav-link"  to="/app/create">Add Post</Link>
                  </li>
                  <li class="nav-item">
                    <Link className="nav-link"  to="/app/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <main className="px-3 mt-menu">
          <Switch>
            <ProtectedRoute path="/app" exact component={Posts}/> 
            <ProtectedRoute path="/app/create" component={Addpost}/>
            <ProtectedRoute path="/app/logout" component={Logout}/>
          </Switch>
        </main>
      </div>  
    );
  }
  
}
export default Private;
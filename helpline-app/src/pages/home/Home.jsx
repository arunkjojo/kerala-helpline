import React from 'react';
import Cookies from 'js-cookie';
import Posts from '../../Posts';
class Home extends React.Component{
  
  constructor(props){
    super(props);
    this.user = JSON.parse(Cookies.get('user'));
  }

  // logoutForm = ()=>{
  //   // e.preventDefault();
    
  //     Auth.logout();
    
  // }

  render(){
    return(
      <div>
        <div className="container">
          <center>Hi <b>{this.user.name}</b> [{this.user.type}], Welcome to Kerala Help Line</center>
        </div>
        <Posts />
      </div>  

      
      
    );
  }
  
}
export default Home;
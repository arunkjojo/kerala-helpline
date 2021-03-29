import React from 'react';

class Public extends React.Component{
 
  render(){
      // redirect to login if not auth, else go to home
    return(
      <div>
          Public
      </div>
    );
  }
  
}
export default Public;
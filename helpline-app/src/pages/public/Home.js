import React,{Component} from 'react';

class Home extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
        <>
        <div class="container py-5" id="hanging-icons">
            <h1>Helpline Kerala - An attempt to help the needy</h1>
            <p className="lead">Every one have a compassionate heart, Helpline Kerala tries to find a solution with the help of technology to create a platform which connects the needy, their needs, campaigns for a cause to like minded people who are near to them. We expect people like you can create more impact than technology.</p>
            <p className="lead">
            <a href="/app/home" className="btn btn-lg btn-secondary fw-bold border-white bg-white">So, Join with us</a>
            </p>
        </div>

        <div class="container py-5" id="hanging-icons">
            <h2 class="pb-2 border-bottom">Behind this project</h2>
            <div class="row g-5 py-5">
                <div class="col-md-6 align-items-start">
                        <h2>Technology Stack</h2>
                        <p>This project is developed with latest enterprise technologies and system design in mind. We have developed the front end of this application in React.JS, We have APIs developed in PHP and store data in MySQL. Mobile centric design achieved using twitter bootstrap libraries.</p>
                </div>
                
                <div class="col-md-6 align-items-start">
                    <h2>About Team</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                </div>
            </div>
        </div>
        </>
    );
  }
  
}
export default Home;
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
            <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
            <p className="lead">
            <a href="/home" className="btn btn-lg btn-secondary fw-bold border-white bg-white">View posts..</a>
            </p>
        </div>

        <div class="container py-5" id="hanging-icons">
            <h2 class="pb-2 border-bottom">Behind this project</h2>
            <div class="row g-5 py-5">
                <div class="col-md-6 align-items-start">
                        <h2>Technology Stack</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
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
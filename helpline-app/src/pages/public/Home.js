import React,{Component} from 'react';

class Home extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
        <>
        <div class="container py-5" id="hanging-icons">
            <h1>Cover your page.</h1>
            <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
            <p className="lead">
            <a href="#" className="btn btn-lg btn-secondary fw-bold border-white bg-white">Learn more</a>
            </p>
        </div>

        <div class="container py-5" id="hanging-icons">
            <h2 class="pb-2 border-bottom">Hanging icons</h2>
            <div class="row g-5 py-5">
                <div class="col-md-6 d-flex align-items-start">
                <div class="icon-square bg-light text-dark flex-shrink-0 me-3">
                    <svg class="bi" width="1em" height="1em"></svg>
                </div>
                <div>
                    <h2>Featured title</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <a href="#" class="btn btn-primary">
                    Primary button
                    </a>
                </div>
                </div>
                
                <div class="col-md-6 d-flex align-items-start">
                <div class="icon-square bg-light text-dark flex-shrink-0 me-3">
                    <svg class="bi" width="1em" height="1em"></svg>
                </div>
                <div>
                    <h2>Featured title</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                    <a href="#" class="btn btn-primary">
                    Primary button
                    </a>
                </div>
                </div>
            </div>
        </div>
        </>
    );
  }
  
}
export default Home;
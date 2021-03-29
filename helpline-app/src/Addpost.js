import React from 'react';
class Addpost extends React.Component{
 
  render(){
    const style={
        maxwidth:'100%',
        maxHeight:'auto'
    }
    return(
        <div className="container">
            <form style={style} className="form-group">
                <div className="form-group">
                    <textarea cols="110" className="form-control" placeholder="Type your message" autoFocus onChange={this.inputSet} id="message" name="message"></textarea>
                    {/* <input type="text"  placeholder="Type your message" id="message" name="message"/> */}
                </div>
                <div className="form-group">
                    <button className="btn btn-info" id="assets" name="image">Images</button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <button className="btn btn-info" id="assets" name="video">Videos</button>
                </div>
                <div className="form-group">
                    <button className="form-control btn btn-success">Post</button>
                </div>
            </form>
        </div>
    );
  }
  
}
export default Addpost;
import {Component} from 'react';
import Auth from './helper/Auth';
class Logout extends Component{
  constructor(props){
    super(props);
    Auth.logout();
    this.props.history.push('/home');
  }
  render() {
    return null;
  }
}
export default Logout;
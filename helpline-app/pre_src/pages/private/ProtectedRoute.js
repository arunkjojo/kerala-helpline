import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import Auth from '../../helper/Auth';

function ProtectedRoute({ component: Component, ...rest }){

    return <Route 
        {...rest}
        render={
            (props)=>{
                if(Auth.isAuth()){
                    return <Component />
                }else{
                    return <Redirect to={{pathname:'/login',state:{form:props.location}}} />
                }
            }
        }
    />
}
export default ProtectedRoute;
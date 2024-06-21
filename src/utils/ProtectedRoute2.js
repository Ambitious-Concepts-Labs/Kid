import React, { useContext } from 'react';
// import { AuthContext }from './firebaseAuthContext';
import { Route, useNavigate } from 'react-router-dom';
import * as Screens from  "./screens/all";

export default function ProtectedRoute(props){
   
    // const authValue=useContext(AuthContext)
    const navigate = useNavigate()

    // if (user){
        return(
        <Route exact path={props.path}>
            {props.children}
        </Route>)
    // } else{
    //     return <Route path="/" element={<Screens.HomeScreen />} />
    // }
}
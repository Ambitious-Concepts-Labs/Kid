// import React, { useContext } from 'react';
// import { AuthContext }from './firebaseAuthContext';
// import { Route, useNavigate } from 'react-router-dom';
// import * as Screens from "./screens/all";

// export default function ProtectedRoute(props){
   
//     const authValue=useContext(AuthContext)
//     const navigate = useNavigate()

//     if (authValue.userDataPresent){
//         if(authValue.user==null){
//             return(<Route path={props.redirectTo} element={<Screens.LoginScreen />} />)
//         }
//         else{
//             return(
            
//             <Route exact path={props.path}>
//                 {/* {props.children} */}
//             </Route>)
//         }
//     }
//     else{
        
//         return <Route path="/" element={<Screens.HomeScreen />} />
//     }
// }
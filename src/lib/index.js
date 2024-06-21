import React, { createContext, useState, useEffect } from 'react';
import { app, auth } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";

export const AuthContext = createContext({ userPresent:false, user:null })

export default function FirebaseAuthContext(props){
    console.log({props})
   	const [user, loading, error] = useAuthState(auth);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [checkUser, setCheckUser] = useState(false);

    useEffect(() => {
        // const currentuser = app.auth().currentUser;
        // console.log(currentuser, user)
        // if (currentuser) {
        // // User is signed in.
        // } else {
        // // No user is signed in.
        // }
		// if (!checkUser) {
			
		// 	Axios.get("/user/checkuser")
		// 		.then((res) => {
		// 			if (res.data.msg === "You are logged in") {
		// 				setIsLoggedin(true);
		// 				setCurrentUser(res.data.user);
		// 			} else {
		// 				setIsLoggedin(false);
		// 			}
		// 			setCheckUser(true);
		// 		})
		// 		.catch((err) => {
		// 			console.log(err);
		// 		});
		// }
	}, [checkUser]);

    let [state, changeState] = useState({
        userDataPresent: false,
        user: user,
        userInfo: null,
        auth: auth,
        listener: null,
        isLoggedin: false,
        currentuser: null
    })

    console.log(user)
    console.log(auth)
    useEffect(()=>{
        changeState(oldState => ({
            ...oldState,
            // currentuser: app.auth().currentUser
        }))
        if(state.listener==null){
            // changeState({...state,listener:auth.onAuthStateChanged((user)=>{
            // if(userInfo)
            //     changeState(oldState=>({...oldState,userDataPresent:true,user:user,auth:auth,userInfo:userInfo}));
            //     else
            //     changeState(oldState=>({...oldState,userDataPresent:true,userInfo:null}));
            // })});
        }

        return ()=>{
        if(state.listener)
            state.listener()
        }
    },[])
  
    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}
import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router';


const Login = () => {
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig):firebase.app() ;
    const [loggedInUser, setLoggedInUser] =useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    const handleGoogleSignIn =()=>{
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then((result) => { 
         const {displayName, email} = result.user;
         const signedInUser ={name:displayName, email}
         setLoggedInUser(signedInUser);
         //doing force redirect(jwt token)
        //  storeAuthToken();
         //end redirection
         history.replace(from);
         console.log(signedInUser);
    // ...
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    // ...
  });
    }

    // const storeAuthToken =()=>{
    //   firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    //   .then(function(idToken) {
    //     // Send token to your backend via HTTPS
    //     sessionStorage.setItem('token', idToken)
        
    //   }).catch(function(error) {
    //     // Handle error
    //   });

    // }


    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Continue With Google</button>

        </div>
    );
};

export default Login;
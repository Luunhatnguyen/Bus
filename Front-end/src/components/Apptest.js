import { Button } from "react-bootstrap";
import FirebaseInit from "../firebase/firebase-init";
import {
   getAuth,
   signInWithPopup,
   GoogleAuthProvider,
   signOut,
} from "firebase/auth";
import React from "react";


function Apptest() {
   const responseFacebook = (response) => {
      console.log(response);
      console.log(response.accessToken);
   };

   FirebaseInit();
   const provider = new GoogleAuthProvider();
   const handleGoogleSignedIn = () => {
      const auth = getAuth();
      signInWithPopup(auth, provider).then((result) => {
         console.log({ auth_token: result._tokenResponse.oauthIdToken });
         console.log({ username: result._tokenResponse.fullName });
         console.log({ avatar: result._tokenResponse.photoUrl });
      });
   };

   const logout = () => {
      const auth = getAuth();
      signOut(auth)
         .then(() => {
            console.log("done");
         })
         .catch(() => {
            console.log("err");
         });
   };
   const ratingChanged = (newRating) => {
      console.log(newRating);
   };
   return (
      <div className="App">

         <button onClick={handleGoogleSignedIn}>Đăng nhập với Google</button>
         <button onClick={logout}>dang xuat</button>

      </div>
   );
}

export default Apptest;

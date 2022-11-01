import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase-config";
import React from "react";

function FirebaseInit() {
   initializeApp(firebaseConfig);
}

export default FirebaseInit;

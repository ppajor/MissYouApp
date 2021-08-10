import React, { useEffect } from 'react'
import {Text} from "react-native";

import firebase from "firebase";

export default function Loading(props) {

    useEffect(()=>{
        console.log("STERTER");

        firebase.auth().onAuthStateChanged(user=>{
            if (user){
                console.log("JEST USER");
                props.history.push("/HomeScreen");
            }
            else{
                console.log("Nie ma useera");
                props.history.push("/StarterScreen");
            }
            
        })
    },[])

    return (
        <Text>LOADING...</Text>
    )
}



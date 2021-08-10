import React, { useEffect } from 'react'
import {View,Text,Image,StyleSheet} from "react-native";

import firebase from "firebase";
import Screen from "./Screen";
import global from "./style";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { TouchableHighlight } from 'react-native-gesture-handler';



export default function Loading(props) {
    let [fontsLoaded] = useFonts({
        'GreatVibes-Regular': require('./assets/fonts/GreatVibes-Regular.ttf'),
      });
      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
    return (
        <View style={styles.container}>
        <Image source={require("./assets/logoL.png")} />
        <Text style={[styles.logoText,{fontFamily:"GreatVibes-Regular"}]}>MissYouApp</Text>
        <TouchableHighlight onPress={()=>props.history.push("/SetName")}>
            <Image source={require("./assets/arrowRight.png")} />
        </TouchableHighlight>
        </View>
    )
      }
}


const styles = StyleSheet.create({
    container:{
        display:"flex",
        height:"100%",
        paddingTop:"30%",
        alignItems:"center",
        backgroundColor:global.primaryColor,
    },
    logoText:{
        color:global.secondaryColor,
        fontSize:48,
        marginBottom:"35%",
    },
})
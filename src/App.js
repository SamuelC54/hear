/* eslint-disable no-undef */
/*global google*/

import _ from 'lodash'
import React, { useEffect, useState, useRef } from "react";
import renderIf from "render-if";
import styled, { css } from "styled-components";
import firebase from "firebase";
import { Route, Switch } from "react-router-dom";
import useReactRouter from "use-react-router";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  OverlayView
} from "react-google-maps";
import { Column, Table } from "react-virtualized";
import ReactPlayer from "react-player";
import Template from "./components/template";
import NavBar from "./components/NavBar/NavBar";
import song from "./assets/song1.mp3";


// google account: oglavichackathons@gmail.com
// pass: y9de%ua03CbKPlehnkrnH4!rhrqo@tY%k4

firebase.initializeApp({
  apiKey: "AIzaSyBcrLPp_JLrY47-luw6dJiNiFLrCrDU4Pg",
  authDomain: "bdc-hackathon.firebaseapp.com",
  databaseURL: "https://bdc-hackathon.firebaseio.com",
  projectId: "bdc-hackathon",
  storageBucket: "bdc-hackathon.appspot.com",
  messagingSenderId: "955736340124"
});


const firestore = firebase.firestore();

const StyledDiv = styled.div``;

const RowDiv = styled.div`
  width: 1000px;
  display: flex;
  padding: 0px 20px;
  outline: 1px solid #666;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const MusicDiv = styled.div`
  position:absolute;
  display:flex;
  width:100%;
  height:10%;
  background-color:#000;
  top:90%;
`;
const SuperDiv = styled.div`
  /* height: 1000px; */
  position:absolute;
  top: 10%;
  display:flex;
  color:#000;
  font-size:14px;
`;
const PlayButton = styled.button`
  height:50px;
  width:50px;
`;

export default function App() {
  
  const player = useRef(null); 
  const [playing, setPlaying] = useState(true);
  const [loop,setLoop] = useState(false);
  const [duration, setDuration] = useState(0);
  const playPauseMusic = () =>{
    setPlaying(!playing);
  };
  // const onPlay = () => {
  //   console.log('onPlay');
  //    setPlaying(true);
  // }
  // const onPause = () =>{
  //   console.log('Onpause');
  //   setPlaying(false);
  // }
  // const onEnded = () =>{
  //   setLoop(false);
  // }
  const onDuration = (duration) =>{

    console.log('onDuration', duration)
    setDuration(duration);
  };
  // const onProgress = state => {
  //     console.log('onProgress', state)
  //     // if (!this.state.seeking) {
  //     //   this.setState(state)
  //     // }
  //   }
  useEffect(()=>{
    console.log(player)
  })
  return (
    <>
      <NavBar>
      
      
      </NavBar>
        {/* <SuperDiv>{ (( player.current && player.current.getCurrentTime()===null)? "1": player.current.getCurrentTime())}</SuperDiv> */}
      <MusicDiv>
        <PlayButton onClick={playPauseMusic}/>
      <ReactPlayer
              ref={player}
              width='0%'
              height='0%'
              url={song}
              playing={playing}
              duration={onDuration}
            />
      </MusicDiv>
    </>
  );
}

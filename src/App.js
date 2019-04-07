/* eslint-disable no-undef */
/*global google*/

import _ from "lodash";
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
import MusicBar from "./components/MusicBar/MusicBar";
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


export default function App() {

  return (
    <>
      <NavBar />
      {/* <SuperDiv>{ (( player.current && player.current.getCurrentTime()===null)? "1": player.current.getCurrentTime())}</SuperDiv> */}
     <MusicBar/>
    </>
  );
}


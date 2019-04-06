/* eslint-disable no-undef */
/*global google*/

import _ from 'lodash'
import React, { useEffect, useState } from "react";
import renderIf from "render-if";
import styled, { css } from "styled-components";
// import _ from "lodash";
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

// import { Styles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
// import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import ListSubheader from "@material-ui/core/ListSubheader";
// import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
// import SearchIcon from "@material-ui/icons/Search";
// import MoreIcon from "@material-ui/icons/MoreVert";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import FuzzyCars from './components/FuzzyCars'
import AppContext from './Context.js'
import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Template from "./components/template";
// import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

import MagnifyIcon from "mdi-react/MagnifyIcon";

import carPlaceholder from "./assets/carPlaceholder.png";
import accept from "./assets/accept.png";
import accepted from "./assets/accepted.png";
import decline from "./assets/decline.png";
import selects from "./assets/selects.png";
import car1 from "./assets/car1.png";
import car2 from "./assets/car2.png";

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
const NameDiv = styled.div`
  width: 200px;
  padding-right: 400px;
  padding-left: 10px;
`;
const PriceDiv = styled.div`
  width: 140px;
  padding: 10px 40px;
  outline: 1px solid #666;
  margin-right: 240px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;
const ComissionDiv = styled.div`
  width: 200px;
`;
const HeaderDiv = styled.div`
  width: 200px;
  padding: 4px 300px 10px 10px;

  white-space: nowrap;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
`;
const NameHeaderDiv = styled.div`
  width: 200px;
  padding: 4px 400px 10px 70px;

  white-space: nowrap;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;

  white-space: nowrap;
`;

const Title = styled.div`
  color: #
`;

export default function App() {
  return (
    <>
      <Title>Title</Title>
    </>
  );
}

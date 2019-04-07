/* eslint-disable no-undef */
/*global google*/

import _ from "lodash";
import React, { useEffect, useState} from "react";
import firebase from "firebase";

import NavBar from "./components/NavBar/NavBar";
import MusicBar from "./components/MusicBar/MusicBar";
import Content from "./components/Content/Content";
// google account: oglavichackathons@gmail.com
// pass: y9de%ua03CbKPlehnkrnH4!rhrqo@tY%k4

firebase.initializeApp({
  apiKey: "AIzaSyAvkLDjAaxFKIpZyR1Jv6VD7loYDyb-0_k",
  authDomain: "poddie-37316.firebaseapp.com",
  databaseURL: "https://poddie-37316.firebaseio.com",
  projectId: "poddie-37316",
  storageBucket: "poddie-37316.appspot.com",
  messagingSenderId: "420732162852"
});

const database = firebase.database();

export default function App() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    var starCountRef = database.ref("database");
    starCountRef.on("value", function(snapshot) {
      setData(snapshot.val());
    });
  }, []);

  console.log(data);

  return (
    <>
      <NavBar />
      <Content />
      <MusicBar />
    </>
  );
}

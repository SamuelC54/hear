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
import song from "./assets/song1.mp3";
import PlayCircleOutlineIcon from "mdi-react/PlayCircleOutlineIcon";
import PauseCircleOutlineIcon from "mdi-react/PauseCircleOutlineIcon";
import SkipNextIcon from "mdi-react/SkipNextIcon";
import SkipPreviousIcon from "mdi-react/SkipPreviousIcon";
import albumMusic from "./assets/albumMusic.png";
import VolumeHighIcon from "mdi-react/VolumeHighIcon";

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
  position: absolute;
  display: flex;
  width: 100%;
  height: 10%;
  background-color: #000;
  top: 90%;
  justify-content: space-around;
`;
const SongImageDescription = styled.div`
  display: flex;
  width: calc(100%/3);
`;
const PlayButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const ControlSection = styled.div`
  width: calc(100%/3);
  /* margin-left: 400px; */
  margin-top: 20px;
  display: grid;
  grid-template-rows: 50% 50%;
  align-items: center;
  justify-items: center;
`;
const DurationSection = styled.div`
  display:grid;
  grid-template-columns:50px 250px 50px;

`;
const ButtonSection = styled.div`
  display:grid;
  grid-template-columns:50px 50px 50px;
  align-items: center;
    justify-items: center;
`;
const SongImage = styled.img`
  width: 56px;
  height: 56px;
  margin: 18px;
`;
const SongLabel = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: normal;

  color: #ffffff;
`;
const SongDescription = styled.div`
  margin-top: 26px;
  display: flex;
  flex-direction: column;
`;
const SongMiniText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: normal;

  color: #ffffff;
`;

const VolumeInput = styled.input`
  -webkit-appearance: none;
  width: 54px;
  height: 8px;
  background: #ffffff;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  /* margin-top:50px; */
  color: #fff;
  &&::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 2px;
    height: 10px;
    background: #4caf50;
    cursor: pointer;
  }
  && ::-moz-range-thumb {
    width: 2px;
    height: 10px;
    background: #4caf50;
    cursor: pointer;
  }
  && ::-moz-range-track {
    background-color: #fff;
  }
`;
const VolumeSection = styled.div`
  display: flex;
  align-items: center;
  width: calc(100%/3);
  justify-content:flex-end;
  padding-right:20px;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  width: 250px;
  height: 8px;
  background: #ffffff;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  margin: 0px 10px;
  color: #fff;
  &&::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 2px;
    height: 10px;
    background: #4caf50;
    cursor: pointer;
  }
  && ::-moz-range-thumb {
    width: 2px;
    height: 10px;
    background: #4caf50;
    cursor: pointer;
  }
  && ::-moz-range-track {
    background-color: #fff;
  }
`;
export default function App() {
  const player = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [seek, setSeek] = useState(false);
  const [duration, setDuration] = useState(null);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const playPauseMusic = () => {
    setPlaying(!playing);
  };
  const onDuration = duration => {
    console.log("onDuration", duration);
    setDuration(duration);
  };
  useEffect(() => {
    console.log(duration);
    console.log(played);
  });
  const setVolumePlayer = e => {
    setVolume(parseFloat(e.target.value));
  };
  const onProgess = state => {
    console.log(state);
    if (!seek) {
      setPlayed(state.played);
    }
  };
  const onSeekMouseDown = e => {
    setSeek(true);
  };
  const onSeekChange = e => {
    setPlayed(parseFloat(e.target.value));
  };
  const onSeekMouseUp = e => {
    setSeek(false);
    player.current.seekTo(parseFloat(e.target.value));
  };
  return (
    <>
      <NavBar />
      {/* <SuperDiv>{ (( player.current && player.current.getCurrentTime()===null)? "1": player.current.getCurrentTime())}</SuperDiv> */}
      <MusicDiv>
        <ReactPlayer
          ref={player}
          width="0%"
          height="0%"
          url={song}
          playing={playing}
          onDuration={onDuration}
          volume={volume}
          onProgress={onProgess}
        />
        <SongImageDescription>
          <SongImage src={albumMusic} />
          <SongDescription>
            <SongLabel>Aero cloud</SongLabel>
            <SongMiniText>Surface</SongMiniText>
          </SongDescription>
        </SongImageDescription>
        <ControlSection>
          <ButtonSection>
            <SkipPreviousIcon color="#fff" size={"24px"} />
            <PlayButton onClick={playPauseMusic}>
              {renderIf(!playing)(
                <PlayCircleOutlineIcon color="#fff" size={"24px"} />
              )}
              {renderIf(playing)(
                <PauseCircleOutlineIcon color="#fff" size={"24px"} />
              )}
            </PlayButton>
            <SkipNextIcon color="#fff" size="24px" />
          </ButtonSection>
                <DurationSection>
          <Duration time={duration * played} />
          <Slider
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onMouseDown={onSeekMouseDown}
            onChange={onSeekChange}
            onMouseUp={onSeekMouseUp}
          />
          <Duration time={duration} />
          </DurationSection>
        </ControlSection>

        <VolumeSection>
          <VolumeHighIcon color="#fff" size="18px" />
          <VolumeInput
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={setVolumePlayer}
          />
        </VolumeSection>
      </MusicDiv>
    </>
  );
}

function Duration(props) {
  const { time } = props;
  const format = seconds => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }
    return `${mm}:${ss}`;
  };
  const pad = string => {
    return ("0" + string).slice(-2);
  };

  return (
    <TimeCurrentLabel dateTime={`P${Math.round(time)}S`}>
      {format(time)}
    </TimeCurrentLabel>
  );
}
const TimeCurrentLabel = styled.time`
  && {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: normal;
    text-align: center;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

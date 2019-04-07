import React, { useEffect, useState, useRef } from "react";
import renderIf from "render-if";
import styled, { css } from "styled-components";
import ReactPlayer from "react-player";

import song from "../../assets/testaudio.mp3";
import PlayCircleOutlineIcon from "mdi-react/PlayCircleOutlineIcon";
import PauseCircleOutlineIcon from "mdi-react/PauseCircleOutlineIcon";
import SkipNextIcon from "mdi-react/SkipNextIcon";
import SkipPreviousIcon from "mdi-react/SkipPreviousIcon";
import albumMusic from "../../assets/podcastCover.png";
import VolumeHighIcon from "mdi-react/VolumeHighIcon";

const MusicDiv = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 10%;
  background-color: #000;
  top: 90%;
  justify-content: space-around;
  z-index: 20;
`;
const SongImageDescription = styled.div`
  display: flex;
  width: calc(100% / 3);
`;
const PlayButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const ControlSection = styled.div`
  width: calc(100% / 3);
  /* margin-left: 400px; */
  margin-top: 20px;
  display: grid;
  grid-template-rows: 50% 50%;
  align-items: center;
  justify-items: center;
`;
const DurationSection = styled.div`
  display: grid;
  grid-template-columns: 50px 250px 50px;
`;
const ButtonSection = styled.div`
  display: grid;
  grid-template-columns: 50px 50px 50px;
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
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  width: auto;
  text-overflow: wrap;
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
  margin: 10px 0;
  width: 60px;

  &&:focus {
    outline: none;
  }
  &&::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #ffffff;
    background: #ffffff;
    border-radius: 5px;
    border: 1px solid #fffefe;
  }
  &&::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 5px solid #fff4f4;
    height: 17px;
    width: 10px;
    border-radius: 5px;
    background: #000000;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -8.5px;
  }
  &&:focus::-webkit-slider-runnable-track {
    background: #ffffff;
  }
  &&::-moz-range-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #ffffff;
    background: #ffffff;
    border-radius: 5px;
    border: 1px solid #fffefe;
  }
  &&::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 5px solid #fff4f4;
    height: 17px;
    width: 10px;
    border-radius: 5px;
    background: #000000;
    cursor: pointer;
  }
  &&::-ms-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &&::-ms-fill-lower {
    background: #ffffff;
    border: 1px solid #fffefe;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #ffffff;
  }
  &&::-ms-fill-upper {
    background: #ffffff;
    border: 1px solid #fffefe;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #ffffff;
  }
  &&::-ms-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 5px solid #fff4f4;
    height: 17px;
    width: 10px;
    border-radius: 5px;
    background: #000000;
    cursor: pointer;
  }
  &&:focus::-ms-fill-lower {
    background: #ffffff;
  }
  &&:focus::-ms-fill-upper {
    background: #ffffff;
  }
`;
const VolumeSection = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% / 3);
  justify-content: flex-end;
  padding-right: 60px;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  margin: 10px 0;
  width: 250px;

  &&:focus {
    outline: none;
  }
  &&::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #ffffff;
    background: #ffffff;
    border-radius: 5px;
    border: 1px solid #fffefe;
  }
  &&::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 5px solid #fff4f4;
    height: 17px;
    width: 10px;
    border-radius: 5px;
    background: #000000;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -8.5px;
  }
  &&:focus::-webkit-slider-runnable-track {
    background: #ffffff;
  }
  &&::-moz-range-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #ffffff;
    background: #ffffff;
    border-radius: 5px;
    border: 1px solid #fffefe;
  }
  &&::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 5px solid #fff4f4;
    height: 17px;
    width: 10px;
    border-radius: 5px;
    background: #000000;
    cursor: pointer;
  }
  &&::-ms-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &&::-ms-fill-lower {
    background: #ffffff;
    border: 1px solid #fffefe;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #ffffff;
  }
  &&::-ms-fill-upper {
    background: #ffffff;
    border: 1px solid #fffefe;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #ffffff;
  }
  &&::-ms-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 5px solid #fff4f4;
    height: 17px;
    width: 10px;
    border-radius: 5px;
    background: #000000;
    cursor: pointer;
  }
  &&:focus::-ms-fill-lower {
    background: #ffffff;
  }
  &&:focus::-ms-fill-upper {
    background: #ffffff;
  }
`;
export default function MusicBar() {
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
    // console.log("onDuration", duration);
    setDuration(duration);
  };
  const setVolumePlayer = e => {
    setVolume(parseFloat(e.target.value));
  };
  const onProgess = state => {
    // console.log(state);
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
            <SongLabel>99% Invisible</SongLabel>
            <SongMiniText>62: Being True to Oneself</SongMiniText>
          </SongDescription>
        </SongImageDescription>
        <ControlSection>
          <ButtonSection>
            <SkipPreviousIcon
              color="#fff"
              size={"24px"}
              style={{ cursor: "pointer" }}
            />
            <PlayButton onClick={playPauseMusic}>
              {renderIf(!playing)(
                <PlayCircleOutlineIcon color="#fff" size={"24px"} />
              )}
              {renderIf(playing)(
                <PauseCircleOutlineIcon color="#fff" size={"24px"} />
              )}
            </PlayButton>
            <SkipNextIcon
              color="#fff"
              size="24px"
              style={{ cursor: "pointer" }}
            />
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

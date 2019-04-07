import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { 
  BodyWrapper,
  LeftPanel,
  RightPanelWrapper,
  RightPanel,
  
  Header,
  HeaderOpaque,
  EpisodeInfo,
  EpCover,
  EpText,
  Title,
  Author,
  
  TranscriptText
} from './content_cmpnts';
import './content.css';

import testtranscript from '../../assets/testtranscript.json';

import Truck from '../../assets/test.png';

export default function Content() {
  // const [scrollPos, setScrollPos] = useState(window.pageYOffset)

  // useEffect(() => {
  //   window.addEventListener('scroll', this.listenToScroll);

  //   const height =
  //   document.documentElement.scrollHeight -
  //   document.documentElement.clientHeight;

  //   const scrolled = winScroll / height

  //   setScrollPos()  
  // }, [])
  
  return (
    <>
      <BodyWrapper>
        <LeftPanel>
          <Card>
            <CardActionArea className="card_actionarea">
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={Truck}
                title="Contemplative Reptile"
                className="cardmedia"
              />
              <CardContent>
                <Typography component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </LeftPanel>

        <RightPanelWrapper>
          <Header>
            <HeaderOpaque>
              <EpisodeInfo>
                <EpCover />
                <EpText>
                  <Title>Title</Title>
                  <Author>Author</Author>
                </EpText>
              </EpisodeInfo>
            </HeaderOpaque>
          </Header>
          <RightPanel>
            <TranscriptText>{testtranscript["transcript"]}</TranscriptText>
          </RightPanel>
        </RightPanelWrapper>
      </BodyWrapper>
    </>
  );
  }
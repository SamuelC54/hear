import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import _ from 'lodash';
import renderIf from 'render-if';

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
  
  ParagraphWrapper,
  TranscriptText,
  Category,
  CategoryButton
} from './content_cmpnts';
import './content.css';

import testtranscript from '../../assets/testtranscript.json';

import Truck from '../../assets/test.png';

export default function Content(props) {

  const leng = Array(props.numParagraphs);

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
            {props.categories.map((item, i) => {
              return (
                <ParagraphWrapper key={i}>
                  <TranscriptText>{item.content.split(" ").map((word, i) => {
                    return <span key={i}><a href={props.entities[word]} target="_blank">{word}</a> </span>
                  })}</TranscriptText>
                  {renderIf(_.get(item, "categories[0].name"))(() => (
                    <Category>
                      <CategoryButton>{(item.categories[0].name).split("/")[1]}</CategoryButton>
                    </Category>
                  ))} 
                </ParagraphWrapper>
              )})}
          </RightPanel>
        </RightPanelWrapper>
      </BodyWrapper>
    </>
  );
  }
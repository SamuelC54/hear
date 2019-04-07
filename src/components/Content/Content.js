import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled, { css } from "styled-components";

import _ from "lodash";
import renderIf from "render-if";

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
} from "./content_cmpnts";
import "./content.css";

import testtranscript from "../../assets/testtranscript.json";

import Truck from "../../assets/test.png";

export default function Content(props) {
  const leng = Array(props.numParagraphs);

  return (
    <>
      <BodyWrapper>
        <LeftPanel>
          {_.map(props.entities, (entity, i) => (
            <StyledCard key={i}>
              <CardActionArea className="card_actionarea">
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={entity.picture}
                  title="Contemplative Reptile"
                  className="cardmedia"
                />
                <CardContent>
                  <Typography component="p">{entity.summary}</Typography>
                </CardContent>
              </CardActionArea>
            </StyledCard>
          ))}
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
                  <TranscriptText>
                    {item.content.split(" ").map((word, i) => {
                      return (
                        <span key={i}>
                          <a
                            href={
                              props.entities[word] &&
                              props.entities[word].wikipedia_url
                            }
                            target="_blank"
                          >
                            {word}
                          </a>{" "}
                        </span>
                      );
                    })}
                  </TranscriptText>
                  {renderIf(_.get(item, "categories[0].name"))(() => (
                    <Category>
                      <CategoryButton>
                        {item.categories[0].name.split("/")[1]}
                      </CategoryButton>
                    </Category>
                  ))}
                </ParagraphWrapper>
              );
            })}
          </RightPanel>
        </RightPanelWrapper>
      </BodyWrapper>
      <VerticalLine />
    </>
  );
}

const StyledCard = styled(Card)`
  && {
    margin: 16px 0;
  }
`;

const VerticalLine = styled.div`
  position: fixed;
  right: 115px;
  top: 0px;
  bottom: 0px;
  width: 2px;

  background: #f0f0f0;
`;

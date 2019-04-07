import styled from "styled-components";

const BodyWrapper = styled.div`
  display: flex;
  background: lightpink;
  padding-top: 80px;
  height: 100vh;
  width: 100vw;
  flex-direction: row;
`;

const LeftPanel = styled.div`
  background: #e8e8e8;
  width: 35%;
  border-right: 2.5px solid #8e8e8e;
  padding: 0 85px;
  padding-top: 60px;
`;

const RightPanel = styled.div`
  background: #FFFFFF;
  width: 65%;
  padding: 0 30px;
  padding-top: 60px;
`;

const TranscriptHeader = styled.div`
  font-size: 80px;
`;

const TranscriptText = styled.div`
  font-size: 18px;
`;

export {
  BodyWrapper,
  LeftPanel,
  RightPanel,
  TranscriptHeader,
  TranscriptText
}
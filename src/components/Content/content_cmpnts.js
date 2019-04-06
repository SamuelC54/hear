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
`;

const RightPanel = styled.div`
  background: #FFFFFF;
  width: 65%;
`;
export {
  BodyWrapper,
  LeftPanel,
  RightPanel
}
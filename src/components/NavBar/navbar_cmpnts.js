import styled from "styled-components";

const NavBarBGDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 80px;
  left: 0px;
  top: 0px;
  background: linear-gradient(270deg, #5E12E0 0%, #7D27E1 100%);

  display: flex;
  flex-direction: row;
  
  padding: 15px 100px;
`;

const LeftNavBar = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  justify-content: space-between;
`;

const LogoDiv = styled.div`

  font-family: 'Roboto';
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: normal;
  letter-spacing: 0.06em;

  color: #FFFFFF;

  display: flex;
  margin: auto 20px auto 0;

`;

const NavBarTxt = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: normal;

  color: #FFFFFF;
  margin: auto 30px;
  background: rgba(255,255,255, 0.15);

  height: auto;
  width: auto;
  padding: 5px 20px;
  border-radius: 30px;
`;

const YourPodcastsNavBarTxt = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: normal;

  color: #FFFFFF;
  margin: auto 30px;
  background: rgba(255,255,255, 0.2);

  height: auto;
  width: auto;
  padding: 5px 20px;
  border-radius: 30px;
`;

const AccountName = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: normal;

  color: #FFFFFF;
  margin: auto 10px;
`;

const AccountWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 0;
  width: auto;
  height: auto;
`;

const AccountLogo = styled.div`
  width: auto;
  height: auto;
  margin: auto auto;
`;

const DropDown = styled.div`
  width: auto;
  height: auto;
  margin: auto auto;
`;

export {
  NavBarBGDiv,
  LeftNavBar,
  LogoDiv,
  
  YourPodcastsNavBarTxt,
  NavBarTxt,
  
  AccountWrapper,
  AccountLogo,
  AccountName,
  DropDown

  
}
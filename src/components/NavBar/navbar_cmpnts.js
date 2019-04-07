import styled from "styled-components";

const NavBarBGDiv = styled.div`
  position: fixed;
  z-index: 20;
  width: 100%;
  height: 80px;
  background: linear-gradient(270deg, #5e12e0 0%, #7d27e1 100%);

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

const LogoDiv = styled.img`
  font-family: "Roboto";
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: normal;
  letter-spacing: 0.06em;
  height: 44px;

  color: #ffffff;

  display: flex;
  margin: auto 20px auto 0;
  cursor: pointer;
`;

const NavBarTxt = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: normal;

  color: #ffffff;
  margin: auto 30px;
  background: rgba(255, 255, 255, 0.05);

  height: auto;
  width: auto;
  padding: 5px 20px;
  border-radius: 30px;
  cursor: pointer;
`;

const YourPodcastsNavBarTxt = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: normal;

  color: #ffffff;
  margin: auto 30px;
  background: rgba(255, 255, 255, 0.2);

  height: auto;
  width: auto;
  padding: 5px 20px;
  border-radius: 30px;
  cursor: pointer;
`;

const AccountName = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: normal;

  color: #ffffff;
  margin: auto 10px;
  cursor: pointer;
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
  cursor: pointer;
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
};

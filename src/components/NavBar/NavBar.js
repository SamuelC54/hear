import React from "react";
import {
  NavBarBGDiv,
  LeftNavBar,
  LogoDiv,
  YourPodcastsNavBarTxt,
  NavBarTxt,
  AccountWrapper,
  AccountLogo,
  AccountName,
  DropDown
} from "./navbar_cmpnts";

import UserLogo from "../../assets/userlogo.png";
import Dropdown from "../../assets/dropdown.png";
import HearLogo from "../../assets/hear_logo.png";

export default function NavBar() {
  return (
    <>
      <NavBarBGDiv>
        <LeftNavBar>
          <LogoDiv src={HearLogo} />
          <YourPodcastsNavBarTxt>Your Podcasts</YourPodcastsNavBarTxt>
          <NavBarTxt>Latest</NavBarTxt>
          <NavBarTxt>Trending</NavBarTxt>
        </LeftNavBar>

        <AccountWrapper>
          <AccountLogo>
            <img
              src={UserLogo}
              alt="userlogo"
              style={{ height: "25px", width: "25px" }}
            />
          </AccountLogo>
          <AccountName>Your Account</AccountName>
          <DropDown>
            <img
              src={Dropdown}
              alt="dropdown"
              style={{ height: "15px", width: "15px" }}
            />
          </DropDown>
        </AccountWrapper>
      </NavBarBGDiv>
    </>
  );
}

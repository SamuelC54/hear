/* eslint-disable no-undef */
/*global google*/

import _ from 'lodash'
import React, { useEffect, useState } from "react";
import renderIf from "render-if";
import styled, { css } from "styled-components";
// import _ from "lodash";
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

// import { Styles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
// import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import ListSubheader from "@material-ui/core/ListSubheader";
// import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
// import SearchIcon from "@material-ui/icons/Search";
// import MoreIcon from "@material-ui/icons/MoreVert";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import FuzzyCars from './components/FuzzyCars'
import AppContext from './Context.js'
import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Template from "./components/template";
// import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

import MagnifyIcon from "mdi-react/MagnifyIcon";

import carPlaceholder from "./assets/carPlaceholder.png";
import accept from "./assets/accept.png";
import accepted from "./assets/accepted.png";
import decline from "./assets/decline.png";
import selects from "./assets/selects.png";
import car1 from "./assets/car1.png";
import car2 from "./assets/car2.png";

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

const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  height: 400px;
  width: 400px;
`;
const Map = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        options={{
          disableDefaultUI: true,
          scaleControl: false,
          scrollwheel: false,
          clickableIcons: false
        }}
        defaultZoom={13}
        defaultCenter={{ lat: 45.5317, lng: -73.6573 }}
      />
    );
  })
);

const MyMapComponent = withScriptjs(
  withGoogleMap(({ markerPosition }) => (
    <GoogleMap
      options={{
        disableDefaultUI: true,
        scaleControl: false
      }}
      defaultZoom={13}
      defaultCenter={markerPosition}
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  ))
);

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
const NameDiv = styled.div`
  width: 200px;
  padding-right: 400px;
  padding-left: 10px;
`;
const PriceDiv = styled.div`
  width: 140px;
  padding: 10px 40px;
  outline: 1px solid #666;
  margin-right: 240px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;
const ComissionDiv = styled.div`
  width: 200px;
`;
const HeaderDiv = styled.div`
  width: 200px;
  padding: 4px 300px 10px 10px;

  white-space: nowrap;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
`;
const NameHeaderDiv = styled.div`
  width: 200px;
  padding: 4px 400px 10px 70px;

  white-space: nowrap;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;

  white-space: nowrap;
`;

export default function App() {

  return (
    <>
      <Switch>
        <Route path="/" exact component={SearchPage} />
        <Route path="/map" exact component={MapPage} />
        <Route path="/bd" exact component={BD} />
        <Route path="/step" exact component={StepperComponent} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
    </>
  );
  function MapPage() {
    return (
      <StyledDiv>
        <Map
          isMarkerShown={false}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDRNFsKxPqxoogoI3YnxxcdQVETC8P7bVE&libraries=geometry,drawing,places,visualization"
          loadingElement={<Background />}
          containerElement={<Background />}
          mapElement={<Background />}
        />
      </StyledDiv>
    );
  }
  function BD() {
    return (
      <>
        <LabelWithCircle number="1">
          How much you want pay for each car?
        </LabelWithCircle>
      </>
    );
  }
}

function MapPage() {
  return (
    <StyledDiv>
      <Map
        isMarkerShown={false}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDRNFsKxPqxoogoI3YnxxcdQVETC8P7bVE&libraries=geometry,drawing,places,visualization"
        loadingElement={<Background />}
        containerElement={<Background />}
        mapElement={<Background />}
      />
    </StyledDiv>
  );
}

const SearchSection = styled.div`
  height: 194px;
  display: flex;
  align-items: flex-start;
  padding: 40px 165px 40px 165px;
  background: #fff;
  flex-direction: column;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;
const CarsCardSection = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px 165px 40px 165px;
  background: #fff;
  flex-direction: column;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;
const Title = styled.div`
  color: #79828b;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: normal;
  margin-left: 26px;
`;
const Circle = styled.div`
  width: 36px;
  line-height: 36px;
  border-radius: 50%;
  text-align: center;
  font-size: 24px;
  border: 2px solid #666;
  background-color: #666;
  color: #fff;
`;
const LabelWithCircleDiv = styled.div`
  display: flex;
  align-items: center;
`;
const LabelWithCircle = props => {
  return (
    <LabelWithCircleDiv>
      <Circle>{props.number}</Circle>
      <Title>{props.children}</Title>
    </LabelWithCircleDiv>
  );
};

const PaperContainer = styled.div`
  position: relative;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 2px;
  background-color: #ffffff;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const Input = styled.input`
  font-family: Poppins;
  padding-left: 12px;
  font-weight: 400;
  font-size: 14px;
  position: relative;
  width: 390px;
  height: 40px;
  border-style: solid;
  border-width: 0px 0px 2px 0px;
  border-color: #e0e0e0;
  background-color: #ffffff;
  font-size: 24px;
  &::placeholder {
    color: #a3a6b4;
    font-size: 24px;
  }
  &:focus {
    outline: none;
  }
`;
const ContentHeader = styled.div`
  height: 139px;
  display: flex;
  justify-content: center;
  padding: 40px 165px 40px 165px;
  background: #fff;
  flex-direction: column;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: Poppins;
  font-size: 32px;
  color: #79828b;
`;

function SearchPage() {
  const [selectedCars, setSelectedCars] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const onChange = (e) => {
    setSearchValue(e.currentTarget.value)
  }

  const selectCar = (id) => {
    const indexe = selectedCars.indexOf(id)
    if (indexe !== -1) {
      setSelectedCars(_.remove(selectedCars, (car, index) => index !== indexe))
    } else {
      setSelectedCars(_.concat(selectedCars, id))
    }
  }
  const appContext = {
    selectCar,
    selectedCars
  }

  return (
    <Template>
      <SearchSection>
        <LabelWithCircle number={1}>Search the car you need</LabelWithCircle>
        <Row>
          <Input placeholder={"Enter car brand or model"} value={searchValue} onChange={onChange} />
          <MagnifyIcon color={"#E0E0E0"} />
        </Row>
      </SearchSection>
      <AppContext.Provider value={appContext}>
        <CarsCardSection>
          <FuzzyCars searchValue={searchValue} />
        </CarsCardSection>
      </AppContext.Provider>
    </Template>
  );
}

const StyledTabs = styled(Tabs)`
  && {
    border-style: solid;
    border-width: 0px 0px 2px 0px;
    border-color: #e0e0e0;
    margin-top: 36px;
  }
`;

const StyledTab = styled(Tab)`
  && {
    font-size: 18px;
    font-weight: 700;
  }
`;

const FirstTab = styled(StyledTab)`
  && {
    margin-left: 165px;
  }
`;

const OfferPaper = styled.div`
  height: 111px;
  width: 100%;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.02);
  font-family: Poppins;
  font-size: 32px;
  color: #79828b;
  margin-bottom: 16px;
  justify-content: space-around;
`;

const Content = styled.div`
  width: 100%;
  padding: 55px 165px 0px 165px;
`;

const LabelValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-size: 12px;
  color: #79828b;
`;

const Value = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #42505c;
`;

function LabelValue(props) {
  return (
    <LabelValueWrapper>
      <Label>{props.label}</Label>
      <Value>{props.value}</Value>
    </LabelValueWrapper>
  );
}

function Dashboard() {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Template>
      <ContentHeader>Dashboard > Manage your offers</ContentHeader>
      <StyledTabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <FirstTab label="Received Offers" />
        <StyledTab label="Transaction Status" />
      </StyledTabs>
      <Content>
        {value === 0 && (
          <>
            <OfferPaper>
              <img src={car1} />
              <LabelValue label={"Make"} value={"Mazda"} />
              <LabelValue label={"Model"} value={"3"} />
              <LabelValue label={"Fixed Price"} value={"500.00$"} />
              <LabelValue label={"Commission Split"} value={"10%"} />
              <img src={accepted} />
            </OfferPaper>
            <OfferPaper>
              <img src={car2} />
              <LabelValue label={"Make"} value={"Toyota"} />
              <LabelValue label={"Model"} value={"Highlander"} />
              <LabelValue label={"Fixed Price"} value={"1500.00$"} />
              <LabelValue label={"Commission Split"} value={"5%"} />
              <img src={accept} />
              <img src={decline} />
            </OfferPaper>
          </>
        )}
        {value === 1 && (
          <>
            <img src={selects} />
          </>
        )}
      </Content>
    </Template>
  );
}

const Text = styled.div`
  font-style: "Roboto";
  color: palevioletred;
`;

function BD() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    firestore
      .collection("database")
      .doc("app")
      .onSnapshot(doc => {
        const data = doc.data();
        if (data) {
          setCounter(data.counter);
        }
      });
  }, []);

  const incrementCounter = (value = 1) => {
    firestore
      .collection("database")
      .doc("app")
      .update({
        counter: counter + value
      });
  };

  return (
    <>
      <Button
        variant="outlined"
        size="medium"
        onClick={() => {
          incrementCounter(-1);
        }}
      >
        Minus
      </Button>
      <Button
        variant="outlined"
        size="medium"
        onClick={() => {
          incrementCounter(1);
        }}
      >
        Add
      </Button>
      <Text>{counter}</Text>
    </>
  );
}

// App Bar -------

// Step -----------

function StepperComponent() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    firestore
      .collection("database")
      .doc("app")
      .onSnapshot(doc => {
        const data = doc.data();
        if (data) {
          setCounter(data.counter);
        }
      });
  }, []);

  const incrementCounter = (value = 1) => {
    firestore
      .collection("database")
      .doc("app")
      .update({
        counter: counter + value
      });
  };

  const steps = [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad"
  ];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`;
      case 1:
        return "An ad group contains one or more ads which target a shared set of keywords.";
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      default:
        return "Unknown step";
    }
  }

  return (
    <Template>
      <Button
        variant="outlined"
        size="medium"
        onClick={() => {
          incrementCounter(-1);
        }}
      >
        Minus
      </Button>
      <Button
        variant="outlined"
        size="medium"
        onClick={() => {
          incrementCounter(1);
        }}
      >
        Add
      </Button>
      <Text>{counter}</Text>

      <Stepper activeStep={counter} orientation="vertical">
        <Step active={counter > 0}>
          <StepLabel>{"Select campaign settings"}</StepLabel>
          <StepContent>
            <Text>{`For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`}</Text>
          </StepContent>
        </Step>
        <Step active={counter > 1}>
          <StepLabel>{"Create an ad group"}</StepLabel>
          <StepContent>
            <Text>
              {
                "An ad group contains one or more ads which target a shared set of keywords."
              }
            </Text>
          </StepContent>
        </Step>
        <Step active={counter > 2}>
          <StepLabel>{"Create an ad"}</StepLabel>
          <StepContent>
            <Text>{`Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`}</Text>
          </StepContent>
        </Step>
      </Stepper>
    </Template>
  );
}

import _ from 'lodash'
import React, { useContext, useState } from 'react'
import orgs from '../data/organizations.json'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done'
import styled, { css } from 'styled-components'
import Typography from '@material-ui/core/Typography';
import AppContext from '../Context.js'
import { Grid, Slug, Fade } from 'mauerwerk'
import { Paper } from '@material-ui/core';

const organizations = orgs.Items;

const getRandomOrganization = (id) => {
  return organizations[id.toString().charAt(0)];
}

const CarCarde = ({car}) => {
  const [open, toggle] = useState(false)
  const ctx = useContext(AppContext)
  const org = getRandomOrganization(car.car_id);

  const onClick = () => {
    toggle(true);
  }

  const close = () => {
    toggle(close);
  }

  const selected = ctx.selectedCars.indexOf(car.car_id) !== -1
  return (
    <>
      <CarCard>
        <CardHeader
          title={_.truncate(org.organization_unit_name, {
            length: 30
          })}
          subheader={`${org.address}, ${org.city}`}
        />
        <CardContent onClick={onClick}>
          <StyledImage link={car.image_exterior} interior={car.image_interior} />
          <Typography variant="h6">Make {car.inventory_make}</Typography>
          <Typography variant="h6">Model {car.inventory_model}</Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <Button onClick={() => { ctx.selectCar(car.car_id) }} variant="contained" color="secondary">
            {selected ? 'SELECTED' : 'SELECT'}
            {selected ? <DoneIcon /> : null}
          </Button>
          <LeftText>
            <Typography variant="h6">${car.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
          </LeftText>
        </CardActions>
      </CarCard>
    </>
  )
}

const CarCard = styled(Card)`
`

const StyledImage = styled.div`
  width: 100%;
  height: 300px;
  background-position: center;
  background-size: cover;
  ${props => `background-image:url(${props.link});`}

  &:hover {
    ${props => `background-image:url(${props.interior});`}
  }
`

const LeftText = styled.span`
  position: absolute;
  right: 12px;
`

const Container = styled.div`
  background: rgba(0,0,0,0.2);
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 99;
`

export default CarCarde

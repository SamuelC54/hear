import React from 'react'
import Fuse from 'fuse.js'
import cars from '../data/vehicules_inventory_data.json'
import { Grid } from 'mauerwerk'
import CarCard from './CarCard'

const carFuse = new Fuse(cars.Items, {
  keys: ['inventory_model', 'inventory_make'],
  threshold: 0.4
})

const FuzzyCars = ({searchValue}) => {
  const filteredCars = carFuse.search(searchValue)

  return (
    <>
      <Grid
        data={filteredCars}
        keys={car => car.car_id}
        columns={3}
        margin={15}
        heights={500}
      >
        {(car, open, toggle) => {
          return (
            <CarCard car={car} open={open} toggle={toggle} />
          )
        }}
      </Grid>
    </>
  )
}

export default FuzzyCars

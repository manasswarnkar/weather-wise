import React from 'react'
import Maps from './Maps'
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'


const MapCard = () => {
  return (
    <div className="MapCard">
      <div className="map">
        <Maps />
      </div>
    </div>
  )
}

export default MapCard

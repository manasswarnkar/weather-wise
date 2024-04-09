import React, { Component, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip, LayersControl, LayerGroup, Rectangle, Circle, FeatureGroup } from 'react-leaflet';
// import MapsForm from './MapsForm'



const style = {
    map: {
        height: '75vh',
        width: '100%',
        flex: 1
    }
}


const center = [51.505, -0.09]
const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
]

const apiKey = process.env.REACT_APP_API_KEY;
const OWMTileURL = `https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid=${apiKey}`


export default class Maps extends React.Component {
    constructor() {
        super();
        this.state = {
            markers: [],
            city: undefined,
            contry: undefined,
            temperature: undefined,
            description: [],
            forecast: [],
            date: [],
            connectionError: undefined,
            textPreview: true,
            layer: 1,
            map: null
        };
    }

    handleLayerChange = () => {
        this.setState(
            (prevState) => ({
                layerKey: prevState.layerKey + 1,
            }),
            () => {
                // After the state has been updated, invalidate the map size
                if (this.state.map) {
                    this.state.map.invalidateSize();
                }
            }
        );
    };

    setMapRef = (map) => {
        // Store the map instance in the state
        this.setState({ map });
    };

    async getWeather() {
        try {
            const api_call = await fetch(`//api.openweathermap.org/data/2.5/weather?lat=${this.state.markers[0].lat}&lon=${this.state.markers[0].lng}&appid=${apiKey}`)
            const data = await api_call.json()
            this.setState({
                city: data.name,
                country: data.sys.country,
                temperature: Number((data.main.temp) - 273).toFixed(1),
                description: data.weather[0].description,
                connectionError: undefined,
                textPreview: false
            })
        }
        catch (e) {
            this.setState({
                city: undefined,
                connectionError: e.name + ":" + " " + e.message,
                textPreview: false
            })
        }
    }

    async getForecast() {
        const forecast_call = await fetch(`//api.openweathermap.org/data/2.5/forecast?lat=${this.state.markers[0].lat}&lon=${this.state.markers[0].lng}&appid=${apiKey}`)
        const dataForecast = await forecast_call.json()
        let forecastarr = []
        let datearr = []
        let descriptionarr = []
        let i = 0
        while (i <= 40) {
            forecastarr.push(Number((dataForecast.list[i].main.temp) - 273).toFixed(1))
            let datedef = new Date()
            datearr.push(new Date(datedef.setTime(Date.parse(dataForecast.list[i].dt_txt))))
            descriptionarr.push(dataForecast.list[i].weather[0].description)
            i += 9
        }
        this.setState({
            forecast: forecastarr,
            date: datearr,
            description: descriptionarr,
            textPreview: false
        })
    }

    componentDidUpdate() {
        if (this.state.markers[0] == undefined) {
            const map = this.refs.map.leafletElement
            setTimeout(function () { map.invalidateSize() }, 100);
        }
    }

    addMarker = (e) => {
        const { markers } = this.state
        markers.splice(0, 2, e.latlng)
        this.setState({ markers })
    }

    onClick(event) {
        this.addMarker(event);
        this.getWeather();
        this.getForecast();
    }



    render() {

        return (
            <div>
                <MapContainer
                    ref="map"
                    center={[55.7522200, 37.6155600]}
                    onClick={event =>
                        this.onClick(event)
                    }
                    zoom={5}
                    style={style.map}
                    whenCreated={this.setMapRef}
                >

                    <LayersControl position="topright">
                    <LayersControl.Overlay name='StreetMap' checked={true} >
                            <TileLayer
                                key={`clouds-layer-${this.state.layerKey}`}
                                url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                                attribution='&copy; OpenWeatherMap contributors'
                                // opacity={0.5}
                            />
                        </LayersControl.Overlay>
                        
                        <LayersControl.BaseLayer name="Clouds" onClick={this.handleLayerChange}>
                            <TileLayer
                                key={`clouds-layer-${this.state.layerKey}`}
                                url={OWMTileURL.replace('{layer}', 'clouds_new')}
                                attribution='&copy; OpenWeatherMap contributors'
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Temperature">
                            <TileLayer
                                key={`clouds-layer-${this.state.layerKey}`}
                                url={OWMTileURL.replace('{layer}', 'temp_new')}
                                attribution='&copy; OpenWeatherMap contributors'
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Precipitation">
                            <TileLayer
                                key={`clouds-layer-${this.state.layerKey}`}
                                url={OWMTileURL.replace('{layer}', 'precipitation_new')}
                                attribution='&copy; OpenWeatherMap contributors'
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Pressure">
                            <TileLayer
                                key={`clouds-layer-${this.state.layerKey}`}
                                url={OWMTileURL.replace('{layer}', 'pressure_new')}
                                attribution='&copy; OpenWeatherMap contributors'
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Wind Speed">
                            <TileLayer
                                key={`clouds-layer-${this.state.layerKey}`}
                                url={OWMTileURL.replace('{layer}', 'wind_new')}
                                attribution='&copy; OpenWeatherMap contributors'
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Clear Map" checked={true}>
                            <TileLayer
                                key={`clouds-layer-${this.state.layerKey}`}
                                url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                                attribution='&copy; OpenWeatherMap contributors'
                            />
                        </LayersControl.BaseLayer>

                        

                        {/* Add more base layers if needed */}
                    </LayersControl>

                    {/* <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        // url={OWMTileURL.replace('{layer}', 'temp_new')}
                        url = {`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                        opacity={0.9}
                    />
                    <LayersControl position="topright">
                        <LayersControl.Overlay name="temp">
                            <Marker position={center}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="pressure">
                            <LayerGroup>
                                <Circle
                                    center={center}
                                    pathOptions={{ fillColor: 'blue' }}
                                    radius={200}
                                />
                                <Circle
                                    center={center}
                                    pathOptions={{ fillColor: 'red' }}
                                    radius={100}
                                    stroke={false}
                                />
                                <LayerGroup>
                                    <Circle
                                        center={[51.51, -0.08]}
                                        pathOptions={{ color: 'green', fillColor: 'green' }}
                                        radius={100}
                                    />
                                </LayerGroup>
                            </LayerGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay name="wind">
                            <FeatureGroup pathOptions={{ color: 'purple' }}>
                                <Popup>Popup in FeatureGroup</Popup>
                                <Circle center={[51.51, -0.06]} radius={200} />
                                <Rectangle bounds={rectangle} />
                            </FeatureGroup>
                        </LayersControl.Overlay>
                    </LayersControl> */}



                    {this.state.markers.map((position, idx) =>
                        <Marker key={`marker-${idx}`} position={position}>
                            <Tooltip permanent>
                                {this.state.city ? <span>{this.state.city}</span> : <span>This place</span>}
                                {/* {!this.state.city && <span>This place</span>} */}
                            </Tooltip>
                        </Marker>
                    )}
                </MapContainer>

                {/* {this.state.connectionError=="TypeError: Failed to fetch" && <ListGroup>
          <ListGroup.Item>{this.state.connectionError}<br />Try to change browser or attempt later</ListGroup.Item>
        </ListGroup>}

        {!this.state.city && this.state.connectionError=="TypeError: Cannot read property 'country' of undefined" && <ListGroup>
          <ListGroup.Item>{this.state.connectionError}<br />Wrong latitude or longitude (you scrolled the whole map)</ListGroup.Item>
        </ListGroup>}
        {this.state.date && this.state.temperature && <MapsForm city={this.state.city} country={this.state.country} temperature={this.state.temperature} forecast={this.state.forecast} date={this.state.date} description={this.state.description} connectionError={this.state.connectionError} /> }
             */}
                {/* {this.state.textPreview && <Jumbotron className="_map_text">
                            <h3>
                                Choose the place!
                         </h3>   
               </Jumbotron>} */}

            </div>
        );
    }
}
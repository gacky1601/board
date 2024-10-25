import axios from 'axios';
import * as stationConfigs from "./stationsConfig.js"

const api_url = "https://peggy-backend-7kg3x2vbyq-de.a.run.app/"
export const fetchRealtimeData = (value, setRealTimeData) => {
    if (!value) return;
    if(value=='台北101/世貿')
        value='101';
    axios.get(`${api_url}/api/metro/${encodeURIComponent(value)}`)
        .then(response => {
            setRealTimeData(response.data);
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });
};

export const findStationRoute = (stationName) => {
    if (stationConfigs.BlueLine.includes(stationName)) {
        return "Blue"
    }
    else if (stationConfigs.RedLine.includes(stationName)) {
        return "Red";
    }
    else if (stationConfigs.GreenLine.includes(stationName)) {
        return "Green";
    }
    else if (stationConfigs.OrangeLine.includes(stationName)) {
        return "Orange";
    }
    else if (stationConfigs.BrownLine.includes(stationName)) {
        return "Brown";
    }else if (stationConfigs.BrownLine.includes(stationName)) {
        return "Brown";
    }
    else if (stationConfigs.YellowLine.includes(stationName)) {
        return "Yellow";
    }
}

export const requestLocationPermission = (handleStationChange, handleRouteChange, setlocation, location) => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setlocation(`${position.coords.latitude},${position.coords.longitude}`);
                localStorage.setItem('location',`${position.coords.latitude},${position.coords.longitude}`);
                axios.get(`${api_url}/api/location/${encodeURIComponent(location)}`)
                    .then(response => {
                        handleStationChange(response.data);
                        handleRouteChange(findStationRoute(response.data));
                    })
                    .catch(error => {
                        console.log('Error fetching data:', error);
                    });
            },
            (error) => {
                console.error("Error obtaining location: ", error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};

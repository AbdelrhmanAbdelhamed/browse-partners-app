import { memo } from 'react'
import { GoogleMap, useJsApiLoader, Polyline } from '@react-google-maps/api';

export const STARBUCKS_CAFE_CENTRAL_LONDON_COORDINATES = {
    lat: 51.5144636,
    lng: -0.142571
};

function MapComponent({ center = STARBUCKS_CAFE_CENTRAL_LONDON_COORDINATES, coordinates = [] } = {}) {
    const coordinatesToPath = () => {
        const invalidCoordinatesErrorMessage = `Invalid coordinates ${JSON.stringify(
            coordinates,
        )}`;

        if (typeof coordinates !== 'string')
            throw new Error(invalidCoordinatesErrorMessage);

        const coordinatesArr = coordinates.split(',').map(Number);

        if (coordinatesArr.length !== 2)
            throw new Error(invalidCoordinatesErrorMessage);

        return { lat: coordinatesArr[0], lng: coordinatesArr[1] };
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY
    })

    const mapContainerStyle = {
        height: "1000px",
        width: "100%"
    }

    const pathFromCenter = [
        STARBUCKS_CAFE_CENTRAL_LONDON_COORDINATES,
        ...([coordinatesToPath(coordinates)])
    ]

    const options = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        paths: pathFromCenter,
        zIndex: 1
    };

    return isLoaded ? (
        <GoogleMap
            id="polyine-map"
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={center}
        >
            <Polyline
                path={pathFromCenter}
                options={options}
            />
        </GoogleMap>
    ) : <></>
}

export default memo(MapComponent)

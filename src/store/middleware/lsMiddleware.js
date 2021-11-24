import Geolocation from '@react-native-community/geolocation';
import { UPDATE_LOCATION, STOP_LOCATION_SERVICE, START_LOCATION_SERVICE, WS_SEND_MESSAGE, PEER_LOCATION, ADJUST_PEER_VOLUME, UPDATE_PEER_LOCATION, UPDATE_STREAM_VOLUMES } from '../../helpers/enums';


//once we get location update tell reducer to update value
var geoWatchId
var ONE_THIRD_MILE = 0.00483091787

function determineVolumePercentage(from, to) {
    return Math.sqrt(Math.pow((to.Latitude-from.latitude), 2)+Math.pow((to.Longitude-from.longitude), 2))/ONE_THIRD_MILE
}

export const locationServiceMiddleware = store => next => action => {
    const { dispatch } = store
    switch (action.type) {
        case START_LOCATION_SERVICE:
            geoWatchId = Geolocation.watchPosition((location) => {
                dispatch({
                    type: UPDATE_LOCATION,
                    payload: location.coords
                })
                dispatch({
                    type: WS_SEND_MESSAGE,
                    payload: {
                        event: UPDATE_LOCATION,
                        data: JSON.stringify(location.coords)
                    }
                })
            },
            err => console.log(err),
            {distanceFilter: 200})
            break
        case ADJUST_PEER_VOLUME:

            vol = determineVolumePercentage(store.getState().currentLocation, action.payload.Location)

            dispatch({
                type: UPDATE_PEER_LOCATION,
                payload: action.payload
            })
            dispatch({
                type: UPDATE_STREAM_VOLUMES,
                payload: {
                    UUID: action.payload.UUID,
                    Volume: vol
                }
            })

            
            break
        case STOP_LOCATION_SERVICE:
            Geolocation.clearWatch(geoWatchId)
            geoWatchId = null
            break
        default:
            next(action)
    }
}
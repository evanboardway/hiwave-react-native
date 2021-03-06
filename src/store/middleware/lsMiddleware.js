import Geolocation from '@react-native-community/geolocation';
import { UPDATE_LOCATION, STOP_LOCATION_SERVICE, START_LOCATION_SERVICE, WS_SEND_MESSAGE, PEER_LOCATION, ADJUST_PEER_VOLUME, UPDATE_PEER_LOCATION, UPDATE_STREAM_VOLUMES, CLIENT_RESET } from '../../helpers/enums';


//once we get location update tell reducer to update value
var geoWatchId
var ONE_THIRD_MILE = 0.00483091787

function determineVolumePercentage(from, to) {
    return  1-(Math.sqrt(Math.pow((to.Latitude-from.latitude), 2)+Math.pow((to.Longitude-from.longitude), 2))/ONE_THIRD_MILE)
}

export const locationServiceMiddleware = store => next => action => {
    const { dispatch } = store
    var updator
    switch (action.type) {
        case START_LOCATION_SERVICE:
            if (!geoWatchId) {
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
                {distanceFilter: 30})
    
                updator = setInterval(() => {
                    let state = store.getState()
                    if (state.peerLocations) {
                        state.peerLocations.forEach((peerLocation) => {
                            dispatch({
                                type: ADJUST_PEER_VOLUME,
                                payload: {
                                    id: peerLocation.id,
                                    location: peerLocation.location
                                }
                            })
                        })
                    }
                }, 1000)
            }
            break
        case ADJUST_PEER_VOLUME:
            vol = determineVolumePercentage(store.getState().currentLocation, action.payload.location)
            dispatch({
                type: UPDATE_STREAM_VOLUMES,
                payload: {
                    id: action.payload.id,
                    volume: vol
                }
            })
            break
        case STOP_LOCATION_SERVICE:
            Geolocation.clearWatch(geoWatchId)
            geoWatchId = null
            clearInterval(updator)
            break
        default:
            next(action)
    }
}
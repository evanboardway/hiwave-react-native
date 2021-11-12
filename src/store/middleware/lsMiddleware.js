import Geolocation from '@react-native-community/geolocation';
import { UPDATE_LOCATION, START_LOCATION_SERVICE, WS_SEND_MESSAGE } from '../../helpers/enums';


//once we get location update tell reducer to update value

export const locationServiceMiddleware = store => next => action => {
    const { dispatch } = store
    switch (action.type) {
        case START_LOCATION_SERVICE:
            Geolocation.watchPosition((location) => {
                console.log(location)
                dispatch({
                    type: WS_SEND_MESSAGE,
                    payload: {
                        event: UPDATE_LOCATION,
                        data: JSON.stringify(location.coords)
                    }
                })
            },
            err => console.log(err),
            {distanceFilter: 400})
            break;
        default:
            next(action)
    }
}
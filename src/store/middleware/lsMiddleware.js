import Geolocation from '@react-native-community/geolocation';
import { UPDATE_LOCATION, START_LOCATION_SERVICE } from '../../helpers/enums';


//once we get location update tell reducer to update value

const refreshRate = 5000

export const locationServiceMiddleware = store => next => action => {
    const { dispatch } = store
    switch (action.type) {
        case START_LOCATION_SERVICE:
            setInterval(() => {
                Geolocation.getCurrentPosition(location => {
                    dispatch({
                        type: UPDATE_LOCATION,
                        payload: location
                    });
                    console.log(location);
                });
            }, refreshRate)
            break;
        default:
            next(action)
    }
}
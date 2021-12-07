import { CURRENT_AVATAR, SET_CURRENT_AVATAR, UPDATE_AVATAR } from "../../helpers/enums"
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem(CURRENT_AVATAR, value)
    } catch (e) {
        // saving error
    }
}

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem(CURRENT_AVATAR)
        if (value !== null) {
            // value previously stored
            return value
        }
        return null
    } catch (e) {
        // error reading value
    }
}


export const avatarMiddleware = store => next => action => {
    const { dispatch } = store

    switch (action.type) {
        case UPDATE_AVATAR:
            storeData(action.payload).then(resp => {
                if (resp) {
                    dispatch({
                        type: SET_CURRENT_AVATAR,
                        payload: action.payload
                    })
                } else {
                    dispatch({
                        type: CURRENT_AVATAR
                    })
                }
            })
            break
        case CURRENT_AVATAR:
            getData().then(avatar => dispatch({
                type: SET_CURRENT_AVATAR,
                payload: avatar
            }))
            break
        default:
            next(action)
            break
    }
}
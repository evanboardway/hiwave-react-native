import { WSCONNECTED, WSCONNECTING, WSCONNECT, UPDATE_WSCONNECTIONSTATE } from "../../helpers/enums"

const initialState = {
    wsConnectionState: WSCONNECTING,
}

export function websocketReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_WSCONNECTIONSTATE:
            console.log("PAYLOAD ", action.payload)
            return {...state, wsConnectionState: action.payload}
        default:
            // console.log("REDUCER ", action)
            return state
    }
}
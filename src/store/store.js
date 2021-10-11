import { createStore } from 'redux';
import { reducer } from './reducers';

const store = createStore(reducer)

export { store }


// Gona have something like this:

// state = {
//     WSCONNECTIONSTATE: "",
//     LOCATION: {
//         lat: 0,
//         long: 0
//     }

// }
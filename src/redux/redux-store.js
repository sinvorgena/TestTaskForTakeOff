import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {contactsReducer} from "./contactsReducer";
import {authReducer} from "./authReduces";


let reducers = combineReducers({
    contacts: contactsReducer,
    auth: authReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store
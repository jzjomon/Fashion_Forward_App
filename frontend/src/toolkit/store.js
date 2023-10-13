import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js'
import  storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk'

const persistConfig = {
    key : 'root',
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer : persistedReducer,
    middleware : [thunk],
})

export const persistor = persistStore(store);

// const store = configureStore({
//     reducer : {
//         user : userReducer
//     }
// })

export default store;
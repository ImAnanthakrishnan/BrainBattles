import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../slices/userSlice";
import quizReducer from '../slices/quizSlice';
import leaderboardReducer from "../slices/leaderboardSlice";
const userPersistConfig = {
    key:"user",
    version:1,
    storage,
    whitelist:['currentUser','token']
}

const persistedUserReducer = persistReducer(userPersistConfig,userReducer)

const rootReducers = combineReducers({
    user:persistedUserReducer,
    quizes:quizReducer,
    leaderboard:leaderboardReducer
});

const store = configureStore({
    reducer: rootReducers,
    middleware:(getDefaultMiddleware) => 
       getDefaultMiddleware({
        serializableCheck:false
       })
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
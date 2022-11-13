import { configureStore } from '@reduxjs/toolkit'
import SettingReducer from "../reducer/setting";
import UserReducer from "../reducer/user";
import AppReducer from "../reducer/app";

export default configureStore({
    reducer:{
        setting: SettingReducer,
        user: UserReducer,
        app: AppReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
   })
})
import {combineReducers} from "@reduxjs/toolkit";
import {uiServicePageReducers, cached_dataServicePageReducers} from "./ServicePageReducers";
import {uiDevPageReducers, cached_dataDevPageReducers} from "./DevPageReducers";
import {uiGamePageReducers, cached_dataGamePageReducers} from "./GamePageReducers";
import {uiHomePageReducers, cached_dataHomePageReducers} from "./HomePageReducers";
import {uiUserPageReducers, cached_dataUserPageReducers} from "./UserPageReducers";
import { uiAppReducers, cached_dataAppReducers } from "./AppPageReducers";


const rootReducer = combineReducers({
    cached_data: combineReducers({
        HomePage: cached_dataHomePageReducers,
        GamePage: cached_dataGamePageReducers,
        DevPage: cached_dataDevPageReducers,
        ServicePage: cached_dataServicePageReducers,
        UserPage: cached_dataUserPageReducers,
        AppPage:cached_dataAppReducers
    }),
    ui: combineReducers({
        HomePage: uiHomePageReducers,
        GamePage: uiGamePageReducers,
        DevPage: uiDevPageReducers,
        ServicePage: uiServicePageReducers,
        UserPage: uiUserPageReducers,
        AppPage:uiAppReducers
    })
})

export default rootReducer
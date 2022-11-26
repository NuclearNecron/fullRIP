import initialstate from "../initialstate";
import {combineReducers} from "@reduxjs/toolkit";
import * as DevPageActions from "../actions/DevPageActions"

function devReducer(state=initialstate.cached_data.DevPage.dev,action){
    switch(action.type){
        case DevPageActions.setDev:
            return action.value
        default: return state
    }
}

function devgamesReducer(state=initialstate.cached_data.DevPage.devgames,action){
    switch(action.type){
        case DevPageActions.setDevGames:
            return action.value
        default: return state
    }
}

function LoadingStatusReducer(state=initialstate.ui.DevPage.loadingStatus,action){
    switch(action.type){
        case DevPageActions.setLoadingStatus:
            return action.value
        default: return state
    }
}

export const uiDevPageReducers = combineReducers({
    loadingStatus:LoadingStatusReducer,
})
export const cached_dataDevPageReducers = combineReducers({
    dev:devReducer,
    devGames: devgamesReducer
})
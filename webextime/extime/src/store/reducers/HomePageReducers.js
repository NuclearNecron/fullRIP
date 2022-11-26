import initialstate from "../initialstate";
import * as HomePageActions from "../actions/HomePageActions"
import {combineReducers} from "@reduxjs/toolkit";


function TextFieldValueReducer(state=initialstate.ui.Home.textFieldValue,action){
    switch(action.type){
        case HomePageActions.setTextFieldValue:
            return action.value
        default: return state
    }
}

function LoadingStatusReducer(state=initialstate.ui.Home.loadingStatus,action){
    switch(action.type){
        case HomePageActions.setLoadingStatus:
            return action.value
        default: return state
    }
}

function GameListReducer(state=initialstate.cached_data.Home.gameList,action){
    switch(action.type){
        case HomePageActions.setGameList:
            return action.value
        default: return state
    }
}

export const uiHomePageReducers = combineReducers({
    loadingStatus:LoadingStatusReducer,
    textFieldValue:TextFieldValueReducer
})
export const cached_dataHomePageReducers = combineReducers({
    gameList:GameListReducer
})
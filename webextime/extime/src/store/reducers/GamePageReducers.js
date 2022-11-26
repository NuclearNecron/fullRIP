import initialstate from "../initialstate";
import {combineReducers} from "@reduxjs/toolkit";
import * as GamePageActions from "../actions/GamePageActions"

function GameReducer(state=initialstate.cached_data.GamePage.game,action){
    switch(action.type){
        case GamePageActions.setGame:
            return action.value
        default: return state
    }
}

function GameServicesReducer(state=initialstate.cached_data.GamePage.gameservices,action){
    switch(action.type){
        case GamePageActions.setGameServices:
            return action.value
        default: return state
    }
}

function ServicePricesReducer(state=initialstate.cached_data.GamePage.serviceprices,action){
    switch(action.type){
        case GamePageActions.setServicePrices:
            return action.value
        default: return state
    }
}

function LoadingStatusReducer(state=initialstate.ui.GamePage.loadingStatus,action){
    switch(action.type){
        case GamePageActions.setLoadingStatus:
            return action.value
        default: return state
    }
}

function TextFieldValueReducer(state=initialstate.ui.GamePage.textFieldValue,action){
    switch(action.type){
        case GamePageActions.setTextFieldValue:
            return action.value
        default: return state
    }
}

function SliderValueReducer(state=initialstate.ui.GamePage.sliderValue,action){
    switch(action.type){
        case GamePageActions.setSliderValue:
            return action.value
        default: return state
    }
}


export const uiGamePageReducers = combineReducers({
    loadingStatus:LoadingStatusReducer,
    textFieldValue:TextFieldValueReducer,
    sliderValue:SliderValueReducer
})
export const cached_dataGamePageReducers = combineReducers({
    game:GameReducer,
    gameservices: GameServicesReducer,
    serviceprices: ServicePricesReducer
})
import initialstate from "../initialstate";
import {combineReducers} from "@reduxjs/toolkit";
import * as ServicePageActions from "../actions/ServicePageActions"


function ServiceReducer(state=initialstate.cached_data.ServicePage.Service,action){
    switch(action.type){
        case ServicePageActions.setService:
            return action.value
        default: return state
    }
}
function ScreenshotsReducer(state=initialstate.cached_data.ServicePage.screenshots,action){
    switch(action.type){
        case ServicePageActions.setScreenshots:
            return action.value
        default: return state
    }
}
function ReviewsReducer(state=initialstate.cached_data.ServicePage.reviews,action){
    switch(action.type){
        case ServicePageActions.setReviews:
            return action.value
        default: return state
    }
}
function LoadingStatusReducer(state=initialstate.ui.ServicePage.loadingStatus,action){
    switch(action.type){
        case ServicePageActions.setLoadingStatus:
            return action.value
        default: return state
    }
}



export const uiServicePageReducers = combineReducers({
    loadingStatus:LoadingStatusReducer,
})
export const cached_dataServicePageReducers = combineReducers({
    Service:ServiceReducer,
    screenshots:ScreenshotsReducer,
    reviews:ReviewsReducer,
})
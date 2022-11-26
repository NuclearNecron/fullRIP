import initialstate from "../initialstate";
import {combineReducers} from "@reduxjs/toolkit";
import * as UserPageActions from "../actions/UserPageActions"

function UserReducer(state=initialstate.cached_data.UserPage.user,action){
    switch(action.type){
        case UserPageActions.setUser:
            return action.value
        default: return state
    }
}

function UserServicesReducer(state=initialstate.cached_data.UserPage.userservices,action){
    switch(action.type){
        case UserPageActions.setUserServices:
            return action.value
        default: return state
    }
}

function LoadingStatusReducer(state=initialstate.ui.UserPage.loadingStatus,action){
    switch(action.type){
        case UserPageActions.setLoadingStatus:
            return action.value
        default: return state
    }
}



export const uiUserPageReducers = combineReducers({
    loadingStatus:LoadingStatusReducer,
})
export const cached_dataUserPageReducers = combineReducers({
    user:UserReducer,
    userservices: UserServicesReducer
})
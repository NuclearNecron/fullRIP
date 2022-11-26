import initialstate from "../initialstate";
import {combineReducers} from "@reduxjs/toolkit";
import * as AppPageActions from "../actions/AppPageActions";



function userAuthorizedReducer(state = initialstate.cached_data.App.userAuthorized, action) {
    switch (action.type) {
        case AppPageActions.setUserStatus:
            return action.value
        default: return state
    }
}

function AppBarLinksReducer(state = initialstate.ui.App.AppBarLinks, action) {
    switch (action.type) {
        case AppPageActions.addToAppBarLinks:
            return state.concat(action.value)
        case AppPageActions.deleteFromAppBarLinks:
            return state.slice(0, -1)
        default: return state
    }
}

export const cached_dataAppReducers = combineReducers({
    userAuthorized: userAuthorizedReducer,
})

export const uiAppReducers = combineReducers({
    AppBarLinks: AppBarLinksReducer,
})
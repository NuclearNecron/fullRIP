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
        case AppPageActions.setAppBarLinks:
            return action.value
        case AppPageActions.addToAppBarLinks:
            let new_state = state;
            action.value.forEach(elem => {
                new_state.push(elem)
            })
            return new_state
        case AppPageActions.deleteFromAppBarLinks:
            return state.filter(elem => !action.value.includes(elem))
        default: return state
    }
}

export const cached_dataAppReducers = combineReducers({
    userAuthorized: userAuthorizedReducer,
})

export const uiAppReducers = combineReducers({
    AppBarLinks: AppBarLinksReducer,
})
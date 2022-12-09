import initialstate from "../initialstate";
import {combineReducers} from "@reduxjs/toolkit";
import * as CartPageActions from "../actions/CartPageActions"

function cartReducer(state=initialstate.cached_data.Cart.cartitems,action){
    switch(action.type){
        case CartPageActions.setCart:
            return action.value
        default: return state
    }
}

function fullpriceReducer(state=initialstate.cached_data.Cart.fullprice,action){
    switch(action.type){
        case CartPageActions.setFullPrice:
            return action.value
        default: return state
    }
}

function LoadingStatusReducer(state=initialstate.ui.Cart.loadingStatus,action){
    switch(action.type){
        case CartPageActions.setLoadingStatus:
            return action.value
        default: return state
    }
}

export const uiCartPageReducers = combineReducers({
    loadingStatus:LoadingStatusReducer,
})
export const cached_dataCartPageReducers = combineReducers({
    cartitems:cartReducer,
    fullprice: fullpriceReducer
})
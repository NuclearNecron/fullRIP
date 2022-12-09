import initialstate from "../initialstate";
import {combineReducers} from "@reduxjs/toolkit";
import * as OrderPageActions from "../actions/OrderPageActions"

function ordersReducer(state=initialstate.cached_data.Order.orders,action){
    switch(action.type){
        case OrderPageActions.setOrders:
            return action.value
        default: return state
    }
}

function orderidReducer(state=initialstate.cached_data.Order.orderid,action){
    switch(action.type){
        case OrderPageActions.setOrderID:
            return action.value
        default: return state
    }
}

function orderlistReducer(state=initialstate.cached_data.Order.orderlist,action){
    switch(action.type){
        case OrderPageActions.setOrderList:
            return action.value
        default: return state
    }
}

function LoadingStatusReducer(state=initialstate.ui.Order.loadingStatus,action){
    switch(action.type){
        case OrderPageActions.setLoadingStatus:
            return action.value
        default: return state
    }
}

export const uiOrderPageReducers = combineReducers({
    loadingStatus:LoadingStatusReducer,
})
export const cached_dataOrderPageReducers = combineReducers({
    orders:ordersReducer,
    orderlist: orderlistReducer,
    orderid:orderidReducer
})
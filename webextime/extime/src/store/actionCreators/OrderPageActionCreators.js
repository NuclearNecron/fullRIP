import * as OrderPageActions from "../actions/OrderPageActions"


export const createAction_setOrders = (value) =>{
    return{
        type: OrderPageActions.setOrders,
        value: value
    }
}

export const createAction_setOrderID = (value) =>{
    return{
        type: OrderPageActions.setOrderID,
        value: value
    }
}

export const createAction_setOrderList = (value) =>{
    return{
        type: OrderPageActions.setOrderList,
        value: value
    }
}

export const createAction_setLoadingStatus = (value) =>{
    return{
        type: OrderPageActions.setLoadingStatus,
        value: value
    }
}
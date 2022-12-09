import * as CartPageActions from "../actions/CartPageActions"


export const createAction_setCart = (value) =>{
    return{
        type: CartPageActions.setCart,
        value: value
    }
}

export const createAction_setFullPrice = (value) =>{
    return{
        type: CartPageActions.setFullPrice,
        value: value
    }
}

export const createAction_setLoadingStatus = (value) =>{
    return{
        type: CartPageActions.setLoadingStatus,
        value: value
    }
}
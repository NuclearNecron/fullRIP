import * as GamePageActions from "../actions/GamePageActions"


export const createAction_setGame = (value) =>{
    return{
        type: GamePageActions.setGame,
        value: value
    }
}

export const createAction_setGameServices = (value) =>{
    return{
        type: GamePageActions.setGameServices,
        value: value
    }
}

export const createAction_setServicePrices = (value) =>{
    return{
        type: GamePageActions.setServicePrices,
        value: value
    }
}

export const createAction_setLoadingStatus = (value) =>{
    return{
        type: GamePageActions.setLoadingStatus,
        value: value
    }
}

export const createAction_setTextFieldValue = (value) =>{
    return{
        type: GamePageActions.setTextFieldValue,
        value: value
    }
}

export const createAction_setSliderValue = (value) =>{
    return{
        type: GamePageActions.setSliderValue,
        value: value
    }
}
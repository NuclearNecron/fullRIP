import * as DevPageActions from "../actions/DevPageActions"


export const createAction_setDev = (value) =>{
    return{
        type: DevPageActions.setDev,
        value: value
    }
}

export const createAction_setDevGames = (value) =>{
    return{
        type: DevPageActions.setDevGames,
        value: value
    }
}

export const createAction_setLoadingStatus = (value) =>{
    return{
        type: DevPageActions.setLoadingStatus,
        value: value
    }
}
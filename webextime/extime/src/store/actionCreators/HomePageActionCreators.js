import * as HomePageActions from "../actions/HomePageActions"

export const createAction_setGameList = (value) =>{
    return{
        type: HomePageActions.setGameList,
        value: value
    }
}

export const createAction_setLoadingStatus = (value) =>{
    return{
        type: HomePageActions.setLoadingStatus,
        value: value
    }
}

export const createAction_setTextFieldValue = (value) =>{
    return{
        type: HomePageActions.setTextFieldValue,
        value: value
    }
}
import * as UserPageActions from "../actions/UserPageActions"

export const createAction_setUser = (value) =>{
    return{
        type: UserPageActions.setUser,
        value: value
    }
}

export const createAction_setUserServices = (value) =>{
    return{
        type: UserPageActions.setUserServices,
        value: value
    }
}

export const createAction_setLoadingStatus = (value) =>{
    return{
        type: UserPageActions.setLoadingStatus,
        value: value
    }
}
import * as ServicePageActions from "../actions/ServicePageActions"

export const createAction_setService = (value) =>{
    return{
        type: ServicePageActions.setService,
        value: value
    }
}

export const createAction_setScreenshots = (value) =>{
    return{
        type: ServicePageActions.setScreenshots,
        value: value
    }
}

export const createAction_setReviews = (value) =>{
    return{
        type: ServicePageActions.setReviews,
        value: value
    }
}


export const createAction_setLoadingStatus = (value) =>{
    return{
        type: ServicePageActions.setLoadingStatus,
        value: value
    }
}
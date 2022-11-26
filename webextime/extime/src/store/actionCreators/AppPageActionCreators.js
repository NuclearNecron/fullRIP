import * as AppPageActions from "../actions/AppPageActions"


export const createAction_setUserStatus = (value) => {
    return {
        type: AppPageActions.setUserStatus,
        value: value
    }
}

export const createAction_addToAppBarLinks = (value) => {
    return {
        type: AppPageActions.addToAppBarLinks,
        value: value
    }
}

export const createAction_deleteFromAppBarLinks = (value) => {
    return {
        type: AppPageActions.deleteFromAppBarLinks,
        value: value
    }
}
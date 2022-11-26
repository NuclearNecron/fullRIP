import * as ServicePageActionCreators from "../actionCreators/ServicePageActionCreators"
import { getServicesbyID,getPicsbyService, getReviewsbyService } from "../../resourses/data"

export const  fetchfullserviceinfo = (gameid, serviceid) => async dispatch => {
    if ((gameid) && (serviceid)) {
    dispatch(ServicePageActionCreators.createAction_setLoadingStatus(true))
    const service = await getServicesbyID(serviceid, gameid)
    const pics = await getPicsbyService(serviceid, gameid)
    dispatch(ServicePageActionCreators.createAction_setService(service))
    dispatch(ServicePageActionCreators.createAction_setScreenshots(pics))
    dispatch(ServicePageActionCreators.createAction_setLoadingStatus(false))
}
}

export const  fetchreviews = (gameid, serviceid) => async dispatch => {
    if ((gameid) && (serviceid)) {
        dispatch(ServicePageActionCreators.createAction_setLoadingStatus(true))
        const reviews = await getReviewsbyService(serviceid, gameid)
        dispatch(ServicePageActionCreators.createAction_setReviews(reviews))
        dispatch(ServicePageActionCreators.createAction_setLoadingStatus(false))
    }
}
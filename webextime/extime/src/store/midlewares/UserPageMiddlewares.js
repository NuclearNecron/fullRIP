import * as UserPageActionCreators from "../actionCreators/UserPageActionCreators"
import { getUserbyID, getServicesbyUser} from "../../resourses/data"

export const  fetchfulluserinfo = (id) => async dispatch => {
    if (id) {
        dispatch(UserPageActionCreators.createAction_setLoadingStatus(true))
        const user = await getUserbyID(id)
        const servicelist = await getServicesbyUser(id)
        dispatch(UserPageActionCreators.createAction_setUser(user))
        dispatch(UserPageActionCreators.createAction_setUserServices(servicelist))
        dispatch(UserPageActionCreators.createAction_setLoadingStatus(false))
    }
}
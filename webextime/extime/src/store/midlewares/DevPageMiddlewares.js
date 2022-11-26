import * as DevPageActionCreators from "../actionCreators/DevPageActionCreators"
import { getDevbyID, getGamebyDev} from "../../resourses/data"

export const  fetchfulldevinfo = (id) => async dispatch => {
    if (id) {
        dispatch(DevPageActionCreators.createAction_setLoadingStatus(true))
        const dev = await getDevbyID(id)
        const gamelist = await getGamebyDev(id)
        dispatch(DevPageActionCreators.createAction_setDev(dev))
        dispatch(DevPageActionCreators.createAction_setDevGames(gamelist))
        dispatch(DevPageActionCreators.createAction_setLoadingStatus(false))
    }
}
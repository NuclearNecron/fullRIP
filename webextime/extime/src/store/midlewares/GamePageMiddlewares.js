import * as GamePageActionCreators from "../actionCreators/GamePageActionCreators"
import {getServicesbyGame, getGamebyID, getServicesPricesbyGame, getServicesbyGameFilter} from "../../resourses/data"

export const fetchallservices  = (id, filters) => async dispatch =>{
    if (id) {
        dispatch(GamePageActionCreators.createAction_setLoadingStatus(true))
        const game = await getGamebyID(id)
        if (filters) {
            const data = await getServicesbyGameFilter(id, filters.name, filters.min, filters.max)
            dispatch(GamePageActionCreators.createAction_setGame(game))
            dispatch(GamePageActionCreators.createAction_setGameServices(data))
            dispatch(GamePageActionCreators.createAction_setLoadingStatus(false))
        } else {
            const data = await getServicesbyGame(id)
            dispatch(GamePageActionCreators.createAction_setGame(game))
            dispatch(GamePageActionCreators.createAction_setGameServices(data))
            dispatch(GamePageActionCreators.createAction_setLoadingStatus(false))
        }
    }
}

export const  fetchfulllist = (id) => async dispatch => {
    if (id) {
        dispatch(GamePageActionCreators.createAction_setLoadingStatus(true))
        const game = await getGamebyID(id)
        const data = await getServicesbyGame(id)
        const prices = await getServicesPricesbyGame(id)
        const pricesinfo = [prices.min_cost, prices.max_cost]
        dispatch(GamePageActionCreators.createAction_setServicePrices(pricesinfo))
        dispatch(GamePageActionCreators.createAction_setGame(game))
        dispatch(GamePageActionCreators.createAction_setGameServices(data))
        dispatch(GamePageActionCreators.createAction_setLoadingStatus(false))
    }
}
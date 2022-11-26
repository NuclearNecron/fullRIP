import * as HomePageActionCreators from "../actionCreators/HomePageActionCreators"
import {getAllGamesFilter,getAllGames} from "../../resourses/data"

export const fetchallGames  = (filters) => async dispatch =>{
    dispatch(HomePageActionCreators.createAction_setLoadingStatus(true))
    if(filters){
        const data = await getAllGamesFilter(filters.name)
        dispatch(HomePageActionCreators.createAction_setGameList(data))
        dispatch(HomePageActionCreators.createAction_setLoadingStatus(false))
    }
    else{
        const data = await getAllGames()
        dispatch(HomePageActionCreators.createAction_setGameList(data))
        dispatch(HomePageActionCreators.createAction_setLoadingStatus(false))
    }
}

export const  fetchfulllist = () => async dispatch => {
    dispatch(HomePageActionCreators.createAction_setLoadingStatus(true))
    const gamelist = await getAllGames()
    dispatch(HomePageActionCreators.createAction_setGameList(gamelist))
    dispatch(HomePageActionCreators.createAction_setLoadingStatus(false))
}
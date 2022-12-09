import * as OrderPageActionCreators from "../actionCreators/OrderPageActionCreators"
import {
    getAllGames,
    getAllGamesFilter,
    getallOrders,
    getallOrdersFilter,
    getOrderlist,
    getOrders
} from "../../resourses/data"
import * as HomePageActionCreators from "../actionCreators/HomePageActionCreators";

export const  fetchorders = (userid) => async dispatch => {
    if (userid) {
        dispatch(OrderPageActionCreators.createAction_setLoadingStatus(true))
        const orders = await getOrders(userid)
        dispatch(OrderPageActionCreators.createAction_setOrderID(-1))
        dispatch(OrderPageActionCreators.createAction_setOrders(orders))
        dispatch(OrderPageActionCreators.createAction_setLoadingStatus(false))
    }
}

export const  fetchallorders = (filters) => async dispatch =>{
    if(filters){
        const data = await getallOrdersFilter(filters.status)
        dispatch(OrderPageActionCreators.createAction_setOrders(data))
    }
    else{
        const data = await getallOrders()
        dispatch(OrderPageActionCreators.createAction_setOrders(data))
    }
}

export const  fetchorderinfo = (userid, orderid) => async dispatch => {
    console.log(userid,orderid)
    if ((userid) && (orderid)) {
        dispatch(OrderPageActionCreators.createAction_setLoadingStatus(true))
        dispatch(OrderPageActionCreators.createAction_setOrderID(orderid))
        const orderlist = await getOrderlist(userid, orderid)
        console.log(orderlist)
        dispatch(OrderPageActionCreators.createAction_setOrderList(orderlist))
        dispatch(OrderPageActionCreators.createAction_setLoadingStatus(false))
    }
}
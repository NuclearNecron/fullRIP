import * as CartPageActionCreators from "../actionCreators/CartPageActionCreators"
import { getCart} from "../../resourses/data"

export const  fetchcartinfo = (id) => async dispatch => {
    if (id) {
        dispatch(CartPageActionCreators.createAction_setLoadingStatus(true))
        const cart = await getCart(id)
        let fullprice = 0
        console.log(fullprice)
        for (var i=0;i<cart.length;i++){
            fullprice = fullprice+cart[i].service.price*cart[i].amount
            console.log(fullprice)
        }
        dispatch(CartPageActionCreators.createAction_setCart(cart))
        dispatch(CartPageActionCreators.createAction_setFullPrice(fullprice))
        dispatch(CartPageActionCreators.createAction_setLoadingStatus(false))
    }
}
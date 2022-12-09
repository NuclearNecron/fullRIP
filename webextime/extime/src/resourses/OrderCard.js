import {Button, Card} from "react-bootstrap";
import React from "react";
import '../styles/OrderCard.css';
import {fetchorderinfo} from "../store/midlewares/OrderPageMiddlewares";
import {fetchcartinfo} from "../store/midlewares/CartPaggeMiddlewares";
import {useDispatch} from "react-redux";


const OrderCard = (order) => {

    const dispatch = useDispatch()

    const OrderShow = async() =>{
        console.log("calling change of order")
        dispatch(fetchorderinfo(order.user.pk,order.id))

    }

    return <Card  className={"servicecard"}>
        <Card.Body>
            <Card.Title className={"title"}>Заказ №{order.id}</Card.Title>
            <Card.Text  className={"bodytext"}>Статус заказа:{order.status.name}</Card.Text>
            <Card.Text  className={"cost"}>Стоимость заказа: {order.cost} руб.</Card.Text>
            <Button  className={"button"} onClick={(event=>{
                OrderShow()
            })}>Открыть состав заказа</Button>
        </Card.Body>
    </Card>
}

export default OrderCard;
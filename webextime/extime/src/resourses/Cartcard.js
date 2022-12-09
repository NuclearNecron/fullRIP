import {Button, Card} from "react-bootstrap";
import React from "react";
import '../styles/ServiceCard.css';
import {Link} from "react-router-dom";
import {fetchcartinfo} from "../store/midlewares/CartPaggeMiddlewares";
import {useDispatch} from "react-redux";

const CartCard = (data) => {
    console.log(data)
    const userid = localStorage.getItem('userId')
    const dispatch = useDispatch()

    const CartAdd = async() =>{

        const key = data.id
        const data_to_send = {
            "user": userid-0,
            "service": data.service.pk-0,
            "amount": data.amount+1
            }
            await fetch(`http://localhost:8000/POSTcart/${key}/`,{
                method: 'PUT',
                headers:{
                    'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data_to_send)
            }).then((response) => {
                console.log(response)
            })
        dispatch(fetchcartinfo(userid))
    }
    const CartRemove = async() =>{
        const key = data.id
        const data_to_send = {
            "user": userid-0,
            "service": data.service.pk-0,
            "amount": data.amount-1
        }
        if (data_to_send.amount <=0){
            await fetch(`http://localhost:8000/POSTcart/${key}/`,{
                method: 'DELETE',
                headers:{
                    'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type':'application/json'
                }
            }).then((response) => {
                console.log(response)
                console.log(data_to_send)
            })
        }
        else{
            await fetch(`http://localhost:8000/POSTcart/${key}/`,{
                method: 'PUT',
                headers:{
                    'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data_to_send)
            }).then((response) => {
                console.log(response)
                console.log(data_to_send)
            })
        }
        dispatch(fetchcartinfo(userid))
    }
    const CartDelete = async() =>{
        const key = data.id
        await fetch(`http://localhost:8000/POSTcart/${key}/`,{
            method: 'DELETE',
            headers:{
                'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type':'application/json'
            }
        }).then((response) => {
            console.log(response)
        })
        dispatch(fetchcartinfo(userid))
    }

    return <Card  className={"servicecard"}>
        <Card.Body>

            <Card.Title className={"title"}>{data.service.service_name}</Card.Title>
            <Card.Text  className={"bodytext"}>{data.service.description}</Card.Text>
            <Card.Text  className={"seller"}>Игра: {data.service.game.game_name}</Card.Text>
            <Card.Text  className={"amount"}>В корзине: {data.amount}.</Card.Text>
            <Card.Text  className={"type"}>Тип услуги: {data.service.type.typename}</Card.Text>
            <Card.Text  className={"Итого"}>Цена:{data.service.price*data.amount} руб.</Card.Text>
            <Button  className={"plus"} onClick={(event=>{
                CartAdd()
            })}>+</Button>
            <Button  className={"minus"} onClick={(event=>{
                CartRemove()
            })}>-</Button>
            <Button className={"delete"} onClick={(event=>{
                CartDelete()
            })}>Удалить</Button>
            <Link to={`../game/${data.service.game.pk}/service/${data.service.pk}/`}>
                <Button  className={"button"}>Перейти</Button>
            </Link>

        </Card.Body>
    </Card>
}

export default CartCard;
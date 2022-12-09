import React, {useEffect, useState} from "react";
import '../styles/GamePage.css';
import DocumentTitle from 'react-document-title';
import {Button, Col, Row, Spinner} from 'react-bootstrap';
import Cartcard from "../resourses/Cartcard";
import { useSelector, useDispatch } from 'react-redux';
import BasicBreadcrumbs from "../resourses/breadcrumbs";
import {fetchcartinfo} from "../store/midlewares/CartPaggeMiddlewares";
import * as CartPageActionCreators from "../store/actionCreators/CartPageActionCreators";
import {getCartItem} from "../resourses/data";



function CartPage() {
    const userid = localStorage.getItem('userId')
    const loadingStatus = useSelector(state => state.ui.CartPage.loadingStatus)
    const fullprice = useSelector(state => {
        return state.cached_data.CartPage.fullprice
    })
    const CartList = useSelector(state => state.cached_data.CartPage.cartitems)
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log("trying to load cart");
        dispatch(fetchcartinfo(userid))
        console.log(CartList)
    },[]);
    const OrderAdd = async() =>{
        const userid = localStorage.getItem('userId')
        if (CartList.length){
        const data_to_send = {
            "user": userid-0,
            "status": 1,
            "cost": fullprice
        }
        await fetch(`http://localhost:8000/POSTorder/`,{
            method: 'POST',
            headers:{
                'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data_to_send)
        }).then((response) =>{
            return response.json()
        }).then(async (new_order)=>{
           const cartlenght = CartList.length
            console.log(new_order)
           for (let i=0;i<cartlenght;i++){
               let orderdata={
                   "order": new_order.id-0,
                   "service": CartList[i].service.pk-0,
                   "cost": CartList[i].service.price-0,
                   "amount": CartList[i].amount-0
               }
               await fetch(`http://localhost:8000/POSTorderlist/`,{
                   method: 'POST',
                   headers:{
                       'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                       'Content-Type':'application/json'
                   },
                   body: JSON.stringify(orderdata)
               })
               await fetch(`http://localhost:8000/POSTcart/${CartList[i].id}`,{
                   method: 'DELETE',
                   headers:{
                       'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                       'Content-Type':'application/json'
                   }
               })
           }
    })}
        dispatch(fetchcartinfo(userid))
}



    return (
        <>
            <DocumentTitle title="Корзина"/>
            <BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Стартовая страница'
                },
                {
                    ref: `/cart`,
                    text: 'Корзина'
                }
            ]}/>
            <div className={`main-container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:
                    <>
                        <div className={"CartGrid"}>
                            {!CartList.length ? <div className={"emptyresponse"}><h1>Корзина пуста</h1></div>:
                                <>
                                    <Row xs={1} sm={1} md={2} lg={2} className={"grid"}>
                                        {CartList.filter(cartitem => cartitem.amount>0).map((item, index) => {
                                            console.log(CartList)
                                            return (
                                                <Col key={index}>
                                                    <Cartcard {...item}/>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </>}
                        </div>
                        <div className={"fullprice"}>{fullprice} руб.</div>
                        <Button className={"delete"} onClick={(event=>{
                            OrderAdd()
                        })}>Оформить заказ</Button>
                    </>
                }
            </div>
        </>
    );
}

export default CartPage;
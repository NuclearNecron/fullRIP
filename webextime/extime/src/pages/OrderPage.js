import React, {useEffect, useState} from "react";
import '../styles/GamePage.css';
import DocumentTitle from 'react-document-title';
import {Button, Card, Col, Row, Spinner} from 'react-bootstrap';
import OrderCard from "../resourses/OrderCard";
import { useSelector, useDispatch } from 'react-redux';
import BasicBreadcrumbs from "../resourses/breadcrumbs";
import {fetchorderinfo, fetchorders} from "../store/midlewares/OrderPageMiddlewares";




function OrderPage() {
    const userid = localStorage.getItem('userId')
    const loadingStatus = useSelector(state => state.ui.OrderPage.loadingStatus)
    const OrderList = useSelector(state => {
        return state.cached_data.OrderPage.orders
    })
    const OrderInfo = useSelector(state => {
        console.log(state.cached_data.OrderPage.orderlist)
        return state.cached_data.OrderPage.orderlist
    })
    const Orderid = useSelector(state => state.cached_data.OrderPage.orderid)
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log("trying to load orders");
        dispatch(fetchorders(userid))
        console.log(OrderList)
    },[]);


    return (
        <>
            <DocumentTitle title="Заказы"/>
            <BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Стартовая страница'
                },
                {
                    ref: `/cart`,
                    text: 'Заказы'
                }
            ]}/>
            <div className={`main-container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:
                    <>
                        <div className={"Orderinfo"}>
                            <Card  className={"OrderInfoCard"}>
                                <Card.Body>
                                    {Orderid===-1? <Card.Title className={"title"}>Заказ не выбран</Card.Title>:<>
                                    <Card.Title className={"title"}>Заказ №{Orderid}</Card.Title>
                                    {OrderInfo.map((item, index) => {
                                        return (
                                            <Card.Text  className={"info"}>{item.service.service_name}: Куплено:{item.amount}x{item.cost} руб. = {item.amount*item.cost} руб.</Card.Text>
                                        )
                                    })}
                                    </>
                                    }
                                </Card.Body>
                            </Card>
                        </div>
                        <div className={"Order"}>
                            {!OrderList.length ? <div className={"emptyresponse"}><h1>Заказов нет</h1></div>:
                                <>
                                    <Row xs={1} sm={1} md={2} lg={2} className={"grid"}>
                                        {OrderList.map((item, index) => {
                                            return (
                                                <Col key={index}>
                                                    <OrderCard {...item}/>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </>}
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default OrderPage;
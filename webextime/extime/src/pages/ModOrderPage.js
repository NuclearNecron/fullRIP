import React, {useEffect, useState} from "react";
import '../styles/GamePage.css';
import DocumentTitle from 'react-document-title';
import {Button, Card, Col, Form, Row, Spinner} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import BasicBreadcrumbs from "../resourses/breadcrumbs";
import {fetchfulluserinfo} from "../store/midlewares/UserPageMiddlewares";
import * as UserPageActionCreators from "../store/actionCreators/UserPageActionCreators";
import {fetchallorders, fetchorders} from "../store/midlewares/OrderPageMiddlewares";
import * as HomePageActionCreators from "../store/actionCreators/HomePageActionCreators";
import {Link} from "react-router-dom";
import GameFilter from "../resourses/Gamefilters";
import {fetchallGames} from "../store/midlewares/HomePageMiddlewares";





function ModOrder() {

    const userid = localStorage.getItem('userId')
    const [loadingStatus, setloadingStatus] = useState(true)
    const Gamelist = useSelector(state => state.cached_data.HomePage.gameList)
    const Orderlist = useSelector(state=>state.cached_data.OrderPage.orders)
    const dispatch = useDispatch()

    const [newDevValue, setnewDevValue] = useState()
    const [updDevValue, setupdDevValue] = useState()
    const [updGameValue, setupdGameValue] = useState()
    const [newGameName, setnewGameName] = useState('')
    const [updGameName, setupdGameName] = useState('')
    const [statusdata, setstatusdata] = useState([])
    const [currentstatus, setcurrentstatus] = useState()
    const [updatestatus, setupdatestatus] = useState()

    const fetchStatusData = async ()=>{
        return await fetch (`http://localhost:8000/POSTstatus`).then(
            (response)=>{
                return response.json()})}

    const fetchpage = async ()=> {
        setloadingStatus(true)
        const status = await fetchStatusData()
        setstatusdata(status)
        setloadingStatus(false)
    }


    useEffect(()=>{
        setloadingStatus(true)
        console.log("trying to load page mod orders");
        fetchpage()
        dispatch(fetchallorders())
        setloadingStatus(false)
    },[]);




    const Search = async() =>{
        setloadingStatus(true)
        dispatch(fetchallorders({
            status:currentstatus}))
        setloadingStatus(false)
    }

    const Update = async(object) =>{console.log("update")
        const data_to_send = {
            "status": updatestatus-0,
            "user": object.user.pk-0,
            "cost": object.cost-0,
        }
        await fetch(`http://localhost:8000/POSTorder/${object.id}/`,{
            method: 'PUT',
            headers:{
                'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data_to_send)
        }).then((response) =>{
            dispatch(fetchallorders({
                status:currentstatus}))
            return response.json()
        })
    }


    return (

        <>
            <DocumentTitle title="Заказы"/>

            <BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Стартовая страница'
                },
                {
                    ref: `/mod`,
                    text: 'Модерация'
                },
                {
                    ref: `/mod/orders`,
                    text: 'Заказы'
                }
            ]}/>

            <div className={`container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:
                    <>
                        <div className={"container"}>
                            <div className={"serviceGrid"}>
                                <div className={"Filter"}>
                                    <select onChange={
                                        (event) => {console.log(event.target)
                                            return setcurrentstatus(event.target.value)
                                        }}>
                                        <option value="" >Статус</option>
                                        {statusdata.map((stat, index)=>{
                                            return <option key={index}
                                                           value={JSON.stringify(stat.id)}>{stat.name} </option>
                                        })}
                                    </select>
                                    <button type="submit" onClick={(event)=>{
                                        Search()
                                    }}>Поиск</button>
                                </div>
                                {!Orderlist.length ? <div className={"emptyresponse"}><h1>Заказов не найдено</h1></div> :
                                    <Row xs={1} sm={2} md={3} lg={3} className={"grid"}>
                                        {Orderlist.map((item, index) => {
                                            return (
                                                <Col key={index}>
                                                    <Card  className={"ordercard"}>
                                                        <Card.Body>
                                                            <Card.Title className={"title"}>Заказ №{item.id}</Card.Title>
                                                            <Card.Title className={"title"}>Пользователь {item.user.user_name}</Card.Title>
                                                            <Card.Text  className={"bodytext"}>Стоимость:{item.cost}</Card.Text>
                                                            <select id="" onChange={
                                                                (event) => {
                                                                    setupdatestatus(event.target.value)
                                                                    Update(item)
                                                                }}>
                                                                <option value={item.status.id} >{item.status.name}</option>
                                                                {statusdata.map((stat, index)=>{
                                                                    return <option key={index}
                                                                                   value={JSON.stringify(stat.id)}>{stat.name} </option>
                                                                })}
                                                            </select>
                                                            <Button  className={"button"} onClick={ async (event) => {
                                                                await fetch(`http://localhost:8000/POSTorder/${item.id}/`,{
                                                                    method: 'DELETE',
                                                                    headers:{
                                                                        'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                                                                        'Content-Type':'application/json'
                                                                    }
                                                                }).then((response) =>{
                                                                    dispatch(fetchallorders({
                                                                        status:currentstatus}))
                                                                    return response.json()
                                                                })

                                                            }}>Удалить</Button>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            )
                                        })}
                                    </Row>}
                            </div>
                        </div>
                    </>

                }
            </div>
        </>
    );
}

export default ModOrder;

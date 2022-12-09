import React, {useEffect, useState} from "react";
import '../styles/GamePage.css';
import DocumentTitle from 'react-document-title';
import {Button, Card, Col, Form, Row, Spinner} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import BasicBreadcrumbs from "../resourses/breadcrumbs";
import * as HomePageActionCreators from "../store/actionCreators/HomePageActionCreators";





function ModUser() {

    const loadingStatus = useSelector(state => state.ui.HomePage.loadingStatus)
    const dispatch = useDispatch()

    const [users, setusers] = useState([])

    const fetchData = async ()=>{
        return await fetch (`http://localhost:8000/users`).then(
            (response)=>{
                return response.json()})}

    const fetchpage = async ()=> {
        dispatch(HomePageActionCreators.createAction_setLoadingStatus(true))
        const userlist = await fetchData()
        setusers(userlist)
        dispatch(HomePageActionCreators.createAction_setLoadingStatus(false))
    }




    useEffect( ()=>{
        console.log("trying to load page mod users");
        fetchpage()
        console.log(users)
    },[]);


    return (

        <>
            <DocumentTitle title="Пользователи"/>

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
                    ref: `/mod/users`,
                    text: 'Пользователи'
                }
            ]}/>

            <div className={`container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:
                    <>
                        <div className={"container"}>
                            <div className={"serviceGrid"}>
                                {!users.length ? <div className={"emptyresponse"}><h1>Пользователи не найдены</h1></div> :
                                    <Row xs={1} sm={1} md={2} lg={2} className={"grid"}>
                                        {users.map((item, index) => {
                                            return (
                                                <Col key={index}>
                                                    <Card  className={"usercard"}>
                                                            <Card.Title className={"title"}>{item.user_name}</Card.Title>
                                                        <Card.Body>
                                                            {!item.is_seller ? <Card.Text  className={"bodytext"}> Является пользователем</Card.Text>:
                                                                <Card.Text  className={"bodytext"}> Является продавцом</Card.Text>}
                                                            <Button  className={"button"} onClick={(event) => {
                                                                dispatch(HomePageActionCreators.createAction_setLoadingStatus(true))
                                                                let sellerinfo = 0
                                                                if(item.is_seller === 0){
                                                                     sellerinfo = 1
                                                                }
                                                                else{
                                                                     sellerinfo = 0
                                                                }
                                                                const data_to_send = {
                                                                    "user_name": item.user_name,
                                                                    "is_seller": sellerinfo,
                                                                }
                                                                fetch(`http://localhost:8000/POSTusers/${item.pk}/`,{
                                                                    method: 'PUT',
                                                                    headers:{
                                                                        'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                                                                        'Content-Type':'application/json'
                                                                    },
                                                                    body: JSON.stringify(data_to_send)
                                                                }).then((response) =>{
                                                                    fetchpage()
                                                                    return response.json()
                                                                })
                                                                dispatch(HomePageActionCreators.createAction_setLoadingStatus(false))
                                                            }}>Изменить статус</Button>
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

export default ModUser;
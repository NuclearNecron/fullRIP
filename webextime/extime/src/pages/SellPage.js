import React, {useEffect, useState} from "react";
import '../styles/GamePage.css';
import DocumentTitle from 'react-document-title';
import {Button, Card, Col, Form, Row, Spinner} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import BasicBreadcrumbs from "../resourses/breadcrumbs";
import {fetchfulluserinfo} from "../store/midlewares/UserPageMiddlewares";
import * as UserPageActionCreators from "../store/actionCreators/UserPageActionCreators";





function SellerPage() {

    const userid = localStorage.getItem('userId')
    const [loadingStatus, setloadingStatus] = useState(true)
    const ServiceList = useSelector(state => {
        return state.cached_data.UserPage.userservices
    })
    const dispatch = useDispatch()

    const [newGameValue, setnewGameValue] = useState()
    const [updGameValue, setupdGameValue] = useState()
    const [updservValue, setupdservValue] = useState()
    const [newServiceName, setnewServiceName] = useState('')
    const [updServiceName, setupdServiceName] = useState('')
    const [newamount, setnewamount] = useState()
    const [updamount, setupdamount] = useState()
    const [newprice, setnewprice] = useState()
    const [updprice, setupdprice] = useState()
    const [newdesc, setnewdesc] = useState('')
    const [upddesc, setupddesc] = useState('')
    const [newtype, setnewtype] = useState()
    const [updtype, setupdtype] = useState()

    const [type, settype] = useState([])
    const [gamedata, setgamedata] = useState([])


    const fetchtype = async ()=>{
        return await fetch (`http://localhost:8000/POSTstype`).then(
            (response)=>{
                return response.json()})}

    const fetchgamedata = async ()=>{
        return await fetch (`http://localhost:8000/POSTgames`).then(
            (response)=>{
                return response.json()})}

    const fetchpage = async ()=> {
        setloadingStatus(true)
        const gamelist = await fetchgamedata()
        const stype = await fetchtype()
        settype(stype)
        setgamedata(gamelist)
        setloadingStatus(false)
    }


    useEffect(()=>{
        setloadingStatus(true)
        console.log(userid);
        console.log("trying to load page seller");
        fetchpage()
        dispatch(fetchfulluserinfo(userid))
        setloadingStatus(false)
    },[]);


    const Upload = async() =>{
        setloadingStatus(true)
        const data_to_send = {
            "game": newGameValue-0,
            "service_name": newServiceName,
            "user": userid-0,
            "amount": newamount-0,
            "price" : newprice-0,
            "description" : newdesc,
            "type": newtype-0,
        }
        await fetch(`http://localhost:8000/POSTservice/`,{
            method: 'POST',
            headers:{
                'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data_to_send)
        }).then((response) =>{
            return response.json()
        })
        dispatch(fetchfulluserinfo(userid))
        setloadingStatus(false)
    }

    const Update = async() =>{
        setloadingStatus(true)
        const data_to_send = {
            "game": updGameValue-0,
            "user": userid-0,
            "service_name": updServiceName,
            "amount": updamount-0,
            "price" : updprice-0,
            "description" : upddesc,
            "type": updtype-0,
        }
        await fetch(`http://localhost:8000/POSTservice/${updservValue}/`,{
            method: 'PUT',
            headers:{
                'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data_to_send)
        }).then((response) =>{
            return response.json()
        })
        dispatch(fetchfulluserinfo(userid))
        setloadingStatus(false)
    }


    return (

        <>
            <DocumentTitle title="Товары"/>

            <BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Стартовая страница'
                },
                {
                    ref: `/user/${userid}`,
                    text: 'Мои товары'
                }
            ]}/>

            <div className={`container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:
                    <>
                        <div className={"container"}>
                            <div className={"serviceGrid"}>
                                <div className={"uploadForm"}>
                                    <Form  className={"uploadForm"}>
                                        <label> Форма для загрузки </label>
                                        <div className ="mb-3">
                                            <select onChange={
                                                (event) => {console.log(event.target)
                                                    return setnewGameValue(event.target.value)
                                                }}>
                                                <option value="" >Игра</option>
                                                {gamedata.map((game, index)=>{
                                                    return <option key={index}
                                                                   value={JSON.stringify(game.pk)}>{game.game_name} </option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label>Название услуги</Form.Label>
                                            <input value={newServiceName} placeholder={''}
                                                   onChange={(event => setnewServiceName(event.target.value))}/>
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label>Количество</Form.Label>
                                            <input value={newamount} placeholder={-1}
                                                   onChange={(event => setnewamount(event.target.value))}/>
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label>Цена</Form.Label>
                                            <input value={newprice} placeholder={-1}
                                                   onChange={(event => setnewprice(event.target.value))}/>
                                        </div>
                                        <div className="mb-3">
                                            <Form.Label>Описание</Form.Label>
                                            <input value={newdesc} placeholder={""}
                                                   onChange={(event => setnewdesc(event.target.value))}/>
                                        </div>
                                        <div className="mb-3">
                                            <select onChange={
                                                (event) => {console.log(event.target)
                                                    return setnewtype(event.target.value)
                                                }}>
                                                <option value="" >Тип</option>
                                                {type.map((stype, index)=>{
                                                    return <option key={index}
                                                                   value={JSON.stringify(stype.pk)}>{stype.typename} </option>
                                                })}
                                            </select>
                                        </div>
                                        <button type="submit" onClick={(event)=>{
                                            Upload()
                                        }}>Добавить</button>
                                    </Form>
                                </div>
                                <div className={"updateForm"}>
                                    <Form className={"updateForm"}>
                                        <label> Форма для обновления </label>
                                        <div className="mb-3">
                                            <label className="form-label">Услуга</label>
                                            <input value={updservValue} placeholder={-1} disabled
                                                   onChange={(event => setupdservValue(event.target.value))}/>
                                        </div>
                                        <div className="mb-3">
                                            <select onChange={
                                                (event) => {console.log(event.target)
                                                    return setupdGameValue(event.target.value)
                                                }}>
                                                <option value="" >Игра</option>
                                                {gamedata.map((game, index)=>{
                                                    return <option key={index}
                                                                   value={JSON.stringify(game.pk)}>{game.game_name} </option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Название услуги</label>
                                            <input value={updServiceName} placeholder={''}
                                                   onChange={(event => setupdServiceName(event.target.value))}/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Количество</label>
                                            <input value={updamount} placeholder={-1}
                                                   onChange={(event => setupdamount(event.target.value))}/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Цена</label>
                                            <input value={updprice} placeholder={-1}
                                                   onChange={(event => setupdprice(event.target.value))}/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Описание</label>
                                            <input value={upddesc} placeholder={""}
                                                   onChange={(event => setupddesc(event.target.value))}/>
                                        </div>
                                        <div className="mb-3">
                                            <select onChange={
                                                (event) => {console.log(event.target)
                                                    return setupdtype(event.target.value)
                                                }}>
                                                <option value="" >Тип</option>
                                                {type.map((stype, index)=>{
                                                    return <option key={index}
                                                                   value={JSON.stringify(stype.pk)}>{stype.typename} </option>
                                                })}
                                            </select>
                                        </div>
                                        <button type="submit" onClick={(event) => {
                                            Update()
                                        }}>Изменить</button>
                                    </Form>
                                </div>
                                {!ServiceList.length ? <div className={"emptyresponse"}><h1>Услуг не найдено</h1></div> :
                                    <Row xs={1} sm={2} md={3} lg={3} className={"grid"}>
                                        {ServiceList.map((item, index) => {
                                            return (
                                                <Col key={index}>
                                                    <Card  className={"servicecard"}>
                                                        <Card.Body>
                                                            <Card.Title className={"title"}>{item.service_name}</Card.Title>
                                                            <Card.Text  className={"bodytext"}>{item.description}</Card.Text>
                                                            <Card.Text  className={"info"}>В наличии: {item.amount}.     Цена:{item.price} руб.   Тип услуги:{item.type.typename}</Card.Text>
                                                            <Button  className={"button"} onClick={(event) => {
                                                                setupdtype(item.type.pk)
                                                                setupdServiceName(item.service_name)
                                                                setupddesc(item.description)
                                                                setupdGameValue(item.game)
                                                                setupdamount(item.amount)
                                                                setupdprice(item.price)
                                                                setupdservValue(item.pk)
                                                            }}>Изменить</Button>
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

export default SellerPage;


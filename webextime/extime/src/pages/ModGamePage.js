import React, {useEffect, useState} from "react";
import '../styles/GamePage.css';
import DocumentTitle from 'react-document-title';
import {Button, Card, Col, Form, Row, Spinner} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import BasicBreadcrumbs from "../resourses/breadcrumbs";
import {fetchfulluserinfo} from "../store/midlewares/UserPageMiddlewares";
import * as UserPageActionCreators from "../store/actionCreators/UserPageActionCreators";
import {fetchfulllist} from "../store/midlewares/HomePageMiddlewares";
import * as HomePageActionCreators from "../store/actionCreators/HomePageActionCreators";
import {Link} from "react-router-dom";





function ModGame() {

    const userid = localStorage.getItem('userId')
    const [loadingStatus, setloadingStatus] = useState(true)
    const Gamelist = useSelector(state => state.cached_data.HomePage.gameList)
    const dispatch = useDispatch()

    const [newDevValue, setnewDevValue] = useState()
    const [updDevValue, setupdDevValue] = useState()
    const [updGameValue, setupdGameValue] = useState()
    const [newGameName, setnewGameName] = useState('')
    const [updGameName, setupdGameName] = useState('')
    const [devdata, setdevdata] = useState([])

    const fetchDevData = async ()=>{
        return await fetch (`http://localhost:8000/POSTdev`).then(
            (response)=>{
                return response.json()})}

    const fetchpage = async ()=> {
        setloadingStatus(true)
        const devlist = await fetchDevData()
        setdevdata(devlist)
        setloadingStatus(false)
    }


    useEffect(()=>{
        setloadingStatus(true)
        console.log(userid);
        console.log("trying to load page mod games");
        fetchpage()
        dispatch(fetchfulllist())
        setloadingStatus(false)
    },[]);


    const Upload = async() =>{
        setloadingStatus(true)
        const data_to_send = {
            "developer": newDevValue-0,
            "game_name": newGameName,
            "icon": ' ',
        }
        await fetch(`http://localhost:8000/POSTgames/`,{
            method: 'POST',
            headers:{
                'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data_to_send)
        }).then((response) =>{
            return response.json()
        })
        dispatch(fetchfulllist())
        setloadingStatus(false)
    }

    const Update = async() =>{
        setloadingStatus(true)
        const data_to_send = {
            "developer": updDevValue-0,
            "game_name": updGameName,
            "icon": ' ',
        }
        await fetch(`http://localhost:8000/POSTgames/${updGameValue}/`,{
            method: 'PUT',
            headers:{
                'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data_to_send)
        }).then((response) =>{
            return response.json()
        })
        dispatch(fetchfulllist())
        setloadingStatus(false)
    }


    return (

        <>
            <DocumentTitle title="Игры"/>

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
                    ref: `/mod/games`,
                    text: 'Игры'
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
                                        <div className="mb-3">
                                            <select onChange={
                                                (event) => {console.log(event.target)
                                                    return setnewDevValue(event.target.value)
                                                }}>
                                                <option value="" >Разработчик</option>
                                                {devdata.map((dev, index)=>{
                                                    return <option key={index}
                                                                   value={JSON.stringify(dev.pk)}>{dev.dev_name} </option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Название игры</label>
                                            <input value={newGameName} placeholder={''}
                                                   onChange={(event => setnewGameName(event.target.value))}/>
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
                                            <label className="form-label">Игра</label>
                                            <input value={updGameValue} placeholder={-1} disabled
                                                   onChange={(event => setupdGameValue(event.target.value))}/>
                                        </div>
                                        <div className="mb-3">
                                            <select onChange={
                                                (event) => {console.log(event.target)
                                                    return setupdDevValue(event.target.value)
                                                }}>
                                                <option value="" >Разработчик</option>
                                                {devdata.map((dev, index)=>{
                                                    return <option key={index}
                                                                   value={JSON.stringify(dev.pk)}>{dev.dev_name} </option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Название игры</label>
                                            <input value={updGameName} placeholder={''}
                                                   onChange={(event => setupdGameName(event.target.value))}/>
                                        </div>
                                        <button type="submit" onClick={(event) => {
                                            Update()
                                        }}>Изменить</button>
                                    </Form>
                                </div>
                                {!Gamelist.length ? <div className={"emptyresponse"}><h1>Услуг не найдено</h1></div> :
                                    <Row xs={1} sm={2} md={3} lg={3} className={"grid"}>
                                        {Gamelist.map((item, index) => {
                                            return (
                                                <Col key={index}>
                                                    <Card  className={"gamecard"}>
                                                        <Card.Img src={`http://127.0.0.1:8000/static/${item.icon}`}  alt="game icon" className={"gameicon"}></Card.Img>
                                                        <Card.Body>
                                                            <Card.Title className={"title"}>{item.game_name}</Card.Title>
                                                            <Link to={`../dev/${item.developer.pk}`}>
                                                                <Card.Subtitle className={"bodytext"}>{item.developer.dev_name}</Card.Subtitle>
                                                            </Link>
                                                            <Card.Text  className={"bodytext"}> Количество услуг: {item.total_services}</Card.Text>
                                                            <Button  className={"button"} onClick={(event) => {
                                                                setupdGameName(item.game_name)
                                                                setupdDevValue(item.developer.pk)
                                                                setupdGameValue(item.pk)
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

export default ModGame;




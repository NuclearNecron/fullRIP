import React, {useEffect, useState} from "react";
import '../styles/GamePage.css';
import DocumentTitle from 'react-document-title';
import {Col, Row, Spinner} from 'react-bootstrap';
import {useParams} from "react-router"
import ServiceCard from "../resourses/ServiceCard";
import NGamecard from "../resourses/newgamecard";
import * as GamePageActionCreators from "../store/actionCreators/GamePageActionCreators"
import { useSelector, useDispatch } from 'react-redux';
import BasicBreadcrumbs from "../resourses/breadcrumbs";
import ServiceFilters from "../resourses/ServiceFilters";
import {fetchfulllist, fetchallservices} from "../store/midlewares/GamePageMiddlewares";



function GamePage() {
    const {gameid} = useParams();
    const textFieldValue = useSelector(state => state.ui.GamePage.textFieldValue)
    const loadingStatus = useSelector(state => state.ui.GamePage.loadingStatus)
    const Game = useSelector(state => state.cached_data.GamePage.game)
    const ServiceList = useSelector(state => state.cached_data.GamePage.gameservices)
    const ServiceValue = useSelector(state => state.cached_data.GamePage.serviceprices)
    const SliderValue = useSelector(state => state.ui.GamePage.sliderValue)
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log("trying to load page game");
        dispatch(fetchfulllist(gameid))
    },[]);

    useEffect(() => {
        if (loadingStatus === false) {
            if (SliderValue[1] === 0) {
                dispatch(GamePageActionCreators.createAction_setSliderValue(ServiceValue))
            }
            dispatch(GamePageActionCreators.createAction_setTextFieldValue(textFieldValue))
        }
    }, [loadingStatus])



return (
        <>
            <DocumentTitle title={Game.game_name}/>

            <BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Стартовая страница'
                },
                {
                    ref: `/game/${gameid}`,
                    text: 'Страница игры'
                }
            ]}/>
            <div className={`main-container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:

                    <>

                        {ServiceValue[1] === 0 ? <></>:
                            <ServiceFilters loading={loadingStatus} text_field_label={"Название услуги"}
                                                   button_title={"Найти"} max={ServiceValue[1]} min={ServiceValue[0]}
                                                   slider_value={SliderValue}
                                                   slider_on_change={event => {
                                                       dispatch(GamePageActionCreators.createAction_setSliderValue(event.target.value))
                                                   }}
                                                   text_field_value={textFieldValue}
                                                   text_field_on_change={event => {
                                                       dispatch(GamePageActionCreators.createAction_setTextFieldValue(event.target.value))
                                                   }}
                                                   button_on_click={() => {
                                                       dispatch(fetchallservices(gameid,{
                                                           name: textFieldValue,
                                                           min: SliderValue[0],
                                                           max: SliderValue[1]
                                                       }))
                                                   }}
                                                   slider_marks={[
                                                       {
                                                           value: ServiceValue[0],
                                                           label: `${ServiceValue[0]} ₽`
                                                       },
                                                       {
                                                           value: ServiceValue[1],
                                                           label: `${ServiceValue[1]} ₽`
                                                       }
                                                   ]}
                            />
                        }
                        <div className={"container"}>
                            {!Game.pk ? <div className={"emptyresponse"}><h1>Игра не найдена</h1></div>:
                                <>
                                    <NGamecard {...Game}/>
                                    <div className={"serviceGrid"}>
                                        {!ServiceList.length ? <div className={"emptyresponse"}><h1>В данный момент услуг нет</h1></div> :
                                            <Row xs={1} sm={1} md={2} lg={2} className={"grid"}>
                                                {ServiceList.map((item, index) => {
                                                    return (
                                                        <Col key={index}>
                                                            <ServiceCard {...item}/>
                                                        </Col>
                                                    )
                                                })}
                                            </Row>}
                                    </div>
                                </>}
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default GamePage;
import React, {useEffect, useState} from "react";
import '../styles/Devpage.css';
import DocumentTitle from 'react-document-title';
import {Col, Row, Spinner} from 'react-bootstrap';
import {useParams} from "react-router"
import Devcard from "../resourses/devcard";
import GamedevCard from "../resourses/GamedevCard";
import { useSelector, useDispatch } from 'react-redux';
import BasicBreadcrumbs from "../resourses/breadcrumbs";
import {fetchfulldevinfo} from "../store/midlewares/DevPageMiddlewares";




function DevPage() {

    const {devid} = useParams();
    const loadingStatus = useSelector(state => state.ui.DevPage.loadingStatus)
    const Dev = useSelector(state => {
        return state.cached_data.DevPage.dev
    })
    const Gamelist = useSelector(state => state.cached_data.DevPage.devGames)
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log("trying to load page dev");
        dispatch(fetchfulldevinfo(devid))
    },[]);




    return (

        <>
            <DocumentTitle title={Dev.dev_name}/>

            <BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Стартовая страница'
                },
                {
                    ref: `/dev/${devid}`,
                    text: 'Страница разработчика'
                }
            ]}/>

            <div className={`container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:
                    <>
                        <div className={"container"}>
                            {!Dev.pk ? <div className={"emptyresponse"}><h1>Разработчик не найден</h1></div>:
                                <>
                                    <Devcard {...Dev}/>
                                    <div className={"gameGrid"}>
                                        {!Gamelist.length ? <div className={"emptyresponse"}><h1>Игр не найдено</h1></div> :
                                            <Row xs={1} sm={2} md={3} lg={3} className={"grid"}>
                                                {Gamelist.map((item, index) => {
                                                    return (
                                                        <Col key={index}>
                                                            <GamedevCard {...item}/>
                                                        </Col>
                                                    )
                                                })}
                                            </Row>}
                                    </div>
                                </>
                            }

                        </div>
                    </>

                }
            </div>
        </>
    );
}

export default DevPage;
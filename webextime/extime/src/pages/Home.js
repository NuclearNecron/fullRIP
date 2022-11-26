import React, {useEffect} from "react";
import '../styles/Home.css';
import DocumentTitle from 'react-document-title'
import {Col,Row, Spinner} from 'react-bootstrap'
import Gamecard from "../resourses/gamecard";
import {fetchfulllist, fetchallGames}from "../store/midlewares/HomePageMiddlewares"
import * as HomePageActionCreators from "../store/actionCreators/HomePageActionCreators"
import { useSelector, useDispatch } from 'react-redux';
import BasicBreadcrumbs from "../resourses/breadcrumbs";
import GameFilter from "../resourses/Gamefilters";


function HomeGames() {

    const textFieldValue = useSelector(state => {
        return state.ui.HomePage.textFieldValue
    })
    const loadingStatus = useSelector(state => state.ui.HomePage.loadingStatus)
    const Gamelist = useSelector(state => state.cached_data.HomePage.gameList)
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log("trying to load page home");
        dispatch(fetchfulllist())
    },[]);

    useEffect(() => {
        if (loadingStatus === false) {
            dispatch(HomePageActionCreators.createAction_setTextFieldValue(textFieldValue))
        }
    }, [loadingStatus])




    return (
        <>
            <DocumentTitle title={"ExTime"}/>

            <BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Стартовая страница'
                }
            ]}/>

            <div className={"listhead"}> Список доступных игр</div>
            <div className={`container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:
                    <>
                        <GameFilter loading={loadingStatus} text_field_label={"Название игры"} button_title={"Поиск"}
                                    text_field_value={textFieldValue}
                                    text_field_on_change={event => {
                                    dispatch(HomePageActionCreators.createAction_setTextFieldValue(event.target.value))}}
                                    button_on_click={()=>{
                                    dispatch(fetchallGames({
                                    name:textFieldValue}))
                                    }}
                                    />


                        <div className={"container"}>
                            {!Gamelist.length ? <div className={"emptyresponse"}><h1>Игр не найдено</h1></div> :
                                <Row xs={1} sm={2} md={3} lg={4} className={"grid"}>
                                    {Gamelist.map((item, index) => {
                                        return (
                                            <Col key={index}>
                                                <Gamecard {...item}/>
                                            </Col>
                                        )
                                    })}
                                </Row>}
                        </div>
                    </>

                }
            </div>
        </>
    );
}

export default HomeGames;





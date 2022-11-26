import React, {useEffect} from "react";
import '../styles/ServicePage.css';
import DocumentTitle from 'react-document-title';
import {Button, Col,  Image,  Row, Spinner} from 'react-bootstrap';
import {useParams} from "react-router"
import UserCard from "../resourses/UserCard";
import { useSelector, useDispatch } from 'react-redux';
import BasicBreadcrumbs from "../resourses/breadcrumbs";
import {fetchfullserviceinfo, fetchreviews} from "../store/midlewares/ServicePageMiddlewares";




function ServicePage() {
    const {gameid, serviceid} = useParams();

    const loadingStatus = useSelector(state => state.ui.ServicePage.loadingStatus)
    const Service = useSelector(state => {
        return state.cached_data.ServicePage.Service
    })
    const Pics = useSelector(state => state.cached_data.ServicePage.screensshots)
    const Reviews = useSelector(state => state.cached_data.ServicePage.reviews)
    const dispatch = useDispatch()



    useEffect(()=>{
        console.log("trying to load page service");
        dispatch(fetchfullserviceinfo(gameid,serviceid))
    },[]);

    return (

        <>
            <DocumentTitle title={Service.service_name}/>

            <BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Стартовая страница'
                },
                {
                    ref: `/game/${gameid}`,
                    text: 'Страница игры'
                },
                {
                    ref: `/game/${serviceid}`,
                    text: 'Страница услуги'
                }
            ]}/>

            <div className={`container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:
                    <>
                        <div className={"container"}>
                            {!Service.pk ? <div className={"emptyresponse"}><h1>Услуга не найдена</h1></div>:
                                <div className={"fullservice"}>
                                    <div className={"servicetext"}>
                                        <div className={"header"}>{Service.service_name}</div>
                                        <div className={"type"}>Тип услуги - {Service.type.typename}</div>
                                        <div className={"description"}>{Service.description}</div>
                                        <div className={"amount"}>В наличии: {Service.amount}</div>
                                        <div className={"price"}>Стоимость: {Service.price} руб.</div>
                                        {Service.amount <= 0 ? <Button className={"button"} disabled>Добавить к покупкам</Button>:
                                            <Button className={"button"} >Добавить к покупкам</Button>}
                                    </div>
                                    <div className={"seller"}>
                                        <UserCard {...Service.user}/>
                                    </div>
                                    <div className={"picsGrid"}>
                                        {!Pics.length ? <div className={"emptyresponse"}><h1>Изображений нет</h1></div> :
                                            <Row xs={1} sm={2} md={3} lg={3} className={"grid"}>
                                                {Pics.map((item, index) => {
                                                    return (
                                                        <Col key={index}>
                                                            <Image src={`http://127.0.0.1:8000/static/${index.pic_name}`} className={"picture"}/>
                                                        </Col>
                                                    )
                                                })}
                                            </Row>}
                                    </div>
                                    <Button className={"showreviews"} disabled>Показать отзывы</Button>
                                </div>}
                        </div>
                    </>

                }
            </div>
        </>
    );
}


export default ServicePage;
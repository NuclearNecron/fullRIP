import React, {useEffect, useState} from "react";
import '../styles/ServicePage.css';
import DocumentTitle from 'react-document-title';
import {Button, Col, Image, Row, Spinner} from 'react-bootstrap';
import {useParams} from "react-router"
import {getServicesbyID, getPicsbyService} from "../resourses/data";
import UserCard from "../resourses/UserCard";




function ServicePage() {
    const {gameid, serviceid} = useParams();
    const [service, setservice] = useState([]);
    const [pics, setpics] = useState([]);
    const [loading, setLoading] = useState(true);


    const getData = async ()=>{
        await setservice(await getServicesbyID(serviceid,gameid));
        await setpics(await getPicsbyService(serviceid,gameid));
        await setLoading(false);
    }

    useEffect(() => {
        console.log("trying to load page certain service");
        getData();
    },[]);

    return (
        <>
            <DocumentTitle title={service.service_name}/>
            <div className={`container ${loading && 'containerLoading'}`}>
                {loading ? <div className={"loadingBg"}><Spinner animation="border"/></div> :
                    <div className={"container"}>
                        {!service.pk ? <div className={"emptyresponse"}><h1>Услуга не найдена</h1></div>:
                            <div className={"fullservice"}>
                                <div className={"servicetext"}>
                                    <div className={"header"}>{service.service_name}</div>
                                    <div className={"type"}>Тип услуги - {service.type.typename}</div>
                                    <div className={"description"}>{service.description}</div>
                                    <div className={"amount"}>В наличии: {service.amount}</div>
                                    <div className={"price"}>Стоимость: {service.price} руб.</div>
                                    {service.amount <= 0 ? <Button className={"button"} disabled>Добавить к покупкам</Button>:
                                        <Button className={"button"} >Добавить к покупкам</Button>}
                                </div>
                                <div className={"seller"}>
                                    <UserCard {...service.user}/>
                                </div>
                                <div className={"picsGrid"}>
                                    {!pics.length ? <div className={"emptyresponse"}><h1>Изображений нет</h1></div> :
                                        <Row xs={1} sm={2} md={3} lg={3} className={"grid"}>
                                            {pics.map((item, index) => {
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
                }
            </div>
        </>
    );
}

export default ServicePage;
import React, {useEffect} from "react";
import '../styles/ServicePage.css';
import DocumentTitle from 'react-document-title';
import {Button, Col,  Image,  Row, Spinner} from 'react-bootstrap';
import {useParams} from "react-router"
import UserCard from "../resourses/UserCard";
import { useSelector, useDispatch } from 'react-redux';
import BasicBreadcrumbs from "../resourses/breadcrumbs";
import {fetchfullserviceinfo, fetchreviews} from "../store/midlewares/ServicePageMiddlewares";
import {getCartItem} from "../resourses/data";




function ServicePage() {
    const {gameid, serviceid} = useParams();

    const loadingStatus = useSelector(state => state.ui.ServicePage.loadingStatus)
    const Service = useSelector(state => {
        return state.cached_data.ServicePage.Service
    })
    const Pics = useSelector(state => state.cached_data.ServicePage.screenshots)
    const Reviews = useSelector(state => state.cached_data.ServicePage.reviews)
    const dispatch = useDispatch()
    const CartAdd = async(service_id) =>{
        const userid = localStorage.getItem('userId')
        const cartitem = await getCartItem(userid,service_id)
        if (cartitem.length==0){
            const data_to_send = {
                "user": userid-0,
                "service": service_id-0,
                "amount": 1
            }
            await fetch(`http://localhost:8000/POSTcart/`,{
                method: 'POST',
                headers:{
                    'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data_to_send)
            }).then((response) => {
                console.log(response)
                console.log(data_to_send)
            })
                .catch((reason) => {
                    console.log(reason)
                    console.log(data_to_send)
                })
        }
        else{
            const key = cartitem[0].id
            const data_to_send = {
                "user": userid-0,
                "service": service_id-0,
                "amount": cartitem[0].amount+1
            }
            await fetch(`http://localhost:8000/POSTcart/${key}/`,{
                method: 'PUT',
                headers:{
                    'Authorization':` Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data_to_send)
            }).then((response) => {
                console.log(response)
                console.log(data_to_send)
            })
                .catch((reason) => {
                    console.log(reason)
                    console.log(data_to_send)
                })
        }
        dispatch(fetchfullserviceinfo(gameid,serviceid))
    }



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
                                            <Button className={"button"} onClick={(event=>{
                                                CartAdd(serviceid)
                                            })}>Добавить к покупкам</Button>}
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
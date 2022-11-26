import React, {useEffect} from "react";
import '../styles/GamePage.css';
import DocumentTitle from 'react-document-title';
import {Col,Row, Spinner} from 'react-bootstrap';
import {useParams} from "react-router"
import ServiceCard from "../resourses/ServiceCard";
import UserCard from "../resourses/UserCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchfulluserinfo} from "../store/midlewares/UserPageMiddlewares";
import BasicBreadcrumbs from "../resourses/breadcrumbs";





function UserPage() {

    const {userid} = useParams();
    const loadingStatus = useSelector(state => state.ui.DevPage.loadingStatus)
    const User = useSelector(state => {
        return state.cached_data.UserPage.user
    })
    const ServiceList = useSelector(state => state.cached_data.UserPage.userservices)
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log("trying to load page user");
        dispatch(fetchfulluserinfo(userid))
    },[]);


    return (

        <>
            <DocumentTitle title={User.user_name}/>

            <BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Стартовая страница'
                },
                {
                    ref: `/user/${userid}`,
                    text: 'Страница пользователя'
                }
            ]}/>

            <div className={`container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:
                    <>
                        <div className={"container"}>
                            {!User.pk ? <div className={"emptyresponse"}><h1>Пользователь не найден</h1></div>:
                                <>
                                    <UserCard {...User}/>
                                    <div className={"gameGrid"}>
                                        {!ServiceList.length ? <div className={"emptyresponse"}><h1>Услуг не найдено</h1></div> :
                                            <Row xs={1} sm={2} md={3} lg={3} className={"grid"}>
                                                {ServiceList.map((item, index) => {
                                                    return (
                                                        <Col key={index}>
                                                            <ServiceCard {...item}/>
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

export default UserPage;
import React from "react";
import '../styles/GamePage.css';
import DocumentTitle from 'react-document-title';
import {Button, Card, Col, Row, Spinner} from 'react-bootstrap';
import BasicBreadcrumbs from "../resourses/breadcrumbs";
import {Link} from "react-router-dom";





function ModPage() {

    return (

        <>
            <DocumentTitle title="Модерация"/>

            <BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Стартовая страница'
                },
                {
                    ref: `/mod`,
                    text: 'Страница модератора'
                }
            ]}/>

            <Link to={`../mod/games/`}>
                <Button  className={"button"}>Игры</Button>
            </Link>
            <Link to={`../mod/users/`}>
                <Button  className={"button"}>Пользователи</Button>
            </Link>
            <Link to={`../mod/orders/`}>
                <Button  className={"button"}>Заказы</Button>
            </Link>
        </>
    );
}

export default ModPage;

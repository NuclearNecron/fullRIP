import {Button, Card} from "react-bootstrap";
import React from "react";
import '../styles/ServiceCard.css';
import {Link} from "react-router-dom";



const ServiceCard = (service) => {


    return <Card  className={"servicecard"}>
        <Card.Body>
            <Card.Title className={"title"}>{service.service_name}</Card.Title>
            <Card.Text  className={"bodytext"}>{service.description}</Card.Text>
            <Link to={`../users/${service.user.pk}`}>
            <Card.Text  className={"seller"}>Продавец: {service.user.user_name}</Card.Text>
            </Link>
            <Card.Text  className={"info"}>В наличии: {service.amount}.     Цена:{service.price} руб.   Тип услуги:{service.type.typename}</Card.Text>
            <Link to={`../game/${service.game}/service/${service.pk}`}>
                <Button  className={"button"}>Перейти</Button>
            </Link>
        </Card.Body>
    </Card>
}

export default ServiceCard;
import {Card} from "react-bootstrap";
import React from "react";
import '../styles/UserCard.css';

const UserCard = (user) => {
    return <Card  className={"usercard"}>
        <Card.Img src={`http://127.0.0.1:8000/static/${user.icon}`}  alt="user icon" className={"usericon"}/>
        <Card.Body>
            <Card.Title className={"title"}>{user.user_name}</Card.Title>
        </Card.Body>
    </Card>
}

export default UserCard;
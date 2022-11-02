import {Card} from "react-bootstrap";
import React from "react";
import '../styles/Devcard.css';

const Devcard = (dev) => {
    return <Card  className={"devcard"}>
        <Card.Img src={`http://127.0.0.1:8000/static/${dev.icon}`}  alt="dev icon" className={"devicon"}></Card.Img>
        <Card.Body>
            <Card.Title className={"title"}>{dev.dev_name}</Card.Title>
            <Card.Text  className={"bodytext"}>{dev.description}</Card.Text>
        </Card.Body>
    </Card>
}

export default Devcard;
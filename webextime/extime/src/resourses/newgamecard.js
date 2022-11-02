import {Button, Card} from "react-bootstrap";
import React from "react";
import '../styles/NGameCard.css';
import {Link} from "react-router-dom";

const NGamecard = (game) => {
    return <Card  className={"gamecard"}>
        <Link to={`/game/${game.pk}`}>
            <Card.Img src={`http://127.0.0.1:8000/static/${game.icon}`}  alt="game icon" className={"gameicon"}></Card.Img>
        </Link>
        <Card.Body>
            <Card.Title className={"title"}>{game.game_name}</Card.Title>
            <Link to={`../dev/${game.developer.pk}`}>
                <Card.Subtitle className={"bodytext"}>{game.developer.dev_name}</Card.Subtitle>
            </Link>
            <Card.Text  className={"bodytext"}> Количество услуг: {game.total_services}</Card.Text>
        </Card.Body>
    </Card>
}

export default NGamecard;
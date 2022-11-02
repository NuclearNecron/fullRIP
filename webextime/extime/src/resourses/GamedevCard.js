import {Button, Card} from "react-bootstrap";
import React from "react";
import '../styles/gamecard.css';
import {Link} from "react-router-dom";

const Gamedevcard = (game) => {
    return <Card  className={"gamecard"}>
        <Link to={`/game/${game.pk}`}>
            <Card.Img src={`http://127.0.0.1:8000/static/${game.icon}`}  alt="game icon" className={"gameicon"}></Card.Img>
        </Link>
        <Card.Body>
            <Card.Title className={"title"}>{game.game_name}</Card.Title>
            <Card.Text  className={"bodytext"}> Количество услуг: {game.total_services}</Card.Text>
            <Link to={`/game/${game.pk}`}>
                <Button  className={"button"}>Перейти</Button>
            </Link>
        </Card.Body>
    </Card>
}

export default Gamedevcard;
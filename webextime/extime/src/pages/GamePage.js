import React, {useEffect, useState} from "react";
import '../styles/GamePage.css';
import DocumentTitle from 'react-document-title';
import {Col,Row, Spinner} from 'react-bootstrap';
import {useParams} from "react-router"
import {getGamebyID, getServicesbyGame} from "../resourses/data";
import ServiceCard from "../resourses/ServiceCard";
import NGamecard from "../resourses/newgamecard";




function GamePage() {
    const {gameid} = useParams();
    const [game, setgame] = useState([]);
    const [service, setservice] = useState([]);
    const [loading, setLoading] = useState(true);


    const getData = async ()=>{
        await setservice(await getServicesbyGame(gameid));
        await setgame(await getGamebyID(gameid));
        await setLoading(false);
    }

    useEffect(() => {
        console.log("trying to load page certain game");
        getData();
    },[]);

    return (
        <>
            <DocumentTitle title={game.game_name}/>
            <div className={`container ${loading && 'containerLoading'}`}>
                {loading ? <div className={"loadingBg"}><Spinner animation="border"/></div> :
                    <div className={"container"}>
                        {!game.pk ? <div className={"emptyresponse"}><h1>Игра не найдена</h1></div>:
                            <>
                                <NGamecard {...game}/>
                                <div className={"serviceGrid"}>
                                    {!service.length ? <div className={"emptyresponse"}><h1>В данный момент услуг нет</h1></div> :
                                        <Row xs={1} sm={1} md={2} lg={2} className={"grid"}>
                                            {service.map((item, index) => {
                                                return (
                                                    <Col key={index}>
                                                        <ServiceCard {...item}/>
                                                    </Col>
                                                )
                                            })}
                                        </Row>}
                                </div>
                            </>}
                    </div>
                }
            </div>
        </>
    );
}

export default GamePage;
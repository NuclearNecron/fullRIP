import React, {useEffect, useState} from "react";
import '../styles/Devpage.css';
import DocumentTitle from 'react-document-title';
import {Col,Row, Spinner} from 'react-bootstrap';
import {useParams} from "react-router"
import {getDevbyID, getGamebyDev} from "../resourses/data";
import Devcard from "../resourses/devcard";
import GamedevCard from "../resourses/GamedevCard";



function DevPage() {
    const {devid} = useParams();
    const [game, setgame] = useState([]);
    const [dev, setdev] = useState([]);
    const [loading, setLoading] = useState(true);


    const getData = async ()=>{
        await setdev(await getDevbyID(devid));
        await setgame(await getGamebyDev(devid));
        await setLoading(false);
    }

    useEffect(() => {
        console.log("trying to load page dev");
        getData();
        console.log(dev);
        console.log(game);
    },[]);

    return (

        <>
            <DocumentTitle title={dev.dev_name}/>
            <div className={`maincontainer ${loading && 'containerLoading'}`}>
                {loading ? <div className={"loadingBg"}><Spinner animation="border"/></div> :
                    <div className={"container"}>
                        {!dev.pk ? <div className={"emptyresponse"}><h1>Разработчик не найден</h1></div>:
                            <>
                                <Devcard {...dev}/>
                                <div className={"gameGrid"}>
                                    {!game.length ? <div className={"emptyresponse"}><h1>Игр не найдено</h1></div> :
                                        <Row xs={1} sm={2} md={3} lg={3} className={"grid"}>
                                            {game.map((item, index) => {
                                                return (
                                                    <Col key={index}>
                                                        <GamedevCard {...item}/>
                                                    </Col>
                                                )
                                            })}
                                        </Row>}
                                </div>
                            </>
                        }

                    </div>
                }
            </div>
        </>
    );
}

export default DevPage;
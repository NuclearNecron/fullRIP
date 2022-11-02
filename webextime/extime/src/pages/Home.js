import React, {useEffect, useState} from "react";
import {  Link } from "react-router-dom";
import '../styles/Home.css';
import DocumentTitle from 'react-document-title'
import {Col,Row, Spinner} from 'react-bootstrap'
import {getAllGames, getAllGamesFilter} from "../resourses/data";
import Gamecard from "../resourses/gamecard";
import InputField from "../resourses/InputField";


function HomeGames() {

    const [search_value, setsearch_value] = useState('');

    const [loading, setLoading] = useState(true);

    const [game, setgame] = useState([]);

    const handleSearch = async () => {
        await setLoading(true);
        if (search_value === '') {
            await setgame(await getAllGames());
            await setLoading(false);
        } else {
            await setgame(await getAllGamesFilter(search_value));
            await setLoading(false);
        }

    }

    useEffect(() => {
        console.log("trying to load page");
        handleSearch();
        console.log(game)
    },[]);

    return (
        <>
            <DocumentTitle title={"ExTime"}/>

            <div className={"listhead"}> Список доступных игр</div>
            <div className={`container ${loading && 'containerLoading'}`}>
                <InputField value={search_value} setValue={setsearch_value} placeholder={"Введите имя игры"}
                            loading={loading} onSubmit={handleSearch} buttonTitle="Найти"/>
                {loading ? <div className={"loadingBg"}><Spinner animation="border"/></div> :
                    <div className={"container"}>
                        {!game.length ? <div className={"emptyresponse"}><h1>Игр не найдено</h1></div> :
                            <Row xs={1} sm={2} md={3} lg={4} className={"grid"}>
                                {game.map((item, index) => {
                                    return (
                                        <Col key={index}>
                                            <Gamecard {...item}/>
                                        </Col>
                                    )
                                })}
                            </Row>}
                    </div>
                }
            </div>
        </>
    );
}

export default HomeGames;





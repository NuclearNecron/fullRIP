import React, {useEffect, useState} from "react";
import '../styles/GamePage.css';
import DocumentTitle from 'react-document-title';
import {Col,Row, Spinner} from 'react-bootstrap';
import {useParams} from "react-router"
import {getGamebyID, getServicesbyGame} from "../resourses/data";
import ServiceCard from "../resourses/ServiceCard";
import UserCard from "../resourses/UserCard";




function UserPage() {
    const {userid} = useParams();
    const [user, setuser] = useState([]);
    const [service, setservice] = useState([]);
    const [loading, setLoading] = useState(true);


    const getData = async ()=>{
        await setLoading(false);
    }

    useEffect(() => {
        console.log("trying to load page certain game");
        getData();
    },[]);

    return (
        <>
            <DocumentTitle title={"userpage"}/>
            <div> Page under development</div>
        </>
    );
}

export default UserPage;
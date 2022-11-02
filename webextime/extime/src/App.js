import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import './styles/App.css';
import DocumentTitle from 'react-document-title'
import HomeGames from "./pages/Home";
import DevPage from "./pages/Devpage";
import GamePage from "./pages/GamePage";
import {Routes} from "react-router";
import ServicePage from "./pages/ServicePage";
import UserPage from "./pages/UserPage";


function App() {
  return (
      <DocumentTitle title = 'Extime'>
      <BrowserRouter basename="/" >
          <div>
              <div className={"mainpage"}>
                  <Link to="../">Extime</Link>
              </div>
              <Routes>
                  <Route path ="/" element={<HomeGames/>}/>
                  <Route path = "dev/:devid" element={<DevPage/>}/>
                  <Route path ="game/:gameid" element={<GamePage/>}/>
                  <Route path ="game/:gameid/service/:serviceid" element={<ServicePage/>}/>
                  <Route exact path ="/users/:userid/" element = {<UserPage/>}/>
              </Routes>
          </div>
      </BrowserRouter>
      </DocumentTitle>
  );
}

export default App;

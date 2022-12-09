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
import AppBar1 from "./resourses/appbar";
import AuthPage from "./pages/AuthPage";
import RegPage from "./pages/RegPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import SellerPage from "./pages/SellPage";
import ModPage from "./pages/ModPage";
import ModGame from "./pages/ModGamePage";
import ModUser from "./pages/ModUserPage";
import ModOrder from "./pages/ModOrderPage";


function App() {
  return (
      <DocumentTitle title = 'Extime'>
      <BrowserRouter basename="/" >
          <div>
              <div className={"mainpage"}>
                  <AppBar1/>
              </div>
              <Routes>
                  <Route path ="/" element={<HomeGames/>}/>
                  <Route path ="/auth" element={<AuthPage/>}/>
                  <Route path ="/reg" element={<RegPage/>}/>
                  <Route path = "dev/:devid" element={<DevPage/>}/>
                  <Route path ="game/:gameid" element={<GamePage/>}/>
                  <Route path ="game/:gameid/service/:serviceid" element={<ServicePage/>}/>
                  <Route path ="/users/:userid/" element = {<UserPage/>}/>
                  <Route path ="/cart" element={<CartPage/>}/>
                  <Route path ="/purchases" element={<OrderPage/>}/>
                  <Route path ="/sells" element={<SellerPage/>}/>
                  <Route path ="/mod" element={<ModPage/>}/>
                  <Route path ="/mod/games/" element={<ModGame/>}/>
                  <Route path ="/mod/users/" element={<ModUser/>}/>
                  <Route path ="/mod/orders/" element={<ModOrder/>}/>
              </Routes>
          </div>
      </BrowserRouter>
      </DocumentTitle>
  );
}

export default App;

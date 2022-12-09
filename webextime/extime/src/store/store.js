import {configureStore} from "@reduxjs/toolkit";
import * as HomePageMiddlewares from "./midlewares/HomePageMiddlewares"
import * as DevPageMiddlewares from "./midlewares/DevPageMiddlewares"
import * as UserPageMiddlewares from "./midlewares/UserPageMiddlewares"
import * as GamePageMiddlewares from "./midlewares/GamePageMiddlewares"
import * as ServicePageMiddlewares from "./midlewares/ServicePageMiddlewares"
import * as CartPaggeMiddlewares from "./midlewares/CartPaggeMiddlewares"
import * as OrderPageMiddlewares from "./midlewares/OrderPageMiddlewares"
import rootReducer from "./reducers/RootReducer";

const myMiddlewares=[
    HomePageMiddlewares.fetchallGames,
    HomePageMiddlewares.fetchfulllist,
    DevPageMiddlewares.fetchfulldevinfo,
    UserPageMiddlewares.fetchfulluserinfo,
    GamePageMiddlewares.fetchallservices,
    GamePageMiddlewares.fetchfulllist,
    ServicePageMiddlewares.fetchfullserviceinfo,
    ServicePageMiddlewares.fetchreviews,
    CartPaggeMiddlewares.fetchcartinfo,
    OrderPageMiddlewares.fetchorderinfo,
    OrderPageMiddlewares.fetchorders,
    OrderPageMiddlewares.fetchallorders
]

const store = configureStore({
    reducer : rootReducer,
    myMiddlewares
})

export default store
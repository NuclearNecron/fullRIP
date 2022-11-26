import {configureStore} from "@reduxjs/toolkit";
import * as HomePageMiddlewares from "./midlewares/HomePageMiddlewares"
import * as DevPageMiddlewares from "./midlewares/DevPageMiddlewares"
import * as UserPageMiddlewares from "./midlewares/UserPageMiddlewares"
import * as GamePageMiddlewares from "./midlewares/GamePageMiddlewares"
import * as ServicePageMiddlewares from "./midlewares/ServicePageMiddlewares"
import rootReducer from "./reducers/RootReducer";

const myMiddlewares=[
    HomePageMiddlewares.fetchallGames,
    HomePageMiddlewares.fetchfulllist,
    DevPageMiddlewares.fetchfulldevinfo,
    UserPageMiddlewares.fetchfulluserinfo,
    GamePageMiddlewares.fetchallservices,
    GamePageMiddlewares.fetchfulllist,
    ServicePageMiddlewares.fetchfullserviceinfo,
    ServicePageMiddlewares.fetchreviews
]

const store = configureStore({
    reducer : rootReducer,
    myMiddlewares
})

export default store
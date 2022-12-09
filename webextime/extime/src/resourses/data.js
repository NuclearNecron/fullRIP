export const getAllGames = async() => {
    return await fetch ('http://localhost:8000/games').then(
        (response)=>{
        return response.json();
    }).catch(()=>{
        return{
            resultCount:0,
            results:[]
        }
        }
    );
}

export const getAllTypes = async() => {
    return await fetch ('http://localhost:8000/stype').then(
        (response)=>{
            return response.json();
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getGamebyID = async(id=-1) => {
    return await fetch (`http://localhost:8000/games/${id}/`).then(
        async (response)=>{
            return await response.json();
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getDevbyID = async(id=-1) => {
    return await fetch (`http://localhost:8000/dev/${id}/`).then(
        async (response)=>{
            return await response.json();
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getGamebyDev = async(id=-1) => {
    return await fetch (`http://localhost:8000/dev/${id}/games`).then(
        async (response)=>{
            return await response.json();
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getUserbyID = async(id=-1) => {
    return await fetch (`http://localhost:8000/users/${id}/`).then(
        async (response)=>{
            return await response.json();
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getServicesbyGame = async(id=-1) => {
    return await fetch (`http://localhost:8000/games/${id}/services`).then(
        async (response)=>{
            return await response.json();
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getServicesbyUser = async(id=-1) => {
    return await fetch (`http://localhost:8000/users/${id}/services`).then(
        async (response)=>{
            return await response.json();
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getServicesbyID = async(servieid=-1, gameid=-1) => {
    return await fetch (`http://localhost:8000/games/${gameid}/services/${servieid}/`).then(
        async (response)=>{
            return await response.json();
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getReviewsbyService = async(servieid=-1, gameid=-1) => {
    return await fetch (`http://localhost:8000/games/${gameid}/services/${servieid}/reviews`).then(
        (response)=>{
            return response.json();
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getPicsbyService = async(servieid=-1, gameid=-1) => {
    return await fetch (`http://localhost:8000/games/${gameid}/services/${servieid}/picture`).then(
        (response)=>{
            return response.json();
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}



export const getAllGamesFilter = async(search_value) => {
    return await fetch (`http://localhost:8000/games/?name=${search_value}`).then(
        async (response)=>{
            return await (await response.json());
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getServicesbyGameFilter = async(id=-1,search_value,min_cost,  max_cost) => {
    console.log(`http://localhost:8000/games/${id}/services/?name=${search_value}&min_cost=${min_cost}&max_cost=${max_cost}`)
    return await fetch (`http://localhost:8000/games/${id}/services/?name=${search_value}&min_cost=${min_cost}&max_cost=${max_cost}`).then(
        async (response)=>{
            return await (await response.json());
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}


export const getServicesPricesbyGame = async(id=-1) => {
    return await fetch (`http://localhost:8000/servprice/${id}`).then(
        async (response)=>{
            return await (await response.json());
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getCart = async(id=-1) => {
    return await fetch (`http://localhost:8000/users/${id}/cart`).then(
        async (response)=>{
            return await (await response.json());
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getCartItem = async(id=-1, item) => {
    return await fetch (`http://localhost:8000/users/${id}/cart/?service=${item}`).then(
        async (response)=>{
            return await (await response.json());
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getOrders = async(id=-1) => {
    return await fetch (`http://localhost:8000/users/${id}/order`).then(
        async (response)=>{
            return await (await response.json());
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getOrderlist = async(id=-1,listid) => {
    return await fetch (`http://localhost:8000/users/${id}/order/${listid}/orderlist`).then(
        async (response)=>{
            return await (await response.json());
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getallOrders = async() => {
    return await fetch (`http://localhost:8000/Allorder/`).then(
        async (response)=>{
            return await (await response.json());
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getallOrdersFilter = async(status) => {
    return await fetch (`http://localhost:8000/Allorder/?status=${status}`).then(
        async (response)=>{
            return await (await response.json());
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}




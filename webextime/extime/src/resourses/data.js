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

export const getPicsbyReview = async(servieid=-1, gameid=-1,reviewID) => {
    return await fetch (`http://localhost:8000/games/${gameid}/services/${servieid}/reviews/${reviewID}/picture`).then(
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
    return await fetch ('http://localhost:8000/games').then(
        async (response)=>{
            return await (await response.json()).filter(games => games.game_name.toLowerCase().match(RegExp(search_value.toLowerCase())));
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}

export const getServicesbyGameFilter = async(id=-1,search_value) => {
    return await fetch (`http://localhost:8000/games/${id}/services`).then(
        async (response)=>{
            return await (await response.json()).filter(services => services.service_name.toLowerCase().match(RegExp(search_value.toLowerCase())));
        }).catch(()=>{
            return{
                resultCount:0,
                results:[]
            }
        }
    );
}
const initialState = {
    cached_data: {
        Home: {
            gameList: []
        },
        GamePage: {
            game:{},
            gameservices:[],
            serviceprices:[0,0]
        },
        DevPage: {
            dev:{},
            devgames:[],
        },
        UserPage:{
            user:{},
            userservices:[],
        },
        ServicePage:{
            Service:{},
            screensshots:[],
            reviews:[]
        },
        App: {
            userAuthorized: false,
            userCart: [],
        }
    },
    ui: {
        Home: {
            loadingStatus: true,
            textFieldValue: '',
        },
        GamePage: {
            loadingStatus: true,
            textFieldValue: '',
            sliderValue: [0, 0]
        },
        DevPage: {
            loadingStatus: true
        },
        UserPage: {
            loadingStatus: true,
        },
        ServicePage:{
            loadingStatus: true
        },
        App: {
            AppBarLinks: [
                {
                    title: 'Главная страница',
                    link: '../'
                }
            ],
        }
    }
}

export default initialState
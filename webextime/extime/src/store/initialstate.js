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
            screenshots:[],
            reviews:[]
        },
        App: {
            userAuthorized: (localStorage.getItem('userId') !== ''),
            userCart: [],
        },
        Cart:{
            fullprice:1,
            cartitems:[],
        },
        Order:{
            orders:[],
            orderlist:[],
            orderid:-1
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
        },
        Cart:{
            loadingStatus: true
        },
        Order:{
            loadingStatus: true
        }
    }
}

export default initialState
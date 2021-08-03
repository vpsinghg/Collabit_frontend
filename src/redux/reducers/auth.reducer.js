const initialState =    {
    isLoggedIn  :   localStorage.getItem('token')   ?   true    :   false,
    loggedInUser    : localStorage.getItem('user')  ?   JSON.parse(localStorage.getItem('user'))    : {},
};

const AuthReducer   =   ( state =   initialState,   action) =>{
    switch(action.type){
        case    'LOGIN' :{
            return({
                isLoggedIn  :   true,
                loggedInUser    :   {...action.payload}
            });
        }
        case    'LOGOUT'    :{
            console.log("reducer","Logout");
            localStorage.clear();
            return({
                isLoggedIn  :   false,
                loggedInUser    :   {}
            });
        }
        default:{
            return state;
        }
    }
};

export default AuthReducer;
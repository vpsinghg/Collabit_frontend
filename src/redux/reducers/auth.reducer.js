const initialState =    {
    isLoggedIn  :   localStorage.getItem('token')   ?   true    :   false,
    LoggedInUser    : localStorage.getItem('user')  ?   JSON.parse(localStorage.getItem('user'))    : {},
};

const AuthReducer   =   ( state =   initialState,   action) =>{
    console.log(action);
    switch(action.type){
        case    'LOGIN' :{
            console.log("reducer","login");
            return({
                isLoggedIn  :   true,
                LoggedInUser    :   {...action.payload}
            });
        }
        case    'LOGOUT'    :{
            console.log("reducer","Logout");
            localStorage.clear();
            return({
                isLoggedIn  :   false,
                LoggedInUser    :   {}
            });
        }
        case 'hello':{
            console.log("reducer","Logout");
            localStorage.clear();
            return({
                isLoggedIn  :   false,
                LoggedInUser    :   {}
            });

        }
        default:{
            return state;
        }
    }
};

export default AuthReducer;
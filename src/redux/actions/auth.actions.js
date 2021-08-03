export const login=(user)=>{
    return({
        type    :   'LOGIN',
        payload :   user
    });
};

export const logout   =   ()  =>{
    console.log("logout ")
    return({
        type    :   'LOGOUT',
    });
};


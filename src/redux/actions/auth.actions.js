export const login=(user)=>{
    console.log("login action");
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


const initialState ={
    sidebarstatusopen :true,
}
const UiReducer   =   ( state =   initialState,   action) =>{
    switch(action.type){
        case    'SIDEBARSTATUS' :{
            return({
                sidebarstatusopen  : action.payload,
            });
        }
        default:{
            return state;
        }
    }
};

export default UiReducer;
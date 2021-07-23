export function errorMessage(errObject){
    let message="";
    for(const key of Object.keys(errObject)){
        message +=  errObject[key].join("\n");
        message +=  "\n";
    }
    return message;
}
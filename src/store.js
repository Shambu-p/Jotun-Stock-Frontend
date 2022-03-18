import api from "./api";
import * as cookies from "./cookies";

const variables = {
    logged_user: null
};

export async function loginAuth(){

    let token = cookies.get("login_token");

    if(token){

        if(variables.logged_user){
            return true;
        }

        return await information(token);

    }else{
        return false;
    }

}

async function information(token){

    let ret = false;

    try{

        let data = new FormData();
        data.append("token", token);

        let response = await api.post("/Auth/authorization", data);
        if(response.data.header.error === "false"){
            variables.logged_user = response.data.data;
            variables.logged_user.token = token;
            ret = true;
        }

    }catch (error){
        console.log(error.message);
    }

    return ret;

}

export default variables;
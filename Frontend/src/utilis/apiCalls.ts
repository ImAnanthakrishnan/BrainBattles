import axios from "axios";

import { signInFailure, signInStart, signInSuccess } from "../slices/userSlice";
import { User } from "../hooks/useForm";
import { BASE_URL } from "../config";


export const doRegister = async(values: User, url: string) => {
    let message = "";
    try {
      const result = await axios.post(`${BASE_URL}${url}`, values);
      console.log(result);
      message += result.data.message;
    } catch (error: any) {
      let errMsg = error.response.data.message;
      console.log("error sigup:", errMsg);
      message += errMsg;
    }
    return message;
  }
  
  export const doLogin = async(values: User, url: string,dispatch:any,navigate:any) => {
    dispatch(signInStart());
    try {
      const result = await axios.post(`${BASE_URL}${url}`, values);
      const { data } = result;
      dispatch(signInSuccess(data));
      navigate('/home');
    } catch (error: any) {
      let errMsg = error.response.data.message;
      console.log("error sigIn:", errMsg);
      dispatch(signInFailure(errMsg));
    }
    return true;
}
  
export const addScore = async(url:string,score:number,level:string='',token:string|null) => {
  const authToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
    try{
      const result = await axios.post(`${BASE_URL}${url}`,{score,level},authToken)
      console.log(result.data.message);
    } catch(error:any){
        console.log('error:',error.response.data.message);
    }
}
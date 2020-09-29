import { Request, Response } from "miragejs";
import { user } from "../Interfaces/user.interface";
import { errorhandler } from "./server";
import { randomBytes } from "crypto";

// First of all we have to make the
// function to generate random token assighn to user
// randombytes take argument size of the generated random number or toekn
export const generaterandomnumber = () => {
    return randomBytes(8).toString('hex')
}
// Now response from auth domain is when user enter the info and in return
// it will respond by generating a token and giving the entered info of user
export interface Responsefromauthdomain {
    generatedtokenforuser : string,
    user: user
}
// The function below is returning us a token and user info as the above interface is
// reffering to..
export const login = (schema : any , request: Request) : Responsefromauthdomain | Response => {
const {username , password} = JSON.parse(request.requestBody);
const userrr = schema.findBy({username});
   if (!userrr) {
       return errorhandler (null, 'No user found')
   }
   if (password !== userrr.password) {
       return errorhandler (null, 'Password un-matches')
   }
const generatedtokenforuser = generaterandomnumber();
  
return {
   generatedtokenforuser,
   user: userrr.attrs as user


}
}

export const signup = (schema : any, request : Request) : Responsefromauthdomain | Response => {
     
    const data = JSON.parse(request.requestBody);
    // this const data will bring the if already data exist otherwise empty 
    const alreadyregistereduser = schema.findBy({username : data.username})
  // this const alreadyregisterd will find if any username exist
    if (alreadyregistereduser) {
        return errorhandler(null, 'The user has been already registered')
    }
    // this if condition will return a error message so that user can mover to sign up

    const newuser = schema.create(data)
    // In case of no already registry the const newuser will create new user info/ register it
    const generatedtokenforuser = generaterandomnumber();
     // this function is also returning the same userinfo and token generated
    return {
        user : newuser.attrs as user,
        generatedtokenforuser
    }
}

export default {login, signup}



import { Request, Response } from "miragejs";
import  {diary} from "../Interfaces/diary.interface";
import { user } from "./../Interfaces/user.interface";
import { entry } from "../Interfaces/entry.interface";
import { errorhandler } from "./server";
import dayjs from "dayjs";
// import { JsxEmit } from "typescript";

// Creating the function will return the new diary associated with user

export const createDiary = (schema: any, request: Request): { user: user, diary: diary } | Response => {

    try {
        const { titleofdiary, userid, type } = JSON.parse(request.requestBody)
        const alreadyexistuser = schema.findBy({ id: userid })
        if (!alreadyexistuser) {
            return errorhandler(null, 'User not exist')
        }
        const timaeanddate = dayjs().format()
        const newdiary = alreadyexistuser.createDiary({
            titleofdiary,
            type,
            timaeanddatewhendiarycreated: timaeanddate,
            timaeanddatewhendiaryupdated: timaeanddate
        })

        return {
            user: {
                ...alreadyexistuser.attrs,
            },
            diary: newdiary.attrs
        };


    } catch (error) {
        return errorhandler(null, 'Failed to create diary');
    }
}
//This function will update the diary
export const updateDiary = (schema : any , request: Request) : diary | Response => {
    try {
    
    const data = JSON.parse(request.requestBody)
    const diarytobeupdated = schema.find(request.params.id)
    const timeanddate = dayjs().format();
    diarytobeupdated.update({
        ...data, timaeanddatewhendiaryupdated: timeanddate
    })
    return diarytobeupdated.attrs as diary;
} catch (error) {
    return errorhandler(null, 'Failed to update diary')
}
}

export const getthelistofdiaries = (schema : any , request: Request) : diary[] | Response =>{

  try {
       
    const user = schema.find(request.params.id)

    return user.diary as diary[]
}
catch (error) {
    return errorhandler(null, 'Failed to get the list of diaries')
}
}

export const createnewentry = (schema : any , request : Request) : {diary : diary, entry : entry} | Response => {
    try {
        const {titleofentry, description} = JSON.parse(request.requestBody)
        const diary = schema.find(request.params.id)
        const timeanddate = dayjs().format();
        const entry = diary.createEntry({
            titleofentry,
            description,
            timeanddatewhenentrycreated : timeanddate,
            timeanddatewhenentryupdated : timeanddate
        })
        diary.update({
            ...diary.attrs, timaeanddatewhendiaryupdated : timeanddate
        })

        return {
            diary : diary.attrs,
            entry : entry.attrs
        }
    }
    catch (error) {
        return errorhandler(null, 'Cannot create new entry');
    }
}

export const getthelistofentries = (schema : any, request : Request) : entry[] | Response => {
    try {
        const diary = schema.find(request.params.id)
       return diary.entry as entry[]

    } catch (error) {
        return errorhandler(null, 'Error in getting the list of entries')
        
    }
}

export const updatetheentry = (schema : any, request : Request) : entry | Response => {
    try {
        // The const entry will find the entry which is to be updated
        // The const data will get the data from the entry which is to be updated
        const entry = schema.find(request.params.id)
        const data = JSON.parse(request.requestBody) as Partial<entry>
        const timeanddate = dayjs().format()
        entry.update({
            ...data, timeanddatewhenentryupdated : timeanddate
        })

        return entry.attrs as entry;
            
    } catch (error) {
      return errorhandler(null, 'Unable to update entry')
    }
}









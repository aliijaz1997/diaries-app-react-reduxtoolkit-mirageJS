import { Response, Factory, Model, belongsTo, hasMany, Server } from "miragejs";
// import { disposeEmitNodes } from "typescript";
import * as diary from './diaryAndentryroutes'
import user from './userRoutes'
// 1st of all we have to make the universal
// function to catch the errors
// the response method in the errorhandler takes three
// parameters (code, header, body) we mainly deal with body to recieve data

export const errorhandler = (error: any, message = 'There is error occured') => {
    console.log(error);
    return new Response(400, undefined, {
        data: {
            message,
            isError: true

        }
    });
}

export const fakeservermake = () => {
    return new Server ({
        models : {
            entry : Model.extend({
                diary : belongsTo()
            }),
            diary : Model.extend({
                entry : hasMany(),
                user : belongsTo()
            }),
            user : Model.extend({
                diary : hasMany()
            })
        },

        factories : {
            userr : Factory.extend({
                username : 'ali',
                password : 'aliijaz',
                email : 'ali@email.com'
            })
        },

        seeds : (dummyserver) => {
             dummyserver.create('userr')
        },

        routes() : void {
            this.urlPrefix = "api"

            this.get('/diaries/entries/:id',diary.getthelistofentries);
            this.get('/diaries/ :id', diary.getthelistofdiaries);
            this.post('/auth/login', user.login)
            this.post('/auth/signup', user.signup)
            this.post('/diaries/ :id', diary.createDiary)
            this.post('/diaries/entry', diary.createnewentry)
            this.put('diaries/:id', diary.updateDiary)
            this.put('diaries/entry/ :id', diary.updatetheentry)
        }
    })
}
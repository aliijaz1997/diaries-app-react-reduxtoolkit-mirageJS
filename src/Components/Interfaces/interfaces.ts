export interface diary {
    id : string,
    titleofdiary : string,
    type : 'private' | 'public' ,
    timeanddatewhendiarycreated : string,
    timeanddatewhendiaryupdated : string,
    userid : string,
    entryids : string [] | null,
}

export interface entry {
    id : string,
    titleofentry : string,
    description : string,
    timeanddatewhenentrycreated : string,
    timeanddatewhenentryupdated : string

}

export interface user {
    id : string,
    username : string,
    email : string,
    password : string,
    diaryids : string
}
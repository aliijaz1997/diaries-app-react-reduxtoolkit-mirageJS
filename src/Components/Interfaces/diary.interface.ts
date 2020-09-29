export interface diary {
    id : string,
    titleofdiary : string,
    type : 'private' | 'public' ,
    timeanddatewhendiarycreated : string,
    timeanddatewhendiaryupdated : string,
    userid : string,
    entryids : string [] | null,
}

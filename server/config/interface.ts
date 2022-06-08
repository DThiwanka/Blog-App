import { Document } from 'mongoose'


export interface IUser extends Document{
    name: string
    account : string
    password : string
    avatar : string
    role : string
    type : string
    _doc: object
}


export interface INewUser{
    name: string
    account: string
    password: string
}

export interface IDecodedToken{
    newUser?: INewUser
    iat: number
    exp: number
}
import { Request, Response } from 'express'
import Users from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateActiveToken, generateAccessToken , generateRefreshToken } from '../config/generateToken' 
import { IUser } from '../config/interface'

const CLIENT_URL = `${process.env.BASE_}`

const authCtrl = {
    register: async (req: Request, res: Response) => {

        try {
            const { name, account, password } = req.body

            const user = await Users.findOne({ account })

            if (user)

                return res.status(400)
                    .json({ msg: 'Email or Phone Number Already Exists! ' });

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, account, password: passwordHash
            }

            const active_token = generateActiveToken({newUser})



            res.json({
                status : 'OK',
                msg: 'Register Successfully! ',
                data: newUser,
                active_token
            })

        } catch (err) {
            return res.status(500)
                .json({ msg: err });
        }

    },

    login:async(req: Request, res: Response) =>{
        try {
            
            const {account, password} = req.body

            const user = await Users.findOne({account})
            if(!user) return res.status(400).json({msg: 'This Account does not exist!'});

            //if User Exists
            loginUser(user,password,res)

            // console.log(req.body)
            // res.json({msg: 'Login Successfully! '})

        } catch (err) {
            return res.status(500).json({msg: err});
        }
    }
}

const loginUser = async (user : IUser ,password : string ,res :Response)=>{
    
     const isMatch = await bcrypt.compare(password,user.password)

     if(!isMatch) return res.status(400).json({msg: "Password is Is incorrect"})

     const access_token = generateAccessToken({id: user._id})
     const refresh_token = generateRefreshToken({id: user._id})

     res.cookie('refreshtoken', refresh_token,{
         httpOnly : true,
         path: `/api/refresh_token`,
         maxAge: 30*24*60*60*1000 //30 days
     })

    res.json({
        msg: 'Login Success! ',
        access_token,
        user: { ...user._doc, password: '' }
    })

}

export default authCtrl;
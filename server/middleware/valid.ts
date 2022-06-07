import {Request,Response,NextFunction} from 'express'

export const validRegister = async(req: Request, res: Response, next: NextFunction) =>{
    const {name,account,password} = req.body

    if(!name){
        return res.status(400).json({msg: "Please Add Your Name! "})
    }else if(name.length > 20){
        return res.status(400).json({msg: "Your Name is up to 20 characters long! "})
    }


    if(!account){
        return res.status(400).json({msg: "Please Add Your Email or Phone Number "})
    }else if(!validPhone(account) && !validateEmail(account)){
        return res.status(400).json({msg: "Email Or Phone Number Format is Incorrect!"})
    }

    if(password.length < 6 ){
        return res.status(400).json({msg: "Password Must be at least 6 characters!"})
    }

    next();

}

    function validPhone(phone:string){
        const re = /^[+]/g
        return re.test(phone)
    }


    function validateEmail(email: string){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase());
    }



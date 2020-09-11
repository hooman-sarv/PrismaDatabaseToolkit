const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.getUsers = async (req , res , next) => {
    
    const allUsers = await prisma.users.findMany()

    return res.status(200).json(allUsers)
}


module.exports.signup = async (req,res ,next) => {
    
    const {username , password , email} = req.body
    //console.log(username , password , email);

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    const newUser = await prisma.users.create({
        data:{
            username : username,
            password : hash,
            email    : email
        }
    })
    //console.log(`hash is ${hash}`);
    if (newUser) {
        return res.status(200).json({
            msg : 'user created successfuly'
        })
    } else {
        return res.status(500).json({
            msg:'can not create user'
        })
    }



}

module.exports.login = async (req, res, next) => {
    const { username , password , email} = req.body
    const userByEmail =  await prisma.users.findOne({
        where:{
            email : email
        }
    })

    if (bcrypt.compareSync(password , userByEmail.password)) {
        console.log(`login successful`);
        const token = jwt.sign({
            username : username,
        } , 'secret' , {expiresIn : '1h'})

        return res.status(200).json({
            msg: 'Login Successful!',
            token : token
        })
    } else {
            res.status(401).json({
            msg: 'login Failed!'
            })
    }
}

module.exports.logout = (req , res , next) => {
    try {
        return res.status(200).json({
            msg: `user logged out successfuly`
        })
    } catch (error) {
        return res.status(500).json({
            msg: `error`
        })
    }
}

module.exports.deleteUser = async (req , res , next) => {
    const email = req.params.email
    console.log(`email is ${email}`);
    const deleteUser = await prisma.users.delete({
        where:{email : email}
    })
    console.log(deleteUser);
    if (deleteUser) {
        return res.status(200).json({
            msg : `user with email ${deleteUser.email} has been removed`
        })
    } else {
        return res.status(401).json({
            msg:`can not remove this user`
        })
    }
}
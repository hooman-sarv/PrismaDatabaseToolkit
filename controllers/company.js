const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.getCompany= async (req , res , next) => {
    
    const allCompany = await prisma.company.findMany()

    return res.status(200).json(allCompany)
}
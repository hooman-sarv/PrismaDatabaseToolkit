const { PrismaClient } = require('@prisma/client')
const  express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const userRoutes = require('./routes/user')
const companyRoutes = require('./routes/company')
/*********************************************************** */
const prisma = new PrismaClient()

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRoutes)
app.use('/company', companyRoutes)

const port = 3000;

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
})

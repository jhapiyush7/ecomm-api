const app=require("./app");

const dotenv=require("dotenv");
const connectDatabase=require('./configuration/database')

//configuration
dotenv.config({path:"backend/configuration/config.env"});

//connecting to db

connectDatabase();
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
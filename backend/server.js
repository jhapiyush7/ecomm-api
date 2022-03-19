const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./configuration/database");

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to uncaught exception");
    process.exit(1);
});


//configuration
dotenv.config({ path: "backend/configuration/config.env" });

//connecting to db

connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
// Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});

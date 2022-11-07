const express = require("express");
const app = express();
const dbConnection = require("../src/database/dbConnection");
const DB_URL = "mongodb://localhost:27017/inventory-manager"
const PORT = 8080;
const GET = require("../src/routes/GETRoutes");
const POST = require("../src/routes/POSTRoutes");
const PUT = require("../src/routes/PUTRoutes");




app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})

dbConnection(DB_URL);
app.use(express.json());
app.use(GET);
app.use(POST);
app.use(PUT);
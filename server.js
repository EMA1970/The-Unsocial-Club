//import express module used to setup an express server and APIs 
const express = require("express");
const { appendFile } = require("fs");
// import connection, this file is used to connect ot a database. 
const db = require ("./config/connection")
// import a module called routes, it is used to handle the different routes of the application. 
const routes = require("./routes")
//creates an instance of the express application. 
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(routes);
//creates a constant called PORT and assigns it to the value of the environment PORT 3001 if the environment variable is not defined. 
db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
  


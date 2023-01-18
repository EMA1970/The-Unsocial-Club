//improts the express module and creates an instance of the Router. The Router is a class that allows for the creation of modular, montable route handlers. 
const router = require("express").Router();
//imports a api module used to handle the different routes of the application. 
const apiRoutes = require("./api");
//tells the router to use the imported apiRoutes module and to mount it on the "/api" route. This means that all the routes defined in the apiRoutes module will be prefixed with "/api"
router.use("/api", apiRoutes);

router.use((req, res) => {
    res.status(404).send("<h1>🙀 UH O SOMETHING IS WRONG!!! "); 
})

module.exports = router;
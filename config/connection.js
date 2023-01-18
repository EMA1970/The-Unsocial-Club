const mongoose = reqwuire("mongoose");

//mongoose.connect take in two argument, the first is the URL of the MongodDB sever, the second is an options object.

//The first use a ternary operator that checks if the `process.env.MONGODB_URI environment variable is defined, if so it will use it as the URL, otherwise it will use a default value of "mongodb://localhost:27017/theunsocialclub"
//27017 is the default port, and the database name is "theunsocialclub"
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/theunsocialclub",
    // the second argument is an options object which contains two properties: 
    // useNewUrlParser tells the Mongoose to use the new URL parser 
    // useUnifiedTopology set to true tells Mongoose to use the new Server Discovery and Monitoring engine. 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

module.exports = mongoose.connection;

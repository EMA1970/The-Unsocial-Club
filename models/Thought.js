//destructures the Mongoose library and destructures it to get the schema, model, and types properties 
const { Schema, model, Types } = require("mongoose");
// import a module called dateFormat 
const dateFormat = require("../utils/dateFormat");
//creates a new Mongoose Schema called Reaction Schema 
const ReactionSchema = new Schema(
    {
        reactionId: {
            // Mongoose's objectId data type 
            type: Schema.Types.ObjectId,
            // default value is set ot a new ObjectId
            default: () => new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },

        username: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            //set default value to the current timestamp 
            default: Date.now,
            // Use a getter method to format the timestamp on query 
            get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
// new schema called ThoughtSchema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Thought is required",
            minlength: 1,
            maxlength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
            get: (timestamp) => dateFormat(timestamp),
        },

        username: {
            type: String,
            required: true,
        },

        //array of nested documents created with the reactionSchema 
        reaction: [ReactionSchema],
    },
    {
        toJson: {
            virtuals: true,
            getters: true, 
        },
        id: false,
    }
);

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.export = Thought; 
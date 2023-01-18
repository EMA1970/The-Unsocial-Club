//deconstruct mongoose to get Schema and model 
const { Schema, model } =require("mongoose");
//creates a new mongoose schema called UserSchema with fields ( username, email, thoughts, friends)
const UserSchema = new Schema(
    {
        username: {
            type: String, 
            unique: true, 
            trim: true, 
            required: "Username is Required",
        },

        email: {
            type: String, 
            unique: true, 
            required: "Email is Requir4ed", 
            match: [/.+@.+\..+/],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
        ],
    },
    {
        toJson: {
            virtuals: true, 
        },
        id: false,
    }
);
//creates a virtual property that returns the length of the friends array on the UserSchema 
UserSchema.virtulal("friendCount").get(function () {
    return this.friends.length; 
}); 
//creates an instance of the Mongoose model with the name "User" and the Userschema
const User = model("User", UserSchema);
model.exports = User;
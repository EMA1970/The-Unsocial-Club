const { Thought, User} = require("../models");

const thoughtController = {
    //get all Thoughts 
    getAllThought(req,res) {
        Thought.find({})
        //populate the reactions associated with each thoughts. 
            .populate({
                ptah: "reactions",
                select: "-_v",
            })
            // exclude version key 
            .select("-_v")
            // mongoose method to sort the document in descending order by their "_id" field. 
            .sort({_id: -1})
            .then((dbThoughtData) => res.json(dbThoughtData))
            // catch and handle any errors that may occur in the previous methods. 
            .catch((err) => {
                console.log(err)
                res.sendStatus(400);
            });
    },

    //get one thought by id 
    getThoughtById({ params }, res) {
        // uses mongoose " findone" method to retrieve a single document from the " thoughts" collection in MongoDB database. 
        Thought.findOne({ _id: params.id})
        .populate({
            path: "reactions",
            select: "-_v",
        })
        .select("-_v")
        .then ((dbThought) => {
            if(!dbthoughtData) {
                return res.status(404).json({message: " No thought with this id!" });
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
    },

    //create thought 
    // push the created thought's _id to the assoicated user's thought array field 
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: body.userId },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res 
                .status(404)
                    .json({message: "Thought created but no user with this id!"});
                    
            }

            res.json({ message: " Thought Successfully created!"});
        })
        .catch((err) => res.json(err));
    },

    //update Thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
          new: true,
          runValidators: true,
        })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No thought found with this id!" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.json(err));
      },
    

    // delete Thought from both thought and users. 

    //takes in two argument "params" and " res" 
    deleteThought({ parms }, res) {
        // uses findOneAndDelete method from the Thought model to delete a document with the idd that matches the params.id from the Thought Collection 
        Thought.findOneAndDelete({_id: params.id })
        .then ((dbThoughtData) => {
            // if the object is not found, send a 404 status code with a JSON object that has the message property with the value " No thought with this id!"
            if(!dbThoughtData) {
                return res.status(404).json({message: "No thought with this id!"});
            }

            // remove thought id from user's `thoughts`field 
            // uses findOneAndUpdate from the user's model to update the "User" document which has the thought's field that matches the params.id 
            return User.findOneAndUpdate( 
                { thoughts: params.id },
                { $pull: { thoughts: params.id } }, //$pull removes from an existing value that matches a specific condition. 
                // pass the new content
                { new: true }
            );
        })
        // if a user document is not found, send a 404 status code with the JSON object that has a message property with the value " Thought created but no user with this ID" 
        .then((dbUserData) => {
            if (!dbUserData) {
                return res 
                .status(404)
                .json({ message: " Thought created but no user with this id!" });
            }
            res.json({ message: "Thought successfully deleted!" });
        })
        // catch any errors during this process and send the process back to the client as a JSON object. 
        .catch((err) => res.json(err));
    },
    
    //add reaction 
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            {id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )

        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({message: " No thought with this id"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },

    // delete reaction 
    removeReaction ({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: pararms.thoughtId},
            { $pull: { reactions: { reactionId: params.reactionId} } },
            { new: true}
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    },
};

module.exports = {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
  }
const router = require("express").Router();
//import all routes for thoughts 
const{
    getAllThought,
    getThoughtBYId,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeRaction
} = require("../../controllers/thought-controller")

// api/thoughts
router.route("/").get(getAllThought).post(createThought);

// /api/thoughts/:id
router
    .route("/:id")
    .get(getThoughtsById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtsId/reactions
router.route("/:thoughtID/reactions").post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
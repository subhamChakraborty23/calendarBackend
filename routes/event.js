const router = require("express").Router();
const {getAllEventsByUserId, getEventById,updateEvent,deleteEvent,addEvent} = require("../controllers/eventController");
const {isLoggedIn} = require("../middlewares/user");

router.get("/users/:userId/events", getAllEventsByUserId);
router.get("/users/:userId/events/:id", getEventById);
router.put("/users/:userId/events/:id", updateEvent);
router.delete("/users/:userId/events/:id", deleteEvent);
router.post("/users/:userId/events", addEvent);


module.exports = router;
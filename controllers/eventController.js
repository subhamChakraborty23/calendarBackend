const Events = require("../models/events");
const User = require("../models/user");

//get all events by userId
exports.getAllEventsByUserId = async (req, res) => {
  try {
    const events = await Events.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.status(200).json(events);
  } catch (err) {
    res.json({ message: err });
  }
};
//get an event by id
exports.getEventById = async (req, res) => {
  try {
    const event = await Events.findOne({
      where: {
        id: req.params.id,
        userId: req.params.userId,
      },
    });
    res.json(event);
  } catch (err) {
    res.json({ message: err });
  }
};

//add an event  user id will present in the url of frontend
exports.addEvent = async (req, res) => {
  try {
    const userId = req.params.userId;
    const {
      title,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      createdBy,
    } = req.body;
    if (!userId || !title || !description || !startDate || !createdBy) {
      res.status(400).json({
        message: "please provide all the required fields",
      });
    }
    const event = await Events.create({
      userId,
      title,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      createdBy,
    });
    res.status(201).json(event);
  } catch (err) {
    res.json({ message: err });
  }
};

//delete an event by id
exports.deleteEvent = async (req, res) => {
  //check if the user is logged in
  try {
    //check input fields
    if (req.params.id == undefined) {
      res.status(400).json({
        message: "please provide an event id",
      });
    } else {
      const event = await Events.findOne({
        where: {
          id: req.params.id,
          userId: req.params.userId,
        },
      });
      if (!event) {
        res.status(404).json({
          message: "event not found",
        });
      } else {
        await event.destroy();
        res.status(200).json({
          message: "event deleted",
        });
      }
    }
  } catch (err) {
    res.json({ message: err });
  }
};

//update an event by id
exports.updateEvent = async (req, res) => {
  try {
    const userId = req.params.userId;

    const event = await Events.update(req.body, {
      where: {
        id: req.params.id,
        userId: userId,
      },
    });
    res.status(200).json(event);
  } catch (err) {
    res.json({ message: err });
  }
};

//add event by user id
exports.addEventByUserId = async (req, res) => {
  try {
    const event = await Events.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.json({ message: err });
  }
};

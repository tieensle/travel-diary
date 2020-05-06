const { Router } = require("express");
const { LogEntry } = require("../models/LogEntry");
const router = Router();

const { API_KEY } = process.env;
router.get("/", async (req, res) => {
  const entries = await LogEntry.find();
  // LogEntry.deleteMany({ rating: 7 }, () => {
  //   console.log("delete success");
  // });
  res.json(entries);
});
router.post("/", async (req, res, next) => {
  try {
    console.log(req.get);
    if (req.get("X-API-KEY") !== API_KEY) {
      res.status(401);
      throw new Error("Unauthorized!");
    }
    const logEntry = new LogEntry(req.body);
    const createEntry = await logEntry.save();
    res.json(createEntry);
  } catch (error) {
    console.log(error.name);
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;

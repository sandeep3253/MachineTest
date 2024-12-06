const express = require("express");
const TableData = require("../models/TableData");

const router = express.Router();

// Get all table data
router.get("/", async (req, res) => {
  const data = await TableData.find();
  res.json(data);
});

// Create table data
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  const newData = await TableData.create({ name, description });
  res.status(201).json(newData);
});

module.exports = router;

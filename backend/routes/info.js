const express = require("express");
const axios = require("axios");
const router = express.Router();
require('dotenv').config();

const UserApi = process.env.USER_API_KEY

router.get("/userinfo", async (req, res) => {
  try {
    const response = await axios.get(UserApi);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

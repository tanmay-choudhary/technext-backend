// routes/viewedVideoRoutes.js
const express = require("express");
const router = express.Router();
const { patent, getPatentIds } = require("../controllers/patent");

try {
  router.post("/patent", patent);
  router.post("/get-ids", getPatentIds);
} catch (e) {
  console.log(e);
}

module.exports = router;

// routes/viewedVideoRoutes.js
const express = require("express");
const router = express.Router();
const {
  patent,
  getPatentIds,
  getCount,
  updatePatent,
  deletePatent,
} = require("../controllers/patent");

try {
  router.post("/patent", patent);
  router.post("/get-ids", getPatentIds);
  router.post("/get-count", getCount);
  router.post("/update-patent", updatePatent);
  router.delete("/delete-patent", deletePatent);
} catch (e) {
  console.log(e);
}

module.exports = router;

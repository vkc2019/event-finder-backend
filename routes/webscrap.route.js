const express = require("express");
const router = express.Router();
const webScrapService = require("../services/webscrap.service");

router.get("/", async function (req, res, next) {
  try {
    res.json(await webScrapService.scrapWebPage(req.query.url));
  } catch (err) {
    console.error(`Error while getting sensor`, err.message);
    next(err);
  }
});

module.exports = router;

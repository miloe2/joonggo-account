const express = require("express");
const apiKeyAuth = require('../middleware/apiKeyAuth')
const { getSales, addSale, updateSale, deleteSale, getMonthlyCategorySummary } = require("../controllers/salesController");

const router = express.Router();

router.use(apiKeyAuth);

router.get("/", getSales);
router.get("/total", getMonthlyCategorySummary);
router.post("/", addSale);
router.put("/", updateSale);
router.post("/delete", deleteSale);

module.exports = router;
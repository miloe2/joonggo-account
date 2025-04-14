const express = require("express");
const { getSales, addSale, updateSale, deleteSale } = require("../controllers/salesController");

const router = express.Router();

router.get("/", getSales);
router.post("/", addSale);
router.put("/", updateSale);
router.post("/delete", deleteSale);

module.exports = router;